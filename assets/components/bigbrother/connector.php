<?php
$basePath = dirname(dirname(dirname(dirname(__FILE__))));

require_once $basePath . '/config.core.php';
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';

$mpCorePath = $modx->getOption('bigbrother.core_path',null,$modx->getOption('core_path').'components/bigbrother/');
require_once $mpCorePath.'model/bigbrother/bigbrother.class.php';
$modx->bigbrother = new BigBrother($modx);
$modx->lexicon->load('bigbrother:mgr');

$modx->request->handleRequest(array(
    'processors_path'   => $modx->getOption('processors_path',$modx->bigbrother->config,$mpCorePath.'processors/'),
    'location' => 'mgr'
));