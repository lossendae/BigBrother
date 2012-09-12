<?php
/**
* BigBrother
*
*
* @package bigbrother
* @subpackage controllers
*/
require_once dirname(dirname(__FILE__)) . '/model/bigbrother/bigbrother.class.php';

class modDashboardWidgetBigBrother extends modDashboardWidgetInterface {
    /** @var BigBrother $bigbrother */
    public $bigbrother;
    /**
     * Allows widgets to specify a CSS class to attach to the block
     *
     * @var string
     */
    public $cssBlockClass = 'bigbrother';

    public function render() {
        $this->bigbrother = new BigBrother($this->modx);

        $this->modx->controller->addCss($this->bigbrother->config['css_url'] . 'dashboard.css');

        //jQuery + charts class
        $this->modx->controller->addJavascript($this->bigbrother->config['assets_url'] . 'mgr/lib/jquery.min.js');
        $this->modx->controller->addJavascript($this->bigbrother->config['assets_url'] . 'mgr/lib/highcharts.js');

        //Basic reusable panels
        $this->modx->controller->addJavascript($this->bigbrother->config['assets_url'] . 'mgr/lib/classes.js');
        $this->modx->controller->addJavascript($this->bigbrother->config['assets_url'] . 'mgr/lib/charts.js');

        $account = $this->bigbrother->getOption('account');
        if($account == null){
            $this->modx->controller->addJavascript($this->bigbrother->config['assets_url'] . 'dashboard/notlogged.js');
        } else {
            $this->modx->controller->addJavascript($this->bigbrother->config['assets_url'] . 'dashboard/dashboard.js');
        }

        $date = $this->bigbrother->getDates('d M Y');
        /** @var $page modAction */
        $page = $this->modx->getObject('modAction', array(
            'namespace' => 'bigbrother',
            'controller' => 'index',
        ));

        $url = $this->bigbrother->getManagerLink() . '?a='. $page->get('id');

        $this->modx->controller->addHtml('<script type="text/javascript">
    BigBrother.RedirectUrl = "'.$url.'";
    BigBrother.ConnectorUrl = "'.$this->bigbrother->config['connector_url'].'";
    BigBrother.DateBegin = "'.$date['begin'].'";
    BigBrother.DateEnd = "'.$date['end'].'";
    BigBrother.account = "'.$this->bigbrother->getOption('account').'";
    BigBrother.accountName = "'.$this->bigbrother->getOption('account_name').'";
    Ext.applyIf(MODx.lang, '. $this->modx->toJSON($this->modx->lexicon->loadCache('bigbrother', 'dashboard')) .');
    Ext.onReady(function() {
        MODx.load({
            xtype: "bb-panel"
            ,user: "'.$this->modx->user->get('id').'" // Not needed, yet ?
        });
    });
</script>');
        return '<div id="bb-panel"></div>';
    }

}
return 'modDashboardWidgetBigBrother';