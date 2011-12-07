<?php
/**
 * bigbrother
 *
 *
 * @package bigbrother
 */
/**
 * Main class file for bigbrother.
 *
 * @author Stephane Boulard <lossendae@gmail.com>
 * @package bigbrother
 */
class BigBrother {
    /**
     * @access protected
     * @var array A collection of preprocessed chunk values.
     */
    protected $chunks = array();
    /**
     * @access public
     * @var modX A reference to the modX object.
     */
    public $modx = null;
    /**
     * @access public
     * @var array A collection of properties to adjust bigbrother behaviour.
     */
    public $config = array();
    private $output = null;
	public $baseUrl = 'https://www.google.com/analytics/feeds/';

    /**
     * The bigbrother Constructor.
     *
     * This method is used to create a new BigBrother object.
     *
     * @param modX &$modx A reference to the modX object.
     * @param array $config A collection of properties that modify bigbrother
     * behaviour.
     * @return bigbrother A unique bigbrother instance.
     */
    function __construct(modX &$modx,array $config = array()) {
        $this->modx =& $modx;

        $core = $this->modx->getOption('bigbrother.core_path',$config,$this->modx->getOption('core_path').'components/bigbrother/');
		$assets_url = $this->modx->getOption('bigbrother.assets_url',$config,$this->modx->getOption('assets_url').'components/bigbrother/');
		$assets_path = $this->modx->getOption('bigbrother.assets_path',$config,$this->modx->getOption('assets_path').'components/bigbrother/'); 
		
		$this->config = array_merge(array(
            'core_path' => $core,
            'model_path' => $core.'model/',
            'processors_path' => $core.'processors/',
            'controllers_path' => $core.'controllers/',
            'chunks_path' => $core.'elements/chunks/',
			'assets_url' => $assets_url,
			'css_url' => $assets_url.'css/',
			'connector_url' => $assets_url.'connector.php',

			'debug' => true,
        ),$config);

        if ($this->modx->lexicon) {
            $this->modx->lexicon->load('bigbrother:default');
        }

        /* load debugging settings */
        if ($this->modx->getOption('debug',$this->config,false)) {
            error_reporting(E_ALL); ini_set('display_errors',true);
            $this->modx->setLogTarget('HTML');
            $this->modx->setLogLevel(MODX_LOG_LEVEL_ERROR);

            $debugUser = $this->config['debugUser'] == '' ? $this->modx->user->get('username') : 'anonymous';
            $user = $this->modx->getObject('modUser',array('username' => $debugUser));
            if ($user == null) {
                $this->modx->user->set('id',$this->modx->getOption('debugUserId',$this->config,1));
                $this->modx->user->set('username',$debugUser);
            } else {
                $this->modx->user = $user;
            }
        }
    }
	
	/**
     * Load the OAuth file containing the OAuth classes
     *
     * @access public
     * @return boolean
     */
	public function loadOAuth() {
		$file = $this->config['model_path'].'bigbrother/OAuth.php';
		if (!file_exists($file)) {
			return false;		
		} 
		require_once $file;	
		
		$oauthToken = $this->getOption('oauth_token');
        $oauthSecret = $this->getOption('oauth_secret');		
		if($oauthToken != null && $oauthToken != ''){ $this->oauthToken = $oauthToken; }
		if($oauthSecret != null && $oauthSecret != ''){ $this->oauthSecret = $oauthSecret; }
		
		return true;
	}
	
	/**
     * Extract the cURL response params and create an associative array with the paired values
     *
     * @param string $response The cURL string response
     * @access public
     * @return array The params associative array
     */
	public function splitParams($response) {
		$params = array();
		$pairs = explode('&', $response);
		foreach($pairs as $pair){
			if (trim($pair) == '') { continue; }
			list($key, $value) = explode('=', $pair);
			$params[$key] = urldecode($value);
		}
		return $params;
	}
	
	/**
     * Helper method to create a new MODx system setting
     *
     * @param string $key The setting key
     * @param mixed $value The setting value
     * @param string $type The setting type (Optionnal) default to textfield
     * @access public
     * @return boolean
     */
	public function addOption($key, $value, $type = 'textfield') {
		$setting = $this->modx->newObject('modSystemSetting');
		$setting->fromArray(array(
			'key' => 'bigbrother.'. $key,
			'value' => $value,
			'xtype' => $type,
			'namespace' => 'bigbrother',
			'area' => 'Google Analytics for MODx Revolution',
		),'',true);
		return $setting->save();
	}
	
	/**
     * Helper method to update/create a new MODx system setting
     *
     * @param string $key The setting key
     * @param mixed $value The setting value
     * @param string $type The setting type (Optionnal) default to textfield
     * @access public
     * @return boolean
     */
	public function updateOption($key, $value, $type = 'textfield') {		
		$setting = $this->modx->getObject('modSystemSetting', array(
			'key' => 'bigbrother.'. $key,
		));		
		if(!$setting){ $setting = $this->modx->newObject('modSystemSetting'); }
		$setting->fromArray(array(
			'key' => 'bigbrother.'. $key,
			'value' => $value,
			'xtype' => $type,
			'namespace' => 'bigbrother',
			'area' => 'Google Analytics for MODx Revolution',
		),'',true);
		return $setting->save();
	}
	
	/**
     * Helper method to retreive a bigbrother related system setting
     *
     * @param string $key The setting name
     * @access public
     * @return mixed The system requested setting
     */
	public function getOption($key) {
		$setting = $this->modx->getObject('modSystemSetting', array(
			'key' => 'bigbrother.'. $key,
		));	
		if($setting){ return $setting->value; }		
		return null;
	}
	
	/**
     * Helper method to remove a bigbrother related system setting
     *
     * @param string $key The setting name
     * @access public
     * @return boolean Whether the setting has been removed or not
     */
	public function deleteOption($key) {
		$setting = $this->modx->getObject('modSystemSetting', array('key' => 'bigbrother.'. $key));
		if($setting){
			return $setting->remove();
		}
	}
	
	/**
     * Create the http header for cURL
     *
     * @param string $url The url to retreive the data from
     * @param string $method The HTTP method to use
     * @access protected
     * @return mixed The requested header or false if no url is provided
     */
	public function createAuthHeader($url = null, $method = null) {
		if($url == NULL) {	return false; }
		$signatureMethod = new GADOAuthSignatureMethod_HMAC_SHA1();

		$params = array();
		$consumer = new GADOAuthConsumer('anonymous', 'anonymous', NULL);
		$token = new GADOAuthConsumer($this->oauthToken, $this->oauthSecret);
		$oauthRequest = GADOAuthRequest::from_consumer_and_token($consumer, $token, $method, $url, $params);
		$oauthRequest->sign_request($signatureMethod, $consumer, $token);

		return $oauthRequest->to_header();
	}
	
	/**
     * Get a simple report from Google or cache if exist
     *
     * @param string $dateStart The beginning date
     * @param string $dateEnd The end date
     * @param mixed $dimensions
     * @param mixed $metrics
     * @param mixed $sort
     * @param mixed $filters
     * @param mixed $limit
     * @access public
     * @return boolean true if the report is successfully fetched, false if any error
     */
	public function simpleReportRequest($dateStart, $dateEnd, $dimensions = '', $metrics = '', $sort = '', $filters = '', $limit = null) {
		//Build the url
		$url  = $this->baseUrl . 'data';
		$url .= '?ids=' . $this->getOption('account');
		$url .= $dimensions != '' ? ('&dimensions=' . $dimensions) : '';
		$url .= $metrics != '' ? ('&metrics=' . $metrics) : '';
		$url .= $sort != '' ? ('&sort=' . $sort) : '';
		$url .= $filters != '' ? ('&filters=' . urlencode($filters)) : '';
		$url .= '&start-date=' . $dateStart;
		$url .= '&end-date=' . $dateEnd;
		$url .= ($limit != null) ? '&max-results=' .$limit : '';
		
		$cacheKey = md5(urlencode($url));
		
		$fromCache = $this->modx->cacheManager->get($cacheKey);
		if( !empty($fromCache) ){
			$this->output = $fromCache;
		} else {
			$ch = curl_init();

			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array($this->createAuthHeader($url, 'GET')));
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

			$return = curl_exec($ch);

			if(curl_errno($ch)){
				$this->output = curl_error($ch);
				return false;
			}

			$this->http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

			if($this->http_code != 200) {
				$this->output = $return;
				return false;
			} else {
				$xml = simplexml_load_string($return);

				curl_close($ch);

				$output = array();
				foreach($xml->entry as $entry) {
					if($dimensions == '') {
						$dim_name = 'value';
					} else {
						$dimension = $entry->xpath('dxp:dimension');
						$dimensionAttributes = $dimension[0]->attributes();
						$dim_name = (string)$dimensionAttributes['value'];
					}

					$metric = $entry->xpath('dxp:metric');
					if(sizeof($metric) > 1) {
						foreach($metric as $single_metric) { 
							$metricAttributes = $single_metric->attributes();
							$output[$dim_name][(string)$metricAttributes['name']] = (string)$metricAttributes['value'];
						}
					} else {
						$metricAttributes = $metric[0]->attributes();
						$output[$dim_name] = (string)$metricAttributes['value'];
					}
				}
				
				$this->output = $output;
				// Cache the result 
				$this->modx->cacheManager->set($cacheKey, $this->output, $this->getOption('cache_timeout')); 
			}			
		}	
		return true;
	}
	
	/**
     * Get a complex report from Google or cache if exist
     *
     * @param string $dateStart The beginning date
     * @param string $dateEnd The end date
     * @param array $dimensions
     * @param array $metrics
     * @param array $sort
     * @param array $filters
     * @param array $limit
     * @access public
     * @return boolean true if the report is successfully fetched, false if any error
     */
	public function complexReportRequest($dateStart, $dateEnd, $dimensions = array(), $metrics = array(), $sort = array(), $filters = array(), $limit = null) {
		$url  = $this->baseUrl . 'data';
		$url .= '?ids=' . $this->getOption('account');
		$url .= sizeof($dimensions) > 0 ? ('&dimensions=' . join(array_reverse($dimensions), ',')) : '';
		$url .= sizeof($metrics) > 0 ? ('&metrics=' . join($metrics, ',')) : '';
		$url .= sizeof($sort) > 0 ? '&sort=' . join($sort, ',') : '';
		$url .= sizeof($filters) > 0 ? '&filters=' . urlencode(join($filters, ',')) : '';
		$url .= '&start-date=' . $dateStart;
		$url .= '&end-date=' .$dateEnd;
		$url .= ($limit != null) ? '&max-results=' .$limit : '';
		
		$cacheKey = md5(urlencode($url));
		
		$fromCache = $this->modx->cacheManager->get($cacheKey);
		if( !empty($fromCache) )	{
			$this->output = $fromCache;
		} else {
			$ch = curl_init();

			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array($this->createAuthHeader($url, 'GET')));
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

			$return = curl_exec($ch);

			if(curl_errno($ch)){
				$this->output = curl_error($ch);
				return false;
			}

			$this->http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

			if($this->http_code != 200){
				$this->output = $return;
				return false;
			} else {
				$xml = simplexml_load_string($return);

				curl_close($ch);

				$output = array();
				foreach($xml->entry as $entry){
					$metrics = array();					
					foreach($entry->xpath('dxp:metric') as $metric){
						$metricAttributes = $metric->attributes();
						$metrics[(string)$metricAttributes['name']] = (string)$metricAttributes['value']; 
					}

					$lastDimensionVarName = null;
					foreach($entry->xpath('dxp:dimension') as $dimension){
						$dimensionAttributes = $dimension->attributes();

						$dimensionVarName = 'dimensions_' . strtr((string)$dimensionAttributes['name'], ':', '_');
						$dimensionVarName = array();

						if($lastDimensionVarName == null){
							$dimensionVarName = array('name' => (string)$dimensionAttributes['name'],
								'value' => (string)$dimensionAttributes['value'],
								'metrics' => $metrics); 
						} else {
							$dimensionVarName = array('name' => (string)$dimensionAttributes['name'],
								'value' => (string)$dimensionAttributes['value'],
								'children' => $lastDimensionVarName); 
						}
						$lastDimensionVarName = $dimensionVarName;
					}
					array_push($output, $lastDimensionVarName);
				}
				
				$this->output = $output;//Cache the result 
				$this->modx->cacheManager->set($cacheKey, $this->output, $this->getOption('cache_timeout'));
			}			
		}
		return true;
	}
	
	
	/**
     * Get the report result or any error message if any
     *
     * @access public
     * @return string The requested output
     */
	public function getOutput(){
		return $this->output;
	}
}