<?php
/**
 * Top content - Overview
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;
$start = $_REQUEST['start'];
$limit = $_REQUEST['limit'];

$filters = $modx->getOption('filters', $scriptProperties, null);
if($filters != ""){ $filters  = explode(',', $filters); }

$name = $_REQUEST['fieldName'];
$dimension = 'ga:' . $_REQUEST['dimension'];

$response['message'] = '';

if(!$ga->loadOAuth()){
	$response['message'] = 'Could not load the OAuth file';
	$response['success'] = false;
	return $modx->toJSON($response);
}

/* @TODO - Make this dynamic */
$dateEnd = date('Y-m-d', time()); // 30 days in the past
$dateStart = date('Y-m-d', time() - (60 * 60 * 24 * 30)); // 30 days in the past
$response['success'] = $ga->complexReportRequest($dateStart, $dateEnd, array($dimension), array('ga:visits'), array('-ga:visits'), $filters, 15);

if(!$response['success']){
	$response['message'] = $ga->getOutput();
	return $modx->toJSON($response);
}

$results = $ga->getOutput();
$visits = $ga->getTotalVisits($dateStart, $dateEnd);
$response['total'] = count($results);
$max = ($start + $limit > $response['total']) ? $response['total']: $start + $limit;

for($i = $start; $i < $max; $i++){
	$entry = $results[$i];
	$row[$name] = $entry['value'];

	$metric = $entry['metrics'];
	$row['visits'] = $metric['ga:visits'];	
	$row['percent'] = round($row['visits'] / $visits * 100, 2) .' %';	
	
	$data[] = $row;
}

$response['results'] = $data;
return $modx->toJSON($response);