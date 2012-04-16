<?php
/**
 * Grid default processor
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;
$start = $modx->getOption('start', $scriptProperties, 0);
$limit = $modx->getOption('limit', $scriptProperties, 15);
$name = $modx->getOption('fieldName', $scriptProperties, 15);

$filters = $modx->getOption('filters', $scriptProperties, null);
if($filters != ""){ 
    $filters  = explode(',', $filters); 
}
$dimension = $modx->getOption('dimension', $scriptProperties, null);
if($dimension != null){
    $dimension = explode(",", $dimension);
}

$date = $ga->getDates();
$url = $ga->buildUrl($date['begin'], $date['end'], $dimension, array('ga:visits'), array('-ga:visits'), $filters, $limit);
$cacheKey = $ga->cacheKey;
$fromCache = $modx->cacheManager->get($ga->cacheKey);

if(!empty($fromCache)){
    $response['success'] = true;
    $response['total'] = count($fromCache);
    $response['results'] = $fromCache;
    return $modx->toJSON($response);
}

if(!$ga->loadOAuth()){
    $response['message'] = 'Could not load the OAuth file';
    $response['success'] = false;
    return $modx->toJSON($response);
}
$response['success'] = $ga->getReport($url);

if(!$response['success']){
    $response['message'] = $ga->getOutput();
    return $modx->toJSON($response);
}

$visits = $ga->getTotalVisits($date['begin'], $date['end']);
$rows = array();
foreach($ga->report->entry as $entry){    
    foreach($entry->xpath('dxp:dimension') as $dimension){
        $dimensionAttributes = $dimension->attributes();
        $value = (string)$dimensionAttributes['value']; 
    }
    foreach($entry->xpath('dxp:metric') as $metric){
        $metricAttributes = $metric->attributes();
        $row[$name] = $value;
        $row['visits'] = intval($metricAttributes['value']);
        $row['percent'] = round($row['visits'] / $visits * 100, 2) .' %';
        $rows[] = $row;
    }
}
$response['total'] = count($rows);
$response['results'] = $rows;
$modx->cacheManager->set($cacheKey, $rows, $ga->getOption('cache_timeout'));
return $modx->toJSON($response);