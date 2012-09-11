<?php
/**
 * Grid default processor
 *
 * @package bigbrother
 * @subpackage processors
 */
class getAccountList extends modProcessor {
    public $ga = null; 
    public $error = null; 
    
    public function initialize() {
        $this->ga =& $this->modx->bigbrother;
        return true;
    }
    
    public function process() {
        if( !$this->ga->loadOAuth() ){
            return $this->failure( $this->modx->lexicon('bigbrother.err_load_oauth') );
        }
        $result = $this->callAPI( $this->ga->managementUrl . 'management/accounts' );
        if( !empty( $this->error ) ){
            return $this->failure( $this->error );
        }
        
        $output = $account = array();
        $assign = $this->getProperty('assign', false);
        if( $assign ){
            $account['name'] = $this->modx->lexicon('bigbrother.user_account_default');
            $account['id'] = $this->modx->lexicon('bigbrother.user_account_default');
            $output[] = $account;
        }
        // Get account list
        foreach( $result['items'] as $value ){
            $account['name'] = $value['name'];
            
            // Following GA API v3 from July 2012 - The only way to get the right profile ID is to call accountlist -> webproperties -> profile
            $webProperties = $this->callAPI( $value['childLink']['href'] );
            if( !empty( $this->error ) ){
                return $this->failure( $this->error );
            }            
            $profile = $this->callAPI( $webProperties['items'][0]['childLink']['href'] );
            if( !empty( $this->error ) ){
                return $this->failure( $this->error );
            }
            $account['id'] = $profile['items'][0]['id'];
            $output[] = $account;
        }
        $this->ga->updateOption('total_account', $result['totalResults']);
        return $this->success( $output );
    }
    
    /**
     * Call the GA API via curl
     * @param string $url
     * @return string
     */
    public function callAPI( $url ){
        $ch = curl_init();        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array( $this->ga->createAuthHeader($url, 'GET') ) );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($ch);
        if( curl_errno( $ch ) ){
            $this->error = curl_error($ch);
            return;
        }
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if( $http_code !== 200 ){
            $this->error = $result;
            return;
        }
        curl_close($ch);
        return $this->modx->fromJSON( $result );
    }
    
    /**
     * Return a success message from the processor.
     * @param array $output
     * @return string
     */
    public function success( $output ){
        $response = array(
            'success' => true,
            'results' => $output,
        );
        return $this->modx->toJSON( $response );
    }
}
return 'getAccountList';