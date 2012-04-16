<?php
/**
 * Metas default processor
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;
$cols = $modx->getOption('cols', $scriptProperties, 4);
$metrics = $modx->getOption('metrics', $scriptProperties, null);
if($metrics != null){
    $metrics = explode(",", $metrics);
}

$date = $ga->getDates();
$url = $ga->buildUrl($date['begin'], $date['end'], null, $metrics, array('-ga:visits'));
$cacheKey = $ga->cacheKey;
$fromCache = $modx->cacheManager->get($ga->cacheKey);

if(!empty($fromCache)){
    $response['fromCache'] = true;
    $response['success'] = true;
    $response = array_merge($response, $fromCache);
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

$results = array();    
foreach($ga->report->entry as $entry){                                            
    foreach($entry->xpath('dxp:metric') as $metric){                    
        $metricAttributes = $metric->attributes();
        $name = (string)$metricAttributes['name']; 
        if(!isset($results[$name])){
            // Create entries for each requested metrics
            $results[$name]['name'] = strtoupper($ga->getName($name));
            $results[$name]['value'] = intval($metricAttributes['value']);
        }
    }
}

// Compare with same previous period for quick informationnal progression
$date = $ga->getDates('Y-m-d', true);
$url = $ga->buildUrl($date['begin'], $date['end'], null, $metrics, array('-ga:visits'));
$response['success'] = $ga->getReport($url);

if(!$response['success']){
    $response['message'] = $ga->getOutput();
    return $modx->toJSON($response);
}

foreach($ga->report->entry as $entry){
    foreach($entry->xpath('dxp:metric') as $metric){
        $metricAttributes = $metric->attributes();
        $name = (string)$metricAttributes['name']; 
        if(isset($results[$name])){
            //Beautify the comparison output
            $class = '';
            $value = $results[$name]['value'];
            $compare = intval($metricAttributes['value']);
            $progression = round(($value * 100 / $compare) - 100, 1);
            if($progression > 0){
                $progression = '+ '.$progression;
                $class = 'up';
            } elseif($progression < 0){
                $progression = str_replace('-','- ', $progression);
                $class = 'down';
            }
            $results[$name]['progression'] = $progression;
            $results[$name]['progressionCls'] = $class;
            $results[$name]['value'] = $ga->formatValue($name, $value);            
        }
    }
}
$output = array();
$i = 0; 
$table = array();
foreach($results as $metric){    
    $table[] = $metric;         
    $i++;
    if($i == $cols){
        $output['metas'][] = $table;
        $i = 0; 
        $table = array();
    }    
}    
if(!empty($table)){
    $output['metas'][] = $table;
}    
//Save output to cache
$modx->cacheManager->set($cacheKey, $output, $ga->getOption('cache_timeout'));
$response = array_merge($response, $output);
return $modx->toJSON($response);