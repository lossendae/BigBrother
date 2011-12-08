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

$metrics = array('ga:pageviews','ga:uniquePageviews','ga:visitBounceRate','ga:visitors', 'ga:newVisits', 'ga:percentNewVisits');
/* @TODO : lexiconify the following */
$replacements = array(
	$modx->lexicon('bigbrother.pageviews'),
	$modx->lexicon('bigbrother.unique_pageviews'),
	$modx->lexicon('bigbrother.bounce_rate'),
	$modx->lexicon('bigbrother.visitors'),
	$modx->lexicon('bigbrother.new_visits'),
	$modx->lexicon('bigbrother.new_visits_in_percent'
));

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
		$name = str_replace($metrics, $replacements, $key);
				
		$metas['name'] = $name;
		$metas['key'] = strtolower(str_replace('ga:', '', $key));
		$metas['value'] = ($key == 'ga:percentNewVisits' || $key == 'ga:visitBounceRate') ? round($value,2) .' %' : $value;
		
		$r[] = $metas;	
		$i++;
	}
}

$response['metas'] = $r;
return $modx->toJSON($response);