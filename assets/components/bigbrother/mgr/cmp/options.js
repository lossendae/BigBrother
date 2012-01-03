/**
 * The panel containing the options for the CMP
 * 
 * @class MODx.panel.BigBrotherOptions
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-panel-options
 */
MODx.panel.BigBrotherOptions = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		title: _('bigbrother.options')	
		,closable: true
		,id: 'options-panel'
		,defaults: { 
			border: false 
		}
		,items:[{
			layout: 'column'
			,cls: 'styled-desc'
			,unstyled: true
			,defaults:{
				unstyled: true
			}
			,items: [{
				xtype: 'modx-template-panel'
				,id: 'bb-options-desc'
				,startingMarkup: '<tpl for=".">'
					+'<h3>{text}</h3>'
				+'</tpl>'
				,startingText: 'Google Analytics Options'
				,columnWidth: 1
			},{
				xtype: 'panel'
				,cls: 'action-button'
				,width: 200
				,buttonAlign: 'center'
				,buttons:[{
					text: _('bigbrother.save_settings')
					,handler: this.saveSettings
					,scope: this
				}]
			}]
		},{			 
			xtype: 'bb-vtabs'
			,id: 'options-tabs'
			,cls: 'vertical-tabs-panel wrapped main-wrapper'
			,items:[{
				title: _('bigbrother.general_options')					
				,items:[{
					xtype: 'bb-panel-general-options'	
					,border: false 	
					,autoWidth: false 	
				}]
			},{
				title: _('bigbrother.dashboard_options')
				,items:[{
					xtype: 'bb-panel-dashboard-options'
					,border: false 	
					,autoWidth: false
				}]
			}]		
		}]	
		,listeners:{
			close: function(){
				Ext.getCmp('options-btn').enable();
			}
			,tabchange: function(){
				Ext.getCmp('bb-panel').doLayout();
			}
		}
	});
	MODx.panel.BigBrotherOptions.superclass.constructor.call(this,config);
	this.on('afterrender', this.getData, this);
};
Ext.extend(MODx.panel.BigBrotherOptions,Ext.form.FormPanel,{
	getData: function(){
		this.getForm().load({
			url: MODx.BigBrotherConnectorUrl
			,params : {
				action : 'manage/getOptions'
			}
			,waitMsg: _('bigbrother.loading')
			,success: this.onGetDataSuccess
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
			} 
			,scope: this
		});
	}
	,onGetDataSuccess: function( response, request ){}
	,saveSettings: function(){
		var account = Ext.getCmp('account').getValue();
		this.getForm().submit({
			waitMsg: _('bigbrother.loading')
			,url     : MODx.BigBrotherConnectorUrl
			,params : {
				action : 'manage/saveOptions'
				,account : account
			}
			,success : function (form, action){
				var r = action.result;
				if(r.success){ 
					//Update with a success message
				}
				if(r.redirect){
					Ext.getCmp('bb-panel').disable();
					location.href = MODx.BigBrotherRedirect; 
				}
			} 
			,failure : function ( result, request) { 				
				Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
			} 
			,scope: this
		});
	}
});
Ext.reg('bb-panel-options', MODx.panel.BigBrotherOptions);

/**
 * The panel containing the options for the CMP
 * 
 * @class MODx.panel.BigBrotherGeneralOptions
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-panel-general-options
 */
MODx.panel.BigBrotherGeneralOptions = function(config) {
	config = config || {};	
	Ext.applyIf(config,{
		layout: 'form'
		,cls: 'form-with-labels'
		,labelAlign: 'top'
		,autoHeight: true
		,defaults: { 
			border: false 
			,autoHeight: true
			,anchor: '100%'	
		}
		,items: [{
			fieldLabel: _('bigbrother.accounts_list')
			,name: 'account_name'
			,id: 'account'					
			,xtype: 'combo'
			,displayField: 'name'
			,valueField: 'id'
			,triggerAction: 'all'
			,editable: false
			,typeAhead: false
			,forceSelection: true
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
					,loadAll : true
				}
			})
		},{
			xtype: 'label'
			,forId: 'account'
			,text: _('bigbrother.accounts_list_desc')
			,cls: 'desc-under'
		},{
			fieldLabel: _('bigbrother.date_range')
			,name: 'date_begin'
			,id: 'date_begin'		
			,xtype: 'combo'
			,listClass: 'account-list'
			,store: new Ext.data.ArrayStore({
				fields: ['d', 'v']
				,data : [[15, _('bigbrother.15_days')]
					,[30, _('bigbrother.30_days')]
					,[45, _('bigbrother.45_days')]
					,[60, _('bigbrother.60_days')]
				]
			})
			,displayField:'v'
			,valueField:'d'
			,hiddenName : 'date_begin'
			,typeAhead: false
			,editable: false
			,mode: 'local'
			,forceSelection: true
			,triggerAction: 'all'
			,selectOnFocus:true
		},{
			xtype: 'label'
			,forId: 'date_begin'
			,text: _('bigbrother.date_range_desc')
			,cls: 'desc-under'
		},{
			fieldLabel: _('bigbrother.report_end_date')
			,name: 'date_end'
			,id: 'date_end'
			,xtype: 'combo'
			,listClass: 'account-list'
			,store: new Ext.data.ArrayStore({
				fields: ['d', 'v']
				,data : [['today', 'Today']
					,['yesterday', 'Yesterday']
				]
			})
			,displayField:'v'
			,valueField:'d'
			,hiddenName : 'date_end'
			,typeAhead: false
			,editable: false
			,mode: 'local'
			,forceSelection: true
			,triggerAction: 'all'
			,selectOnFocus:true
		},{
			xtype: 'label'
			,forId: 'date_end'
			,text: _('bigbrother.report_end_date_desc')
			,cls: 'desc-under'
		},{
			fieldLabel: _('bigbrother.caching_time')
			,name: 'cache_timeout'
			,id: 'cache_timeout'
			,xtype: 'textfield'
			,allowBlank: false
		},{
			xtype: 'label'
			,forId: 'cache_timeout'
			,text: _('bigbrother.caching_time_desc')
			,cls: 'desc-under'
		},{
			fieldLabel: _('bigbrother.admin_groups')
			,name: 'admin_groups'
			,id: 'admin_groups'
			,xtype: 'textfield'
			,allowBlank: false
		},{
			xtype: 'label'
			,forId: 'admin_groups'
			,text: _('bigbrother.admin_groups_desc')
			,cls: 'desc-under'
		}]
	});
	MODx.panel.BigBrotherGeneralOptions.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherGeneralOptions, Ext.Panel,{});
Ext.reg('bb-panel-general-options', MODx.panel.BigBrotherGeneralOptions);

/**
 * The panel containing the options for the Dashboard
 * 
 * @class MODx.panel.BigBrotherDashboardOptions
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-panel-general-options
 */
MODx.panel.BigBrotherDashboardOptions = function(config) {
	config = config || {};	
	Ext.applyIf(config,{
		layout: 'form'
		,cls: 'form-with-labels'
		,labelAlign: 'top'
		,autoHeight: true
		,defaults: { 
			border: false 
			,autoHeight: true
			,anchor: '100%'	
		}
		,items: [{
			xtype: 'hidden'
			,name: 'dashboard_options'
			,id: 'dashboard_options'
			,value: true
		},{
			fieldLabel: _('bigbrother.show_visits_on_dashboard')
			,xtype: 'combo-boolean'
			,name: 'show_visits_on_dashboard'
			,id: 'show_visits_on_dashboard'					
			,hiddenName : 'show_visits_on_dashboard'
		},{
			xtype: 'label'
			,forId: 'show_visits_on_dashboard'
			,text: _('bigbrother.show_visits_on_dashboard_desc')
			,cls: 'desc-under'
		},{
			fieldLabel: _('bigbrother.show_metas_on_dashboard')
			,xtype: 'combo-boolean'
			,name: 'show_metas_on_dashboard'
			,id: 'show_metas_on_dashboard'					
			,hiddenName : 'show_metas_on_dashboard'
		},{
			xtype: 'label'
			,forId: 'show_metas_on_dashboard'
			,text: _('bigbrother.show_metas_on_dashboard_desc')
			,cls: 'desc-under'
		},{
			fieldLabel: _('bigbrother.show_pies_on_dashboard')
			,xtype: 'combo-boolean'
			,name: 'show_pies_on_dashboard'
			,id: 'show_pies_on_dashboard'					
			,hiddenName : 'show_pies_on_dashboard'
		},{
			xtype: 'label'
			,forId: 'show_pies_on_dashboard'
			,text: _('bigbrother.show_pies_on_dashboard_desc')
			,cls: 'desc-under'
		}]
	});
	MODx.panel.BigBrotherDashboardOptions.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherDashboardOptions, Ext.Panel,{});
Ext.reg('bb-panel-dashboard-options', MODx.panel.BigBrotherDashboardOptions);