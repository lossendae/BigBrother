<?php
/**
 * OAuth login sequence - login process
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

$dateEnd = date('Y-m-d', time()); // 30 days in the past
$dateStart = date('Y-m-d', time() - (60 * 60 * 24 * 30)); // 30 days in the past

$metrics = array('ga:avgTimeOnSite','ga:visitBounceRate','ga:percentNewVisits');

$response['success'] = $ga->simpleReportRequest($dateStart, $dateEnd, null, join($metrics, ','));

if(!$response['success']){
	$response['message'] = $ga->getOutput();
	return $modx->toJSON($response);
}

$results = $ga->getOutput();

foreach($results as $k => $v){
	$total = 6;
	$i = 1;
	foreach($v as $key => $value){
		$name = $ga->getName($key);
				
		$metas['name'] = $name;
		$metas['key'] = strtolower(str_replace('ga:', '', $key));
		$metas['value'] = ($key == 'ga:percentNewVisits' || $key == 'ga:visitBounceRate') ? round($value,2) .' %' : $value;
		$metas['value'] = ($key == 'ga:pageviewsPerVisit') ? round($metas['value'],2) : $metas['value'];
		$metas['value'] = ($key == 'ga:avgTimeOnSite') ? $ga->formatTime($metas['value']) : $metas['value'];
		
		$r[] = $metas;	
		$i++;
	}
}

$response['metas'] = $r;
return $modx->toJSON($response);