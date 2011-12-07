<?php
/**
 * Set the account in use for the CMP
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

$ga->deleteOption('oauth_token');
$ga->deleteOption('oauth_secret');
$ga->deleteOption('account');

$response['success'] = true;

return $modx->toJSON($response);