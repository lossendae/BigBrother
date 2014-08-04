<?php
/**
 * Area chart default processor
 *
 * @package bigbrother
 * @subpackage processors
 */
class getAreaSerieProcessor extends modProcessor {
    /** @var BigBrother */
    public $ga = null;
    public $metrics = null;
    public $results = array();
    public $output = array();

    public function initialize() {
        $this->ga =& $this->modx->bigbrother;
        $this->metrics = $this->getProperty('metrics', null);
        if($this->metrics != null){
            $this->metrics = explode(",", $this->metrics);
        }
        return true;
    }

    public function process() {
        $date = $this->ga->getDates();
        $url = $this->ga->buildUrl($date['begin'], $date['end'], array('ga:date'), $this->metrics);

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
        $this->addSerie();

        $this->modx->cacheManager->set($cacheKey, $this->series, $this->ga->getOption('cache_timeout'));
        return $this->success( 'Fetched data from Google', $this->series );
    }

    /**
     * Set a serie for the current loaded report
     * @return void
     */
    public function addSerie(){
        $serie = $row = array();
        foreach( $this->ga->report["rows"] as $key => $value ){
            // Convert date in javascript format
            $date = strtotime( $value[0] ) * 1000;
            if( empty( $serie ) ){
                // Create entries for each requested metrics
                $serie['begin'] = $date;
                $serie['name'] = strtoupper( $this->ga->getName( $this->getProperty('metrics', null) ) );
                $serie['data'] = array();
            }
            $row[] = $date;
            $row[] = intval( $value[1] );
            array_push( $serie['data'], $row );
            $row = array();
        }
        $this->series[] = $serie;
    }

    /**
     * Return a success message from the processor.
     * @param array $series
     * @param boolean $fromCache
     * @return string
     */
    public function success( $msg = '', $series = null, $fromCache = false ){
        $response = array(
            'success' => true,
            'series' => $series,
            'fromCache' => $fromCache,
        );
        return $this->modx->toJSON( $response );
    }
}
return 'getAreaSerieProcessor';
