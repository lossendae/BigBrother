<?php
/**
 * Get data formatted to meta informations
 *
 * @package bigbrother
 * @subpackage processors
 */
class getMetas extends modProcessor {
    /** @var BigBrother */
    public $ga = null;
    public $metrics = null;
    public $cols = null;
    public $results = array();
    public $output = array();

    public function initialize() {
        $this->ga =& $this->modx->bigbrother;
        $this->cols = $this->getProperty('cols', 4);
        $this->metrics = $this->getProperty('metrics', null);
        if($this->metrics != null){
            $this->metrics = explode(",", $this->metrics);
        }
        return true;
    }

    public function process() {
        $date = $this->ga->getDates();
        $url = $this->ga->buildUrl($date['begin'], $date['end'], array('ga:date'), $this->metrics, array('-ga:visits'));

        $cacheKey = $this->ga->cacheKey;
        $fromCache = $this->modx->cacheManager->get($cacheKey);
        if( !empty($fromCache) ){
            return $this->success('Fetched data from cache', $fromCache, true);
        }
        if( !$this->ga->loadOAuth() ){
            return $this->failure('Could not load the OAuth file.');
        }
        if( !$this->ga->getReport($url) ){
            return $this->failure( $this->ga->getOutput() );
        }
        $this->formatData();
        $date = $this->ga->getDates('Y-m-d', true);
        $url = $this->ga->buildUrl($date['begin'], $date['end'], null, $this->metrics, array('-ga:visits'));
        if( !$this->ga->getReport($url) ){
            return $this->failure( $this->ga->getOutput() );
        }
        $this->compareData();
        $this->modx->cacheManager->set($cacheKey, $this->output, $this->ga->getOption('cache_timeout'));
        return $this->success( 'Fetched data from Google', $this->output );
    }

    /**
     * Format data from the main report
     * @return void
     */
    public function formatData(){
        foreach($this->ga->report['totalsForAllResults'] as $key => $value){
            $this->results[$key]['name'] = strtoupper( $this->ga->getName( $key ) );
            $this->results[$key]['value'] = intval( $value );
        }
    }

    /**
     * Compare new report to the main set of data and update each key accordingly
     * @return void
     */
    public function compareData(){
        foreach($this->ga->report['totalsForAllResults'] as $key => $v){
            if( isset( $this->results[$key] ) ){
                $cls = '';
                $value = $this->results[$key]['value'];
                $compare = intval( $v );
                if ($compare <= 0) {
                    $compare = 1;
                }
                $progression = round(($value * 100 / $compare) - 100, 1);
                if($progression > 0){
                    $progression = '+ '.$progression;
                    $cls = 'up';
                } elseif($progression < 0){
                    $progression = str_replace('-','- ', $progression);
                    $cls = 'down';
                }
                $this->results[$key]['progression'] = $progression;
                $this->results[$key]['progressionCls'] = $cls;
                $this->results[$key]['value'] = $this->ga->formatValue($key, $value);
            }
        }
        $this->formatOutput();
    }

    /**
     * Helper method to format the output to be used by Ext templates
     * @return void
     */
    public function formatOutput(){
        $table = array();
        $i = 0;
        foreach($this->results as $metric){
            $table[] = $metric;
            $i++;
            if($i == $this->cols){
                $this->output['metas'][] = $table;
                $i = 0;
                $table = array();
            }
        }
        if(!empty($table)){
            $this->output['metas'][] = $table;
        }
    }

    /**
     * Return a success message from the processor.
     * @param array $output
     * @param boolean $fromCache
     * @return string
     */
    public function success( $msg = '', $output = null, $fromCache = false ){
        $response = array_merge(array(
            'success' => true,
            'fromCache' => $fromCache,
        ), $output);
        return $this->modx->toJSON( $response );
    }
}
return 'getMetas';
