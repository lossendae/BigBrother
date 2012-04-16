<?php
/**
 * OAuth login sequence - grab an anonymous token
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;
$callbackUrl = $scriptProperties['callback_url'];

$response['text'] = '';
$response['trail'][] = array('text' => $modx->lexicon('bigbrother.bd_authorize'));
$response['success'] = true;

if(!$ga->loadOAuth()){
    $response['text'] = $modx->lexicon('bigbrother.err_load_oauth');
    $response['success'] = false;
    return $modx->toJSON($response);
}

$signatureMethod = new GADOAuthSignatureMethod_HMAC_SHA1();
$params = array();

$params['oauth_callback'] = $callbackUrl . '&oauth_return=true';
$params['scope'] = 'https://www.google.com/analytics/feeds/'; 
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
    $response['text'] = curl_text($ch);
    $response['success'] = false;
    return $modx->toJSON($response);
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if($httpCode == 200) {
    $access_params = $ga->splitParams($oaResponse);
    $response['text'] = $modx->lexicon('bigbrother.redirect_to_google');
    $response['url'] = 'https://www.google.com/accounts/OAuthAuthorizeToken?oauth_token=' . urlencode($access_params['oauth_token']);
    $ga->updateOption('oa_anon_token', $access_params['oauth_token']);
    $ga->updateOption('oa_anon_secret', $access_params['oauth_token_secret']);
    $ga->updateOption('callback_url', $callbackUrl);
} else {
    $response['text'] = $oaResponse;
    $response['success'] = false;
}

return $modx->toJSON($response);