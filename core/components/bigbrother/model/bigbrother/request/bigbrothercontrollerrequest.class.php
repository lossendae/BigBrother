<?php
require_once MODX_CORE_PATH . 'model/modx/modrequest.class.php';
/**
 * Encapsulates the interaction of MODx manager with an HTTP request.
 *
 * {@inheritdoc}
 *
 * @package bigbrother
 * @extends modRequest
 */
class BigBrotherControllerRequest extends modRequest {
    public $bigbrother = null;
    public $actionVar = 'action';
    public $defaultAction = 'index';

    function __construct(BigBrother &$bigbrother) {
        parent :: __construct($bigbrother->modx);
        $this->ga =& $bigbrother;
    }

    /**
     * Extends modRequest::handleRequest and loads the proper error handler and
     * actionVar value.
     *
     * {@inheritdoc}
     */
    public function handleRequest() {
        $this->loadErrorHandler();

        /* save page to manager object. allow custom actionVar choice for extending classes. */
        $this->action = isset($_REQUEST[$this->actionVar]) ? $_REQUEST[$this->actionVar] : $this->defaultAction;

        $modx =& $this->modx;
        $bigbrother =& $this->ga;
		
		$viewHeader = include $this->ga->config['controllers_path'].'mgr/index.php';

        $f = $this->ga->config['controllers_path'].'mgr/'.strtolower($this->action).'.php';
        if (file_exists($f)) {
            $this->modx->lexicon->load('bigbrother:default');
            $viewOutput = include $f;
        } else {
            $viewOutput = 'Action not found: '.$f;
        }

        return $viewHeader.$viewOutput;
    }
}