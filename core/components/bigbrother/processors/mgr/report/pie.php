<?php
/**
 * Pie chart default processor
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;
$dimensions = $modx->getOption('dimensions', $scriptProperties, null);
if($dimensions != null){
    $dimensions = explode(",", $dimensions);
}
$metrics = $modx->getOption('metrics', $scriptProperties, null);
if($metrics != null){
    $metrics = explode(",", $metrics);
}
$sort = $modx->getOption('sort', $scriptProperties, null);
if(!empty($sort)){
    $sort = explode(",", $sort);
}
$lexiconKey = $modx->getOption('replace', $scriptProperties, 'none');

$date = $ga->getDates();
$url = $ga->buildUrl($date['begin'], $date['end'], $dimensions, $metrics, $sort);
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

foreach($ga->report->entry as $entry){
    foreach($entry->xpath('dxp:dimension') as $dimension){
        $dimensionAttributes = $dimension->attributes();
        $dimName = (string)$dimensionAttributes['value']; 
    }        
    foreach($entry->xpath('dxp:metric') as $metric){
        $metricAttributes = $metric->attributes();
        $name = (string)$metricAttributes['name']; 
        $row['name'] = ($dimName == $modx->lexicon('bigbrother.none')) ? strtoupper(str_replace($modx->lexicon('bigbrother.none'), $modx->lexicon('bigbrother.'. $lexiconKey), $dimName)) : strtoupper($ga->getDimensionName($dimName));
        $row['y'] = intval($metricAttributes['value']);
        $rows['data'][] = $row;
    }
}
$modx->cacheManager->set($cacheKey, $rows, $ga->getOption('cache_timeout'));
$response['series'] = $rows;
return $modx->toJSON($response);