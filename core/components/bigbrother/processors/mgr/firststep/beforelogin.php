<?php
/**
 * Verify if SimpleXML and cURL are activated before proceeding to the login screen
 *
 * @package bigbrother
 * @subpackage processors
 */

$response['message'] = '';
$success = true;

if(!class_exists('SimpleXMLElement')){
	$response['message'] .= '<strong>It appears that <a href="http://us3.php.net/manual/en/book.simplexml.php">SimpleXML</a> is not compiled into your version of PHP.<br/> It is required for this plugin to function correctly.</strong>';
	$success = false;
}

if(!function_exists('curl_init')){
	$response['message'] .= (!$success) ? '</p><p>' : '';
	$response['message'] .= '<strong>It appears that <a href="http://www.php.net/manual/en/book.curl.php">CURL</a> is not compiled into your version of PHP.<br/> It is required for this plugin to function correctly.</strong>';
	$success = false;
}

if($success){
	$response['message'] = 'Utilisez le bouton ci dessous afin d\'autoriser MODx à recupérer les données de votre compte Google Analytics';
}

$response['success'] = $success;
return $modx->toJSON($response);