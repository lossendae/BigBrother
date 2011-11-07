<?php
/**
 * Loads the core base js classes for mgr pages.
 *
 * @package bigbrother
 * @subpackage controllers
 */
$modx->regClientCSS($bigbrother->config['css_url'] .'styles.css');
 
/* App base definitions */
$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/admin/classes.js');
$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/admin/main.panel.js');

$oauth = '';
$oauth_token = $bigbrother->getOption('oauth_token');

/* @TODO HUGE REFACTORING */
if($oauth_token != null && $oauth_token != ''){

	$modx->regClientStartupScript('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js');
	$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/highcharts.src.js');

	$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/admin/accountlist.js');
	$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/admin/container.js');
	$xtype = 'modx-panel-ga-container';
} else {
	if(isset($_REQUEST['oauth_return'])){
		$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/admin/accountlist.js');
		$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/admin/secondstep.js');
		$xtype = 'modx-panel-ga-oauth-complete';
		
		$oauth = ( isset($_REQUEST['oauth_verifier'])) ? 'MODx.GAOAuthVerifier = "'. $_REQUEST['oauth_verifier'] .'";' : '';
		$oauth .= ( isset($_REQUEST['oauth_token'])) ? ' MODx.GAOAuthToken = "'. $_REQUEST['oauth_token'] .'";' : '';
	} else {
		$modx->regClientStartupScript($bigbrother->config['assets_url'].'mgr/admin/firststep.js');
		$xtype = 'modx-panel-ga-authorize';
	}
}
 
/* Properties */
$modx->regClientStartupHTMLBlock('<script type="text/javascript">
	MODx.bigbrotherConnectorUrl = "'.$bigbrother->config['connector_url'].'";
	MODx.bigbrotherAssetsUrl = "'.$bigbrother->config['assets_url'].'";
	MODx.bigbrotherAssetsPath = "'.$bigbrother->config['assets_path'].'";
	'. $oauth .'
	
	//Load App
	Ext.onReady(function() {
		MODx.add("modx-panel-bigbrother");	
		Ext.getCmp("modx-panel-bigbrother").add({ xtype: "'. $xtype .'" });
	});
</script>');

if($oauth_token != null && $oauth_token != ''){
	$account = $bigbrother->getOption('account');
	if($account != null && $account != ''){
		$modx->regClientStartupHTMLBlock('<script type="text/javascript">
			//Load App
			Ext.onReady(function() {
				Ext.getCmp("main").add({ xtype: "modx-panel-ga-report" });
				Ext.getCmp("main").add({ xtype: "modx-panel-ga-account-list" });
				// Ext.getCmp("report-panel").updateDesc();
			});
		</script>');
	} else {
		$modx->regClientStartupHTMLBlock('<script type="text/javascript">
			//Load App
			Ext.onReady(function() {				
				Ext.getCmp("main").add({ xtype: "modx-panel-ga-account-list" });
				Ext.getCmp("main").add({ xtype: "modx-panel-ga-report" });
				// Ext.getCmp("account-panel").updateDesc();
			});
		</script>');
	}
}

return '';