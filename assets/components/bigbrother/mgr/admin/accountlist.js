/**
 * The panel containing the analytics
 * 
 * @class MODx.panel.GAAccountList
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.GAAccountList = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		cls: 'main-wrapper centered'
		,id: 'account-panel'
		,layout: 'form'
		,items: [{
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
				url: MODx.bigbrotherConnectorUrl
				,root: 'results'
				,totalProperty: 'total'
				,fields: ['id', 'name']
				,errorReader: MODx.util.JSONReader
				,baseParams: {
					action : 'admin/getaccountlist'
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
	MODx.panel.GAAccountList.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.GAAccountList,MODx.Panel,{
	activate: function(){
		// console.log(Ext.getCmp('main').getLayout())
		Ext.getCmp('main').getLayout().setActiveItem('account-panel');	
		this.updateDesc();
	}
	
	,updateDesc: function(){
		data = {};
		data.message = "Selectionnez un compte favoris pour le rapport Google analytics"
		setTimeout(function(){ 
			Ext.getCmp('desc').updateDetail(data); 
		}, 500);		
	}
	
	,selectAccount: function(){		
		Ext.Ajax.request({
			url : MODx.bigbrotherConnectorUrl
			,params : { 
				action : 'admin/setaccount'
				,account : Ext.getCmp('account-list').getValue()
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				console.log(data);
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
			} 
		});
	}
});
Ext.reg('modx-panel-ga-account-list', MODx.panel.GAAccountList);