<?php
/**
 * Verify if SimpleXML and cURL PHP extensions's are activated before proceeding to the login screen
 *
 * @package bigbrother
 * @subpackage processors
 */

$response['text'] = '';
$response['trail'] = array();
$success = true;

if(!class_exists('SimpleXMLElement')){
	$response['text'] .= $modx->lexicon('bigbrother.class_simplexml');
	$success = false;
}

if(!function_exists('curl_init')){
	$response['text'] .= (!$success) ? '</p><p>' : '';
	$response['text'] .= $modx->lexicon('bigbrother.function_curl');
	$success = false;
}

if($success){
	$response['text'] = 'Use the button below to authorize MODx to use the Google Analytics API.</p><p><em>You will be redirected to the authorization page of Google for that site. Once authorized, you will be redirected back to this page and be prompted to choose which account to use for the analytics report.</em>';
	$response['trail'][] = array('text' => $modx->lexicon('bigbrother.bd_authorize'));
}

$response['success'] = $success;
return $modx->toJSON($response);