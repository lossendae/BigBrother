<?php
/**
 * Default settings
 *
 * @package bigbrother
 * @subpackage build
 */

$settings = array();

$settings['bigbrother.cache_timeout']= $modx->newObject('modSystemSetting');
$settings['bigbrother.cache_timeout']->fromArray(array(
    'key' => 'bigbrother.cache_timeout',
    'value' => 300,
    'xtype' => 'textfield',
    'namespace' => 'bigbrother',
    'area' => 'Google Analytics for MODx Revolution',
),'',true,true);

$settings['bigbrother.admin_groups']= $modx->newObject('modSystemSetting');
$settings['bigbrother.admin_groups']->fromArray(array(
    'key' => 'bigbrother.admin_groups',
    'value' => 'Administrator',
    'xtype' => 'textfield',
    'namespace' => 'bigbrother',
    'area' => 'Google Analytics for MODx Revolution',
),'',true,true);

return $settings;