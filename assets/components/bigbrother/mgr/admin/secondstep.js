/**
 * The panel to proceed the login process with OAuth
 * 
 * @class MODx.panel.GAOauthComplete
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.GAOauthComplete = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		 layout: 'form'
		,autoHeight: true
		,defaults: { border: false }
		,id: 'main-panel'
		,items:[{
		   xtype: 'modx-template-panel'
		   ,id: 'desc'
		},{
			xtype:'panel'
			,cls: 'main-wrapper centered'
			,id: 'login-panel'
			,unstyled : true	
			,hidden: true
		}]		
	});
	MODx.panel.GAOauthComplete.superclass.constructor.call(this,config);
	
	this.init();
};
Ext.extend(MODx.panel.GAOauthComplete,MODx.Panel,{
	init: function(){		
		Ext.Ajax.request({
			url : MODx.bigbrotherConnectorUrl
			,params : { 
				action : 'admin/oauthcomplete'
				,oauth_verifier : MODx.GAOAuthVerifier
				,oauth_token : MODx.GAOAuthToken
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				if(!data.success){
					data.cls = 'desc-error';
				} else {
					// data.cls = 'centered';
				}
				Ext.getCmp('desc').updateDetail(data);
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
			} 
		});
	}
});
Ext.reg('modx-panel-ga-oauth-complete', MODx.panel.GAOauthComplete);