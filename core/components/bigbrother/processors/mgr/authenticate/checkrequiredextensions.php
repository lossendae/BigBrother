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
	$response['text'] .= '<strong>It appears that <a href="http://us3.php.net/manual/en/book.simplexml.php">SimpleXML</a> is not compiled into your version of PHP.<br/> It is required for this plugin to function correctly.</strong>';
	$success = false;
}

if(!function_exists('curl_init')){
	$response['text'] .= (!$success) ? '</p><p>' : '';
	$response['text'] .= '<strong>It appears that <a href="http://www.php.net/manual/en/book.curl.php">CURL</a> is not compiled into your version of PHP.<br/> It is required for this plugin to function correctly.</strong>';
	$success = false;
}

if($success){
	$response['text'] = 'Use the button below to authorize MODx to use the Google Analytics API.</p><p><em>You will be redirected to the authorization page of Google for that site. Once authorized, you will be redirected back to this page and be prompted to choose which account to use for the analytics report.</em>';
	$response['trail'][] = array('text' => '2. Authorize');
}

$response['success'] = $success;
return $modx->toJSON($response);