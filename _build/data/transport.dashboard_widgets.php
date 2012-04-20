<?php
/**
 * Dashboard Widgets
 *
 * @package bigbrother
 * @subpackage build
 */

$widgets = array();

$widgets[1]= $modx->newObject('modDashboardWidget');
$widgets[1]->fromArray(array (
    'name' => 'bigbrother.name',
    'description' => 'bigbrother.desc',
    'type' => 'file',
    'size' => 'full',
    'content' => '[[++core_path]]components/bigbrother/controllers/widget.class.php',
    'namespace' => 'bigbrother',
    'lexicon' => 'bigbrother:dashboard',
), '', true, true);

return $widgets;