<?php
/**
 * Traffic sources - Overview
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;
$start = $_REQUEST['start'];
$limit = $_REQUEST['limit'];

$response['message'] = '';

if(!$ga->loadOAuth()){
	$response['message'] = 'Could not load the OAuth file';
	$response['success'] = false;
	return $modx->toJSON($response);
}

/* @TODO - Make this dynamic */
$dateEnd = date('Y-m-d', time()); // 30 days in the past
$dateStart = date('Y-m-d', time() - (60 * 60 * 24 * 30)); // 30 days in the past

$response['success'] = $ga->simpleReportRequest($dateStart, $dateEnd, 'ga:medium', 'ga:visits','ga:visits');

if(!$response['success']){
	$response['message'] = $ga->getOutput();
	return $modx->toJSON($response);
}

$source = array('(none)','organic','referral');
$rows['type'] = "pie";
$rows['name'] = "Organic";
$replacements = array('Direct Traffic','Search Engines','Referring Sites');

$results = $ga->getOutput();
foreach($results as $key => $value){
	$row['name'] = strtoupper(str_replace($source, $replacements, $key));
	$row['y'] = intval($value);
	$rows['data'][] = $row;
}
$response['results'] = $rows;
return $modx->toJSON($response);