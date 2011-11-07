<?php
/**
 * @package bigbrother
 * @subpackage controllers
 */
require_once dirname(dirname(__FILE__)).'/model/bigbrother/bigbrother.class.php';
$bigbrother = new BigBrother($modx);
return $bigbrother->initialize('mgr');