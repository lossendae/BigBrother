<?php
/**
 * OAuth complete
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

$response['message'] = '';
$response['success'] = true;

if(!$ga->loadOAuth()){
	$response['message'] = 'Could not load the OAuth file';
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
	$response['message'] =  '<strong>Message from cURL</strong> - '. curl_message($ch);
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
	$response['message'] = 'Authenticated!';
} else {
	$response['message'] = '<strong>Bad HTTP code : '. $http_code .'</strong> - '. $oaResponse;
	$response['success'] = false;
}
return $modx->toJSON($response);