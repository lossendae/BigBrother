/**
 * The panel to view package detail
 * 
 * @class MODx.panel.GAAuthorize
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-authorize
 */
MODx.panel.GAAuthorize = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		 layout: 'form'
		,autoHeight: true
		,defaults: { border: false }
		,id: 'main-panel' //Allowing to add content easily
		,items:[{
		   xtype: 'modx-template-panel'
		   ,id: 'login-desc'
		},{
			xtype:'panel'
			,cls: 'main-wrapper centered'
			,id: 'login-panel'
			,unstyled : true	
			,hidden: true
			,buttonAlign: 'center'			
			,buttons: [{
				 xtype: 'button'
				,text: 'Start the login process'		
				,handler: this.getToken
				,scope: this
			}]
		}]		
	});
	MODx.panel.GAAuthorize.superclass.constructor.call(this,config);
	
	this.init();
};
Ext.extend(MODx.panel.GAAuthorize,MODx.Panel,{
	init: function(){		
		Ext.Ajax.request({
			url : MODx.bigbrotherConnectorUrl
			,params : { 
				action : 'admin/beforelogin'
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				if(!data.success){
					data.cls = 'desc-error';
				} else {
					data.cls = 'centered';
					Ext.getCmp('login-panel').show();
				}
				Ext.getCmp('login-desc').updateDetail(data);
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
			} 
		});
	}
	
	,getToken: function(){
		Ext.Ajax.request({
			url : MODx.bigbrotherConnectorUrl
			,params : { 
				action : 'admin/getAnonymousToken'
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				if(!data.success){
					data.cls = 'desc-error';
					Ext.getCmp('login-desc').updateDetail(data);
				} else {
					data.cls = 'loading';
					Ext.getCmp('login-desc').updateDetail(data);
					window.location = data.url;
				}				
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
			} 
		});
	}
});
Ext.reg('modx-panel-ga-authorize', MODx.panel.GAAuthorize);