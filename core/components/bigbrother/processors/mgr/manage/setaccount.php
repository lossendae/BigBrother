<?php
/**
 * Set the account in use for the CMP
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

$response['message'] = 'Account set successfully!';
$response['success'] = true;

// if(!$ga->loadOAuth()){
	// $response['message'] = 'Could not load the OAuth file';
	// $response['success'] = false;
	// return $modx->toJSON($response);
// }

$ga->updateOption('account', $_REQUEST['account']);

return $modx->toJSON($response);