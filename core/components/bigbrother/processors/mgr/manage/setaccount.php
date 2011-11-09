<?php
/**
 * Set the account in use for the CMP
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;
$ga->updateOption('account', $_REQUEST['account']);

$response['text'] = 'Account set successfully! Please wait...';
$response['success'] = true;

return $modx->toJSON($response);