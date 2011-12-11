<?php
/**
 * Retreiving the dates used for the reports
 *
 * @package bigbrother
 * @subpackage processors
 */
// $ga =& $modx->bigbrother;

/* @TODO - Make this dynamic */
$date['end'] = date('d M Y', time());
$date['begin']  = date('d M Y', time() - (60 * 60 * 24 * 30)); // 30 days in the past
$response['success'] = true;
$response['results'] = $date;

return $modx->toJSON($response);