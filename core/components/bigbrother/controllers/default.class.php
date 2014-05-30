<?php

/**
 * BigBrother
 *
 *
 * @package    bigbrother
 * @subpackage controllers
 */
class BigBrotherDefaultManagerController extends BigBrotherManagerController
{

    protected static $js = array(
        'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.16/angular.js',
        'http://cdnjs.cloudflare.com/ajax/libs/d3/3.4.8/d3.min.js',
        'http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.js',
        'http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.6.0/moment.js',
        'js/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
        'js/angularjs-nvd3-directives/src/directives/legendDirectives.js',
    );

    protected static $css = array(
        'http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.css',
    );

    public function getPageTitle() { return $this->modx->lexicon('bigbrother'); }

    /**
     * @return string
     */
    public function getTemplateFile()
    {
        return $this->service->config['mgr_template_path'] . 'cmp/index.tpl';
    }

    /**
     * All the assets (JS & CSS) related to the CMP will be prepared and loaded from here
     */
    public function loadCustomCssJs()
    {
        foreach(static::$css as $css)
        {
            $css = substr($css, 0, 4) == 'http' ? $css: $this->service->config['assets_url'] . 'refactor/' . $css;
            $this->addCss($css);
        }
    }

    /**
     * Handle the JS registration for the cmp
     */
    public function firePostRenderEvents()
    {
        foreach(static::$js as $js)
        {
            $js = substr($js, 0, 4) == 'http' ? $js: $this->service->config['assets_url'] . 'refactor/' . $js;
            $this->injectBeforeClosingBodyTag('<script src="' . $js . '"></script>');
        }

        $bootstrapScript = file_get_contents($this->service->config['assets_path'] . 'refactor/js/test.js');
        $this->injectBeforeClosingBodyTag('<script type="text/javascript">' . $bootstrapScript . '</script>');
    }

    /**
     * Custom logic code here for setting placeholders, etc
     *
     * @param array $scriptProperties
     * @return mixed
     */
    public function process(array $scriptProperties = array())
    {

    }

    protected function injectBeforeClosingBodyTag($content)
    {
        $this->content = preg_replace("/(<\/body>)/i", $content . "\n\\1", $this->content, 1);
    }
}
