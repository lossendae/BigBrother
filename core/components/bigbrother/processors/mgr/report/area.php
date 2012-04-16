<?php
/**
 * Area chart default processor
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
$url = $ga->buildUrl($date['begin'], $date['end'], array('ga:date'), $metrics);
$cacheKey = $ga->cacheKey;
$fromCache = $modx->cacheManager->get($ga->cacheKey);

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
$metrics = array();        
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
        if(!isset($metrics[$name])){
            // Create entries for each requested metrics
            $metrics[$name]['begin'] = $date;
            $metrics[$name]['name'] = strtoupper($ga->getName($name));
            $metrics[$name]['data'] = array();
        }
        $row[] = $date; 
        $row[] = intval((string)$metricAttributes['value']);                     
        array_push($metrics[$name]['data'], $row);
        $row = null;
    }
}

// Flatten metrics
foreach($metrics as $metric){
    $series[] = $metric;
}            
//Save output to cache
$modx->cacheManager->set($cacheKey, $series, $ga->getOption('cache_timeout'));
$response['series'] = $series;
return $modx->toJSON($response);