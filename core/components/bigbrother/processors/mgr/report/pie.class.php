<?php
/**
 * Pie chart default processor
 *
 * @package bigbrother
 * @subpackage processors
 */
class getPieSerieProcessor extends modProcessor {
    /** @var BigBrother */
    public $ga = null;
    public $dimensions = null;
    public $metrics = null;
    public $sort = null;
    public $lexiconKey = null;
    public $results = array();
    public $output = array();

    public function initialize() {
        $this->ga =& $this->modx->bigbrother;
        $this->dimensions = $this->formatProperty('dimensions', null);
        $this->metrics = $this->formatProperty('metrics', null);
        $this->sort = $this->formatProperty('sort', null);
        $this->lexiconKey = $this->getProperty('replace', 'none');
        return true;
    }

    public function formatProperty( $name, $default = null ){
        $property = $this->getProperty($name, $default);
        if( $property !== null && !is_array($property) ){
            $property = explode(",", $property);
        }
        return $property;
    }

    public function process() {
        $date = $this->ga->getDates();
        $url = $this->ga->buildUrl($date['begin'], $date['end'], $this->dimensions, $this->metrics, $this->sort);

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
        $row = array();
        $dimName = $this->getProperty('dimensions');
        foreach( $this->ga->report["rows"] as $key => $value ){
            $row['name'] = strtoupper( $this->ga->getDimensionName( $value[0] ) );
            $row['y'] = intval( $value[1] );
            $this->series['data'][] = $row;
        }
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
return 'getPieSerieProcessor';
