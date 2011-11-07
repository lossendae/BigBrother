<?php
/**
 * OAuth login sequence - login process
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

$dateEnd = date('Y-m-d', time()); // 30 days in the past
$dateStart = date('Y-m-d', time() - (60 * 60 * 24 * 30)); // 30 days in the past

$metrics = array('ga:pageviews','ga:uniquePageviews','ga:avgTimeOnPage','ga:exitRate','ga:bounces','ga:visits');
/* @TODO : lexiconify the following */
// $replacements = array('Pageviews','Unique Pageviews','Avg. Time on Page','% Exit ');

$response['success'] = $ga->complexReportRequest($dateStart, $dateEnd, array('ga:pagePath'), $metrics, array('-ga:pageviews'), array('ga:pageviews>20'));

if(!$response['success']){
	$response['message'] = $ga->getOutput();
	return $modx->toJSON($response);
}

$results = $ga->getOutput();
$response['total'] = count($results);
$max = ($start + $limit > $response['total']) ? $response['total']: $start + $limit;

for($i = $start; $i < $max; $i++){
	$entry = $results[$i];
	$row['pagepath'] = $entry['value'];
	
	//Handle the metrics rows
	$metric = $entry['metrics'];
	$row['pageviews'] = $metric['ga:pageviews'];
	$row['uniquepageviews'] = $metric['ga:uniquePageviews'];
	$row['avgtimeonpage'] = date("H:i:s",round($metric['ga:avgTimeOnPage']));
	$row['exitpage'] = round($metric['ga:exitRate'], 2) .' %';
	if( $metric['ga:visits'] > 0 ){
		$row['bouncerate'] = round(($metric['ga:bounces'] / $metric['ga:visits']) * 100, 2) .' %';
	} else {
		$row['bouncerate'] = '--';
	}		
	$data[] = $row;
}

// $response['data'] = $results;
$response['results'] = $data;
return $modx->toJSON($response);