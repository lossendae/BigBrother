<?php
/**
 * OAuth login sequence - grab an anonymous token
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

//The Google Analytics manager page
$page = $modx->getObject('modAction', array(
	'namespace' => 'bigbrother',
	'controller' => 'index',
));

$response['message'] = '';
$response['success'] = true;

if(!$ga->loadOAuth()){
	$response['message'] = 'Could not load the OAuth file';
	$response['success'] = false;
	return $modx->toJSON($response);
}

$signatureMethod = new GADOAuthSignatureMethod_HMAC_SHA1();
$params = array();

$params['oauth_callback'] = $modx->getOption('site_url') . 'manager?a='. $page->get('id') .'&oauth_return=true';
$params['scope'] = 'https://www.google.com/analytics/feeds/'; // This is a space seperated list of applications we want access to
$params['xoauth_displayname'] = $modx->getOption('site_name').' - Analytics Dashboard';

$consumer = new GADOAuthConsumer('anonymous', 'anonymous', NULL);
$request = GADOAuthRequest::from_consumer_and_token($consumer, NULL, 'GET', 'https://www.google.com/accounts/OAuthGetRequestToken', $params);
$request->sign_request($signatureMethod, $consumer, NULL);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $request->to_url());
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$oaResponse = curl_exec($ch);

if (curl_errno($ch)) {
	$response['message'] = curl_message($ch);
	$response['success'] = false;
	return $modx->toJSON($response);
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if($httpCode == 200) {
	$access_params = $ga->splitParams($oaResponse);
	$response['message'] = 'Redirection vers le site de Google, veuillez patientez';
	$response['url'] = 'https://www.google.com/accounts/OAuthAuthorizeToken?oauth_token=' . urlencode($access_params['oauth_token']);
	$ga->addOption('oa_anon_token', $access_params['oauth_token']);
	$ga->addOption('oa_anon_secret', $access_params['oauth_token_secret']);
} else {
	$response['message'] = $oaResponse;
	$response['success'] = false;
}

return $modx->toJSON($response);