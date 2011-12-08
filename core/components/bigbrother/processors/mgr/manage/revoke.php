<?php
/**
 * Set the account in use for the CMP
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

//Delete all bigbrother's related system settings
$ga->deleteOption('oauth_token');
$ga->deleteOption('oauth_secret');
$ga->deleteOption('account');
$ga->deleteOption('account_name');
$ga->deleteOption('total_account');

$response['success'] = true;

return $modx->toJSON($response);