<?php
/**
 * Save options for boath CMP and Dashboard widget
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

$redirect = false;

$old = $ga->getOption('account');
if($old != $scriptProperties['account']){
    $ga->updateOption('account', $scriptProperties['account']);
    $ga->updateOption('account_name', $scriptProperties['account_name']);
    $redirect = true;
}

$old = $ga->getOption('admin_groups');
if($old != $scriptProperties['admin_groups']){
    $ga->updateOption('admin_groups', $scriptProperties['admin_groups']);
    $redirect = true;
}

$old = $ga->getOption('date_begin');
if($old != $scriptProperties['date_begin']){
    $ga->updateOption('date_begin', $scriptProperties['date_begin']);
    $redirect = true;
}

$old = $ga->getOption('date_end');
if($old != $scriptProperties['date_end']){
    $ga->updateOption('date_end', $scriptProperties['date_end']);
    $redirect = true;
}

$ga->updateOption('cache_timeout', $scriptProperties['cache_timeout']);

// Check for dashboard options since fields are not rendered by default
if(isset($scriptProperties['show_visits_on_dashboard'])){
    $value = ($scriptProperties['show_visits_on_dashboard'] === "true" || $scriptProperties['show_visits_on_dashboard'] == 1) ? 1 : 0;
    $ga->updateOption('show_visits_on_dashboard', $value , 'combo-boolean');

    $value = ($scriptProperties['show_metas_on_dashboard'] === "true" || $scriptProperties['show_metas_on_dashboard'] == 1) ? 1 : 0;
    $ga->updateOption('show_metas_on_dashboard', $value , 'combo-boolean');

    $value = ($scriptProperties['show_pies_on_dashboard'] === "true" || $scriptProperties['show_pies_on_dashboard'] == 1) ? 1 : 0;
    $ga->updateOption('show_pies_on_dashboard', $value , 'combo-boolean');
}

$response['redirect'] = $redirect;
$response['success'] = true;
$response['data'] = $scriptProperties;

return $modx->toJSON($response);