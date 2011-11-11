<?php
/**
 * Default settings
 *
 * @package bigbrother
 * @subpackage build
 */

$settings = array();

$settings['bigbrother.is_authenticated']= $modx->newObject('modSystemSetting');
$settings['bigbrother.is_authenticated']->fromArray(array(
    'key' => 'bigbrother.is_authenticated',
    'value' => false,
    'xtype' => 'combo-boolean',
    'namespace' => 'bigbrother',
    'area' => 'Google Analytics for MODx Revolution',
),'',true,true);

$settings['bigbrother.cache_timeout']= $modx->newObject('modSystemSetting');
$settings['bigbrother.cache_timeout']->fromArray(array(
    'key' => 'bigbrother.cache_timeout',
    'value' => 300,
    'xtype' => 'textfield',
    'namespace' => 'bigbrother',
    'area' => 'Google Analytics for MODx Revolution',
),'',true,true);

return $settings;