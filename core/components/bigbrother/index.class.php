<?php
/**
 * BigBrother
 *
 *
 * @package bigbrother
 */
require_once dirname(__FILE__) . '/model/bigbrother/bigbrother.class.php';

class IndexManagerController extends modExtraManagerController
{
    public static function getDefaultController() { return 'default'; }
}

abstract class BigBrotherManagerController extends modManagerController
{
    /** @var BigBrother $service */
    public $service;

    public function initialize()
    {
        $this->service = new BigBrother($this->modx);
        $this->addCss($this->service->config['assets_url'] . 'refactor/css/style.css');

        return parent::initialize();
    }

    public function getLanguageTopics()
    {
        return array('bigbrother:mgr');
    }

    public function checkPermissions() { return true; }
}
