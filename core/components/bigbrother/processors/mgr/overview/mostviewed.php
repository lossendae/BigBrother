<?php
/**
 * Most Viewed
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

$metrics = array('ga:pageviews','ga:uniquePageviews','ga:visitBounceRate','ga:visitors', 'ga:newVisits', 'ga:percentNewVisits');
/* @TODO : lexiconify the following */
$replacements = array('Pageviews','Unique Pageviews','Bounce Rate','Visitors', 'New Visits', 'New Visits in percent');

$response['success'] = $ga->simpleReportRequest($dateStart, $dateEnd, null, join($metrics, ','));

if(!$response['success']){
	$response['message'] = $ga->getOutput();
	return $modx->toJSON($response);
}

$results = $ga->getOutput();

foreach($results as $k => $v){
	foreach($v as $key => $value){
		$name = str_replace($metrics, $replacements, $key);
		
		$metas['name'] = $name;
		if($key == 'ga:percentNewVisits' || $key == 'ga:visitBounceRate'){
			$metas['value'] = round($value,2) .' %';
		} else {
			$metas['value'] = $value;
		}
		$r[] = $metas;
	}
}

$response['metas'] = $r;
return $modx->toJSON($response);