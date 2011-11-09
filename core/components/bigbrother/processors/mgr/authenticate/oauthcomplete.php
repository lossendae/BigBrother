<?php
/**
 * OAuth complete
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

$response['text'] = '';
$response['trail'][] = array('text' => '2. Authorize');
$response['success'] = true;

// $response['text'] = 'Authentification complete.</p><p>Select the account you wish to access to in the list below.<br/> You will be able to change the account at all times on the dashboard.';
// $response['trail'][] = array(
	// 'text' => '2. Authorize',
	// 'text' => '3. Choose an account',
// );
// return $modx->toJSON($response);

if(!$ga->loadOAuth()){
	$response['text'] = 'Could not load the OAuth file. Please reinstall the component or contact the webmaster.';
	$response['success'] = false;
	return $modx->toJSON($response);
}

$oauth_verifier = urldecode($_REQUEST['oauth_verifier']);
$oauth_token = $ga->getOption('oa_anon_token');
$oauth_token_secret = $ga->getOption('oa_anon_secret');

$signatureMethod = new GADOAuthSignatureMethod_HMAC_SHA1();

$params = array();
$params['oauth_verifier'] = $oauth_verifier;
$consumer = new GADOAuthConsumer('anonymous', 'anonymous', NULL);

$finalConsumer = new GADOAuthConsumer($oauth_token, $oauth_token_secret);
$accountRequest = GADOAuthRequest::from_consumer_and_token($consumer, $finalConsumer, 'GET', 'https://www.google.com/accounts/OAuthGetAccessToken', $params);
$accountRequest->sign_request($signatureMethod, $consumer, $finalConsumer);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $accountRequest->to_url());
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$oaResponse = curl_exec($ch);

if(curl_errno($ch)) {	
	$response['text'] =  '<strong>Message from cURL</strong> - '. curl_text($ch);
	$response['success'] = false;
	return $modx->toJSON($response);
}

$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

$ga->deleteOption('oa_anon_token');
$ga->deleteOption('oa_anon_secret');

if($http_code == 200) {
	$accessParams = $ga->splitParams($oaResponse);
	
	$ga->updateOption('oauth_token', $accessParams['oauth_token']);
	$ga->updateOption('oauth_secret', $accessParams['oauth_token_secret']);
	$ga->updateOption('is_authenticated', true);
	$response['text'] = 'Authentification complete.</p><p>Select the account you wish to access to in the list below.<br/> You will be able to change the account at all times on the dashboard.';
	$response['trail'][] = array(
		'text' => '2. Authorize',
		'text' => '3. Choose an account',
	);
} else {
	$response['text'] = '<strong>Bad HTTP code : '. $http_code .'</strong> - '. $oaResponse;
	$response['success'] = false;
}
return $modx->toJSON($response);