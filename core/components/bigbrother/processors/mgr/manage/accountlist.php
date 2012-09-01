<?php
/**
 * Get account list
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

$response['text'] = '';
$response['success'] = true;

if(!$ga->loadOAuth()){
    $response['text'] = $modx->lexicon('bigbrother.err_load_oauth');
    $response['success'] = false;
    return $modx->toJSON($response);
}

$ch = curl_init();
        
curl_setopt($ch, CURLOPT_URL, $ga->managementUrl . 'management/accounts');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_HTTPHEADER, array($ga->createAuthHeader($ga->managementUrl . 'management/accounts', 'GET')));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$return = curl_exec($ch);
if(curl_errno($ch)){
    $response['text'] = curl_error($ch);
    $response['success'] = false;
    return $modx->toJSON($response);
}

$this->http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if($this->http_code != 200)    {
    $response['text'] = $return;
    $response['success'] = false;
    return $modx->toJSON($response);
} else {
    $this->error_text = '';    
    $json = $modx->fromJSON( $return );
    
    curl_close($ch);

    $total = 0;
    $results = $account = array();
    if(isset($scriptProperties['assign']) && $scriptProperties['assign']){
        $account['name'] = $modx->lexicon('bigbrother.user_account_default');
        $account['id'] = $modx->lexicon('bigbrother.user_account_default');
        $results[] = $account;
         $total++;
    }
    foreach( $json['items'] as $value ){
        $account['name'] = $value['name'];
        $account['id'] = $value['id'];
        $results[] = $account;
    }
    $ga->updateOption('total_account', $json['totalResults']);
    
    $response['results'] = $results;
}
return $modx->toJSON($response);