<?php
/**
 * Visits
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

$response['message'] = '';

if(!$ga->loadOAuth()){
	$response['message'] = 'Could not load the OAuth file';
	$response['success'] = false;
	return $modx->toJSON($response);
}

/* @TODO - Make this dynamic */
$dateEnd = date('Y-m-d', time()); // 30 days in the past
$dateStart = date('Y-m-d', time() - (60 * 60 * 24 * 30)); // 30 days in the past

$response['success'] = $ga->simpleReportRequest($dateStart, $dateEnd, 'ga:date', join(array('ga:visits'), ','));

if(!$response['success']){
	$response['message'] = $ga->getOutput();
	return $modx->toJSON($response);
}

/* @TODO - Make this dynamic */
$response['daterange'] = date('F d', time() - (60 * 60 * 24 * 30)).' - '. date('F d', time());

$results = $ga->getOutput();
// return $modx->toJSON($results);

//Prepare output for highcharts
$start = null;
foreach($results as $k => $v){
	$date = strtotime($k) * 1000;
	if(!isset($response['pointStart'])){
		$response['pointStart'] = $date;
	}
	$data[] = array($date, intval($v));		
}

$Visits['name'] = strtoupper('Visits');
$Visits['type'] = 'area';
$Visits['data'] = $data;
$response['series'][] = $Visits;

return $modx->toJSON($response);