<?php
/**
 * Grid default processor
 *
 * @package bigbrother
 * @subpackage processors
 */
class getDataForGrid extends modProcessor {
    /** @var BigBrother */
    public $ga = null;
    public $limit = null;
    public $name = null;
    public $filters = null;
    public $metrics = null;
    public $dimension = null;
    public $visits = null;

    public function initialize() {
        $this->ga =& $this->modx->bigbrother;
        $this->limit = $this->getProperty('limit', 15);
        $this->name = $this->getProperty('fieldName', 'page');
        $this->filters = $this->formatProperty('filters', null);
        $this->dimension = $this->formatProperty('dimension', null);
        $this->metrics = $this->formatProperty('metrics', array('ga:visits'));
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
        $url = $this->ga->buildUrl($date['begin'], $date['end'], $this->dimension, $this->metrics, array('-ga:visits'), $this->filters, $this->limit);

        $cacheKey = $this->ga->cacheKey;
        $fromCache = $this->modx->cacheManager->get($cacheKey);
        if( !empty($fromCache) ){
            return $this->success( 'Fetched data from cache', $fromCache, true );
        }
        if( !$this->ga->loadOAuth() ){
            return $this->failure('Could not load the OAuth file.');
        }
        if( !$this->ga->getReport($url) ){
            return $this->failure( $this->ga->getOutput() );
        }
        $this->visits = $this->ga->getTotalVisits($date['begin'], $date['end']);
        $response = $this->iterate();
        $this->modx->cacheManager->set($cacheKey, $response, $this->ga->getOption('cache_timeout'));
        return $this->success( 'Fetched data from Google', $response );
    }

    /**
     * Iterate through the report data
     * @return array
     */
    public function iterate(){
        $response = $rows = $row = array();
        if (isset($this->ga->report['rows'])) {
            foreach ($this->ga->report['rows'] as $key => $value) {
                $row[$this->name] = $value[0];
                $row['visits'] = intval($value[1]);
                $row['percent'] = round($row['visits'] / $this->visits * 100, 2) . ' %';
                $rows[] = $row;
            }
        }
        $response['total'] = count($rows);
        $response['results'] = $rows;
        return $response;
    }

    /**
     * Return a success message from the processor.
     * @param array $output
     * @return string
     */
    public function success( $msg = '', $output = null, $fromCache = false ){
        $response = array_merge( array(
            'success' => true,
            'fromCache' => $fromCache,
        ), $output);
        return $this->modx->toJSON( $response );
    }
}
return 'getDataForGrid';
