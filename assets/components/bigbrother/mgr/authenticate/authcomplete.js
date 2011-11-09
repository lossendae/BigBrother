/**
 * The panel to proceed the login process with OAuth
 * 
 * @class MODx.panel.BigBrotherAuthComplete
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-authcomplete
 */
MODx.panel.BigBrotherAuthComplete = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		id: 'modx-panel-bigbrother'
        ,cls: 'container'
        ,unstyled: true
        ,defaults: { collapsible: false ,autoHeight: true }
        ,items: [{
            html: '<h2>'+_('bigbrother_main_title')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
		},{
			layout: 'form'
			,autoHeight: true
			,defaults: { border: false }
			,id: 'main-panel'
			,items:[{
				xtype: 'modx-breadcrumbs-panel'
				,id: 'bb-breadcrumbs'
				,desc: 'Loading...'
				,root : { 
					text : '1. Verify Prerequisite'
					,className: 'first'
				}
			},{
				xtype:'bb-account-list'
				,cls: 'main-wrapper centered'
				,id: 'account-panel'
			}]
		}]
	});
	MODx.panel.BigBrotherAuthComplete.superclass.constructor.call(this,config);
	
	this.init();
};
Ext.extend(MODx.panel.BigBrotherAuthComplete,MODx.Panel,{	
	init: function(){
		var bd = { text: 'Authentification in progress...' };
		bd.trail = [{ 
			text : '2. Authorize'
		}];
		me = this;
		setTimeout(function(){
			Ext.getCmp('bb-breadcrumbs').updateDetail(bd);
			me.complete();
		}, 800);
	}
	
	,complete: function(){		
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : 'authenticate/oauthComplete'
				,oauth_verifier : MODx.OAuthVerifier
				,oauth_token : MODx.OAuthToken
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				if(!data.success){
					data.className = 'highlight desc-error';
				} else {
					Ext.getCmp('account-panel').show();
					Ext.getCmp('account-list').store.load();
				}				
				Ext.getCmp('bb-breadcrumbs').updateDetail(data);
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
			} 
		});
	}
});
Ext.reg('bb-authcomplete', MODx.panel.BigBrotherAuthComplete);

/**
 * The panel containing the analytics
 * 
 * @class MODx.panel.BigBrotherAccountList
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-account-list
 */
MODx.panel.BigBrotherAccountList = function(config) {
    config = config || {};	
	Ext.applyIf(config,{		
		items: [{
			xtype: 'combo'
			,displayField: 'name'
			,valueField: 'id'
			,triggerAction: 'all'
			,width: 300
			,editable: false
			,typeAhead: true
			,forceSelection: true
			,hideLabel: true
			,minChars: 3
			,emptyText: 'Select an account...'
			,id: 'account-list'
			,store: new Ext.data.JsonStore({
				url: MODx.BigBrotherConnectorUrl
				,root: 'results'
				,totalProperty: 'total'
				,fields: ['id', 'name']
				,errorReader: MODx.util.JSONReader
				,baseParams: {
					action : 'manage/accountlist'
				}
			})
		}]
		,buttonAlign: 'center'			
		,buttons: [{
			 xtype: 'button'
			,text: 'Select this account'		
			,handler: this.selectAccount
			,scope: this
		}]						
	});
	MODx.panel.BigBrotherAccountList.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherAccountList,MODx.Panel,{
	selectAccount: function(){		
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : 'manage/setAccount'
				,account : Ext.getCmp('account-list').getValue()
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				if(!data.success){
					data.className = 'highlight desc-error';
					Ext.getCmp('bb-breadcrumbs').updateDetail(data);
				} else {	
					data.className = 'highlight loading';
					Ext.getCmp('bb-breadcrumbs').updateDetail(data);
					setTimeout(function(){
						window.location = MODx.BigBrotherRedirect;
					}, 800);					
				}				
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
			} 
		});
	}
});
Ext.reg('bb-account-list', MODx.panel.BigBrotherAccountList);