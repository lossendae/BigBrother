<?php
/**
 * Verify if SimpleXML and cURL PHP extensions's are activated before proceeding to the login screen
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;
$response['text'] = '';
$response['trail'] = array();
$success = true;

$groups = explode(',', $this->modx->getOption('bigbrother.admin_groups', null, 'Administrator'));
if(!$this->modx->user->isMember($groups)){
    $response['text'] .= $modx->lexicon('bigbrother.not_authorized_to');
    $success = false;
}

if(!class_exists('SimpleXMLElement')){
    $response['text'] .= $modx->lexicon('bigbrother.class_simplexml');
    $success = false;
}

if(!function_exists('curl_init')){
    $response['text'] .= (!$success) ? '</p><p>' : '';
    $response['text'] .= $modx->lexicon('bigbrother.function_curl');
    $success = false;
}

$callbackUrl = $ga->getOption('callback_url');
if($callbackUrl == null){
    //The Google Analytics manager page
    $page = $modx->getObject('modAction', array(
        'namespace' => 'bigbrother',
        'controller' => 'index',
    ));
    //Base url
    $baseUrl = $modx->getOption('base_url');
    //Absolute url who contain the base_url
    $siteUrl = $modx->getOption('site_url');
    //Remove the base_url
    $url = str_replace($baseUrl, '', $siteUrl);
    //Concatenate the manager_url (who also contain the base_url) and add page id
    $callbackUrl = $url . $modx->getOption('manager_url') . '?a='. $page->get('id');
}

if($success){
//  $response['text'] = 'Use the button below to authorize MODx to use the Google Analytics API.</p><p><em>You will be redirected to the authorization page of Google for that site. Once authorized, you will be redirected back to this page and be prompted to choose which account to use for the analytics report.</em>';
    $response['text'] .= $modx->lexicon('bigbrother.account_authentication_desc');
    $response['trail'][] = array('text' => $modx->lexicon('bigbrother.bd_authorize'));
    $response['callback_url'] = $callbackUrl;
}

$response['success'] = $success;
return $modx->toJSON($response);