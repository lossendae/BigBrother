/**
 * The panel containing the analytics
 * 
 * @class MODx.panel.BigBrotherPanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.BigBrotherPanel = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		id: 'bb-panel'
        ,cls: 'container'
        ,bodyStyle: ''
		,unstyled:true		
        ,items: [{
            html: '<h2>'+_('bigbrother.main_title')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },MODx.getPageStructure([{
			xtype: 'bb-panel-content-overview'
		},{
			xtype: 'bb-panel-audience-overview'
		},{
			xtype: 'bb-panel-traffic-sources-overview'
		}])]	
	});
	MODx.panel.BigBrotherPanel.superclass.constructor.call(this,config);
	
	this.init();
};
Ext.extend(MODx.panel.BigBrotherPanel,MODx.Panel, {
	init: function(){
		me = this;
		this.actionToolbar = new Ext.Toolbar({
			renderTo: "modAB"
			,id: 'modx-action-buttons'
			,defaults: { scope: me }
			,items: []
		});		
		this.actionToolbar.add({
			xtype: 'modx-template-panel'
			,id: 'report-dates'
			,bodyCssClass: 'report-dates'
			,markup: '<tpl for=".">'
				+'Reports from <span>{begin}</span> to <span>{end}</span>'
			+'</tpl>'
		});			
		this.actionToolbar.doLayout();
		this.getDates();
	}
	
	//For future usage
	/* ,showOptionsPanel: function(){
		// var tabs = this.getComponent('tabs');
		// tabs.add({ xtype: 'bb-panel-options' });
		// tabs.setActiveTab('options-panel');		
		// this.doLayout();
	} */
	
	,getDates: function(){
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : 'report/getDates'
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				var data = Ext.util.JSON.decode( result.responseText );			
				if(data.success){ Ext.getCmp('report-dates').updateDetail(data.results); }
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
			} 
		});
		
	}
	
	,loadAccountWindow: function(btn){
		if(!this.win){
			this.win = new Ext.Window({
				cls: 'win'
				,title: _('bigbrother.select_another_account')
				,closeAction: 'hide'
				,border: false		
				,width: 400
				,items: [{
					xtype: 'modx-template-panel'
					,id: 'winca-desc'
					,bodyCssClass: 'win-desc panel-desc'
					,startingMarkup: '<tpl for="."><p>{text}</p></tpl>'
					,startingText: _('bigbrother.select_another_account_desc')
				},{
					layout: 'form'
					,border: false
					,bodyCssClass: 'main-wrapper'
					,items:[{
						xtype: 'combo'
						,displayField: 'name'
						,valueField: 'id'
						,triggerAction: 'all'
						,anchor: '100%'
						,editable: false
						,forceSelection: true
						,hideLabel: true
						,emptyText: _('bigbrother.oauth_select_account')	
						,id: 'account-list'
						,listClass: 'account-list'
						,ctCls: 'cb-account-list'
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
						,listeners : {
							'select' : function(c){
								Ext.getCmp('select-account-btn').enable();
							}
						}
					}]		
				}]			
				,buttons: [{
					text: _('cancel')
					,scope: this
					,handler: function() { this.win.hide(); }
				},{
					 xtype: 'button'
					,id: 'select-account-btn'
					,text: _('bigbrother.change_account')
					,handler: this.selectAccount
					,disabled: true
					,scope: this
				}]
			});
		}
		this.win.show(btn.id);
	}
	
	,selectAccount: function(btn){
		this.disable();
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : 'manage/setAccount'
				,account : Ext.getCmp('account-list').getValue()
				,accountName : Ext.getCmp('account-list').getRawValue()
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				var data = Ext.util.JSON.decode( result.responseText );
				this.win.hide();				
				if(data.success){ this.redirect() }
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
				this.enable();
			} 
		});
	}
	
	,revokeAuthorizationPromptWindow: function(btn){
		Ext.Msg.show({
			title: _('bigbrother.revoke_permission'),
			msg: _('bigbrother.revoke_permission_msg'),
			buttons: Ext.Msg.OKCANCEL,
			fn: this.revokeAuthorization,
			animEl: btn.id,
			icon: Ext.MessageBox.WARNING  
		});
	}
	
	,revokeAuthorization: function(action){
		var pnl = Ext.getCmp('bb-panel');		
		if(action == 'ok'){
			pnl.disable();
			Ext.Ajax.request({
				url : MODx.BigBrotherConnectorUrl
				,params : { 
					action : 'manage/revoke'
				}
				,method: 'GET'
				,scope: pnl
				,success: function ( result, request ) { 
					var data = Ext.util.JSON.decode( result.responseText );						
					if(data.success){ this.redirect() }
				}
				,failure: function ( result, request) { 
					Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
					pnl.enable();
				} 
			});
		}
	}
	
	,redirect: function(){ location.href = MODx.BigBrotherRedirect; }
});
Ext.reg('bb-panel', MODx.panel.BigBrotherPanel);