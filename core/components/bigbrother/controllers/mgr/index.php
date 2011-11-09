<?php
/**
 * Loads the core base js classes for mgr pages.
 *
 * @package bigbrother
 * @subpackage controllers
 */
$modx->regClientCSS($bigbrother->config['css_url'] .'styles.css');

$oauth = '';
$oauth_token = $bigbrother->getOption('oauth_token');

if($oauth_token == null && $oauth_token == ''){
	//Authorize process
	if(!isset($_REQUEST['oauth_return'])){
		$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/authenticate/panel.js');
		$modx->regClientStartupHTMLBlock('<script type="text/javascript">
			MODx.BigBrotherConnectorUrl = "'.$bigbrother->config['connector_url'].'";
		
			Ext.onReady(function(){ MODx.add("bb-authorize-panel"); });
		</script>');	
	//We've got an anonymous token - let us choose the account to use
	} else {
		$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/authenticate/authcomplete.js');
		
		$page = $modx->getObject('modAction', array(
			'namespace' => 'bigbrother',
			'controller' => 'index',
		));
		$url = $modx->getOption('site_url') . 'manager?a='. $page->get('id');
		
		$oauth = ( isset($_REQUEST['oauth_verifier'])) ? 'MODx.OAuthVerifier = "'. $_REQUEST['oauth_verifier'] .'";' : '';
		$oauth .= ( isset($_REQUEST['oauth_token'])) ? ' MODx.OAuthToken = "'. $_REQUEST['oauth_token'] .'";' : '';
		$modx->regClientStartupHTMLBlock('<script type="text/javascript">
			MODx.BigBrotherRedirect = "'.$url.'";
			MODx.BigBrotherConnectorUrl = "'.$bigbrother->config['connector_url'].'";
			'. $oauth .'
			
			Ext.onReady(function() { MODx.add("bb-authcomplete"); });
		</script>');
	}
//Load the Google Analytics Dashboard
} else {
	//JQuery + charts class
	$modx->regClientStartupScript('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js');
	$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/lib/highcharts.js');
	
	//Basic reusable panels
	$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/lib/classes.js');
	$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/lib/charts.js');
	
	//Main logic
	$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/cmp/container.js');
	$modx->regClientStartupHTMLBlock('<script type="text/javascript">
		MODx.BigBrotherConnectorUrl = "'.$bigbrother->config['connector_url'].'";
		
		Ext.onReady(function() { MODx.add("bb-panel");	});
	</script>');
}

return '';