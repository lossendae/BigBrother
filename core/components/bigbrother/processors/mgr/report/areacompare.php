<?php
/**
 * Area chart processor for comparison charts
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;
$metrics = $modx->getOption('metrics', $scriptProperties, null);
if($metrics != null){
    $metrics = explode(",", $metrics);
}

$date = $ga->getDates();
$beforeDate = $ga->getDates('Y-m-d', true);
$url = $ga->buildUrl($date['begin'], $date['end'], array('ga:date'), $metrics);
$cacheKey = md5($ga->cacheKey . $beforeDate);
$fromCache = $modx->cacheManager->get($cacheKey);

if(!empty($fromCache)){
    $response['fromCache'] = true;
    $response['success'] = true;
    $response['series'] = $fromCache;
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

$series = array();
$results = array();        
foreach($ga->report->entry as $entry){                                
    $row = array();    
    foreach($entry->xpath('dxp:dimension') as $dimension){
        $dimensionAttributes = $dimension->attributes();
        // Convert date in javascript format
        $date = strtotime((string)$dimensionAttributes['value']) * 1000; 
    }                
    foreach($entry->xpath('dxp:metric') as $metric){
        $metricAttributes = $metric->attributes();
        $name = (string)$metricAttributes['name']; 
        if(!isset($results[$name])){
            // Create entries for each requested metrics
            $results[$name]['begin'] = $date;
            $labelDate = $ga->getDates('d M Y');
            $results[$name]['name'] = strtoupper($labelDate['begin'] .' - '.$labelDate['end']);
            $results[$name]['data'] = array();
        }
        $row[] = $date; 
        $row[] = intval($metricAttributes['value']);                     
        array_push($results[$name]['data'], $row);
        $row = null;
    }
}

// Flatten metrics
foreach($results as $metric){
    $series[] = $metric;
}

$url = $ga->buildUrl($beforeDate['begin'], $beforeDate['end'], array('ga:date'), $metrics);
$response['success'] = $ga->getReport($url);

if(!$response['success']){
    $response['message'] = $ga->getOutput();
    return $modx->toJSON($response);
}
$results = array();        
foreach($ga->report->entry as $entry){                                
    $row = array();    
    foreach($entry->xpath('dxp:dimension') as $dimension){
        $dimensionAttributes = $dimension->attributes();
        // Convert date in javascript format
        $date = strtotime((string)$dimensionAttributes['value']) * 1000; 
    }                
    foreach($entry->xpath('dxp:metric') as $metric){
        $metricAttributes = $metric->attributes();
        $name = (string)$metricAttributes['name']; 
        if(!isset($results[$name])){
            // Create entries for each requested metrics
            $results[$name]['begin'] = $date;
            $labelDate = $ga->getDates('d M Y', true);
            $results[$name]['name'] = strtoupper($labelDate['begin'] .' - '.$labelDate['end']);
            $results[$name]['data'] = array();
        }
        $row[] = $date; 
        $row[] = intval($metricAttributes['value']);                     
        array_push($results[$name]['data'], $row);
        $row = null;
    }
}

// Flatten metrics
foreach($results as $metric){
    $series[] = $metric;
}
$modx->cacheManager->set($cacheKey, $series, $ga->getOption('cache_timeout'));
$response['series'] = $series;
return $modx->toJSON($response);