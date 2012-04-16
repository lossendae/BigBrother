<?php
/**
 * OAuth complete
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

$response['text'] = '';
$response['trail'][] = array('text' => $modx->lexicon('bigbrother.bd_authorize'));
$response['success'] = true;

if(!$ga->loadOAuth()){
    $response['text'] = $modx->lexicon('bigbrother.err_load_oauth');
    $response['success'] = false;
    return $modx->toJSON($response);
}

//If we already have google's permissions
$oauth_token = $ga->getOption('oauth_token');
$oauth_secret = $ga->getOption('oauth_secret');
if($oauth_token != null && $oauth_secret != null){
    $response['text'] = $modx->lexicon('bigbrother.authentification_complete');
    $response['trail'][] = array(
        'text' => $modx->lexicon('bigbrother.bd_authorize'),
        'text' => $modx->lexicon('bigbrother.bd_choose_an_account'),
    );
    return $modx->toJSON($response);
}

//Else we retreive oauth_token 
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
    //@TODO lexicon ?
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
    $response['text'] = $modx->lexicon('bigbrother.authentification_complete');
    $response['trail'][] = array(
        'text' => $modx->lexicon('bigbrother.bd_authorize'),
        'text' => $modx->lexicon('bigbrother.bd_choose_an_account'),
    );
} else {
    //@TODO lexicon ?
    $response['text'] = '<strong>Bad HTTP code : '. $http_code .'</strong> - '. $oaResponse;
    $response['success'] = false;
}
return $modx->toJSON($response);