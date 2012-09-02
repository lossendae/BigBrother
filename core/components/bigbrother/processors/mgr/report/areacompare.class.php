<?php
/**
 * Get series of data to use with an area comparison chart using Highharts
 *
 * @package bigbrother
 * @subpackage processors
 */
class getSeriesForComparisonAreaChart extends modProcessor {
    public $ga = null; 
    public $metrics = null; 
    public $series = array(); 
    
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
        $beforeDate = $this->ga->getDates('Y-m-d', true);
        $url = $this->ga->buildUrl($date['begin'], $date['end'], array('ga:date'), $this->metrics);
        
        $cacheKey = md5($this->ga->cacheKey . $beforeDate);
        $fromCache = $this->modx->cacheManager->get($cacheKey);
        if( !empty($fromCache) ){
            return $this->success($fromCache, true);
        }
        if( !$this->ga->loadOAuth() ){
            return $this->failure('Could not load the OAuth file.');
        }        
        if( !$this->ga->getReport($url) ){
            return $this->failure( $this->ga->getOutput() );
        }        
        $this->addSerie();
        
        // Get the second area for comparion
        $url = $this->ga->buildUrl($beforeDate['begin'], $beforeDate['end'], array('ga:date'), $this->metrics);        
        if( !$this->ga->getReport($url) ){
            return $this->failure( $this->ga->getOutput() );
        }         
        $this->addSerie();  
        
        $this->modx->cacheManager->set($cacheKey, $this->series, $this->ga->getOption('cache_timeout'));
        return $this->success( $this->series );
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
                $labelDate = $this->ga->getDates('d M Y');
                $serie['name'] = strtoupper( $labelDate['begin'] .' - '.$labelDate['end'] );
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
    public function success( $series, $fromCache = false ){
        $response = array(
            'success' => true,
            'series' => $series,
            'fromCache' => $fromCache,
        );
        return $this->modx->toJSON( $response );
    }
}
return 'getSeriesForComparisonAreaChart';