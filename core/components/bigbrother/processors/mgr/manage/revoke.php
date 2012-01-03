<?php
/**
 * Revoke all google's authorization and reset the app
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