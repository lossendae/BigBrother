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

$settings['bigbrother.date_begin']= $modx->newObject('modSystemSetting');
$settings['bigbrother.date_begin']->fromArray(array(
    'key' => 'bigbrother.date_begin',
    'value' => 30,
    'xtype' => 'textfield',
    'namespace' => 'bigbrother',
    'area' => 'Google Analytics for MODx Revolution',
),'',true,true);

$settings['bigbrother.date_end']= $modx->newObject('modSystemSetting');
$settings['bigbrother.date_end']->fromArray(array(
    'key' => 'bigbrother.date_end',
    'value' => 'yesterday',
    'xtype' => 'textfield',
    'namespace' => 'bigbrother',
    'area' => 'Google Analytics for MODx Revolution',
),'',true,true);

$settings['bigbrother.show_visits_on_dashboard']= $modx->newObject('modSystemSetting');
$settings['bigbrother.show_visits_on_dashboard']->fromArray(array(
    'key' => 'bigbrother.show_visits_on_dashboard',
    'value' => 1,
    'xtype' => 'combo-boolean',
    'namespace' => 'bigbrother',
    'area' => 'Google Analytics for MODx Revolution',
),'',true,true);

$settings['bigbrother.show_metas_on_dashboard']= $modx->newObject('modSystemSetting');
$settings['bigbrother.show_metas_on_dashboard']->fromArray(array(
    'key' => 'bigbrother.show_metas_on_dashboard',
    'value' => 1,
    'xtype' => 'combo-boolean',
    'namespace' => 'bigbrother',
    'area' => 'Google Analytics for MODx Revolution',
),'',true,true);

$settings['bigbrother.show_pies_on_dashboard']= $modx->newObject('modSystemSetting');
$settings['bigbrother.show_pies_on_dashboard']->fromArray(array(
    'key' => 'bigbrother.show_pies_on_dashboard',
    'value' => 1,
    'xtype' => 'combo-boolean',
    'namespace' => 'bigbrother',
    'area' => 'Google Analytics for MODx Revolution',
),'',true,true);

return $settings;