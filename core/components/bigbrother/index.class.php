<?php
/**
* BigBrother
*
*
* @package bigbrother
*/
require_once dirname(__FILE__) . '/model/bigbrother/bigbrother.class.php';

class IndexManagerController extends modExtraManagerController {
    public static function getDefaultController() { return 'default'; }
}

abstract class BigBrotherManagerController extends modManagerController {
    /** @var BigBrother $bigbrother */
    public $bigbrother;
    public function initialize() {
        $this->bigbrother = new BigBrother($this->modx);
        $this->addCss($this->bigbrother->config['css_url'] . 'mgr.css');
        return parent::initialize();
    }
    public function getLanguageTopics() {
        return array('bigbrother:mgr');
    }
    public function checkPermissions() { return true;}
}