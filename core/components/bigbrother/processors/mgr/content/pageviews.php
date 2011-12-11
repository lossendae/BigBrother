<?php
/**
 * Pageviews and Uniques Overview
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

$response['success'] = $ga->simpleReportRequest($dateStart, $dateEnd, 'ga:date', join(array('ga:pageviews', 'ga:uniquePageviews'), ','));

if(!$response['success']){
	$response['message'] = $ga->getOutput();
	return $modx->toJSON($response);
}

/* @TODO - Make this dynamic */
$response['daterange'] = date('F d', time() - (60 * 60 * 24 * 30)).' - '. date('F d', time());

$results = $ga->getOutput();

//Prepare output for highcharts
$start = null;
foreach($results as $k => $v){
	$date = strtotime($k) * 1000;
	if(!isset($response['pointStart'])){
		$response['pointStart'] = $date;
	}
	foreach($v as $key => $value){
		if($key == 'ga:pageviews'){
			$data[] = array($date, intval($value));	
		} else {
			$upv[] = array($date, intval($value));
		}
	}		
}

$pageViews['name'] = strtoupper('Pageviews');
$pageViews['type'] = 'area';
$pageViews['data'] = $data;

$uniquePageviews['name'] = strtoupper('Unique Pageviews');
$uniquePageviews['type'] = 'area';
$uniquePageviews['data'] = $upv;

$response['series'][] = $pageViews;
$response['series'][] = $uniquePageviews;

return $modx->toJSON($response);