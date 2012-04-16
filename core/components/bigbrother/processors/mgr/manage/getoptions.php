<?php
/**
 * Get the options for CMP and dashboard widget
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

$results['cache_timeout'] = $ga->getOption('cache_timeout');
$results['account'] = $ga->getOption('account', false);
$results['admin_groups'] = $ga->getOption('admin_groups');
$results['date_begin'] = $ga->getOption('date_begin');
$results['date_end'] = $ga->getOption('date_end');
$results['show_visits_on_dashboard'] = $ga->getOption('show_visits_on_dashboard');
$results['show_metas_on_dashboard'] = $ga->getOption('show_metas_on_dashboard');
$results['show_pies_on_dashboard'] = $ga->getOption('show_pies_on_dashboard');

$response['success'] = true;
$response['data'] = $results;

return $modx->toJSON($response);