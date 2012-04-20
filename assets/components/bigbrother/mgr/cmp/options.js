Ext.ns('BigBrother')

/**
 * The panel containing the options for the CMP
 * 
 * @class BigBrother.Panel.Options
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-panel-options
 */
BigBrother.Panel.Options = function(config) {
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
                ,startingText: _('bigbrother.google_analytics_options')
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
            },{
                title: _('bigbrother.account_options')
                ,items:[{
                    xtype: 'bb-panel-dashboard-account-options'
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
    BigBrother.Panel.Options.superclass.constructor.call(this,config);
    this.on('afterrender', this.getData, this);
};
Ext.extend(BigBrother.Panel.Options,Ext.form.FormPanel,{
    getData: function(){
        this.getForm().load({
            url: BigBrother.ConnectorUrl
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
            ,url     : BigBrother.ConnectorUrl
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
Ext.reg('bb-panel-options', BigBrother.Panel.Options);

/**
 * The panel containing the options for the CMP
 * 
 * @class BigBrother.Panel.GeneralOptions
 * @extends Ext.Panel
 * @param {Object} config An object of options.
 * @xtype bb-panel-general-options
 */
BigBrother.Panel.GeneralOptions = function(config) {
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
                url: BigBrother.ConnectorUrl
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
                ,data : [['today', _('bigbrother.today')]
                    ,['yesterday', _('bigbrother.yesterday')]
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
    BigBrother.Panel.GeneralOptions.superclass.constructor.call(this,config);
};
Ext.extend(BigBrother.Panel.GeneralOptions, Ext.Panel);
Ext.reg('bb-panel-general-options', BigBrother.Panel.GeneralOptions);

/**
 * The panel containing the options for the Dashboard
 * 
 * @class BigBrother.Panel.DashboardOptions
 * @extends Ext.Panel
 * @param {Object} config An object of options.
 * @xtype bb-panel-general-options
 */
BigBrother.Panel.DashboardOptions = function(config) {
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
    BigBrother.Panel.DashboardOptions.superclass.constructor.call(this,config);
};
Ext.extend(BigBrother.Panel.DashboardOptions, Ext.Panel);
Ext.reg('bb-panel-dashboard-options', BigBrother.Panel.DashboardOptions);

/**
 * The panel containing the options for account settings
 * 
 * @class MODx.panel.BigBrotherDashboardAccountOptions
 * @extends Ext.Panel
 * @param {Object} config An object of options.
 * @xtype bb-panel-general-options
 */
MODx.panel.BigBrotherDashboardAccountOptions = function(config) {
    config = config || {};    
    Ext.applyIf(config,{
        layout: 'form'
        ,cls: 'form-with-labels account-options'
        ,labelAlign: 'top'
        ,autoHeight: true
        ,defaults: { 
            border: false 
            ,autoHeight: true
            ,anchor: '100%'    
        }
        ,items: [{
            xtype: 'modx-template-panel'
            ,startingMarkup: '<tpl for=".">{text}</tpl>'
            ,startingText: _('bigbrother.account_options_desc') 
        },{
            xtype: 'bigbrother-grid-assign-account-to-user'
            ,id: 'bigbrother-grid-assign-account-to-user'
        }]
    });
    MODx.panel.BigBrotherDashboardAccountOptions.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherDashboardAccountOptions, Ext.Panel);
Ext.reg('bb-panel-dashboard-account-options', MODx.panel.BigBrotherDashboardAccountOptions);


/**
 * A grid definition for data assignement
 * 
 * @class BigBrother.Grid.AssignAccountToUser
 * @extends Ext.grid.GridPanel
 * @param {Object} config An object of options.
 * @xtype bigbrother-grid-assign-account-to-user
 */
BigBrother.Grid.AssignAccountToUser = function(config) {
    config = config || {};
    this._init();
    Ext.applyIf(config,{
        fields: ['id','fullname','account']
        ,clicksToEdit: 1
        ,columns: [
            {header: "ID", dataIndex: 'id', hidden: true}
            // ,{id:'bb-user-grid-row', header: "name", dataIndex: 'fullname', renderer: { fn: this.rowRenderer, scope: this }}
            ,{id:'bb-user-grid-row', header: _('bigbrother.rowheader_name'), dataIndex: 'fullname'}
            ,{header: _('bigbrother.rowheader_account'), dataIndex: 'account'
                , editor: new Ext.form.ComboBox({
                    typeAhead: false
                    ,mode: 'local'
                    ,triggerAction: 'all'
                    ,lazyRender: false
                    ,editable: false
                    ,selectOnFocus: true
                    // ,listClass: 'x-combo-list-small'
                    ,displayField: 'name'
                    ,valueField: 'id'
                    ,store: this.comboStore
                })
            }
        ]
        ,viewConfig: {
            forceFit: true
            ,scrollOffset: 0
            ,emptyText: _('ext_emptymsg')
            ,getRowClass: function(record, rowIndex, rp, ds){
                var rowClass = (record.get('account')) ? 'is-assigned' : '';
                return rowClass;
            }
        }
        ,tbar:['->',{
            xtype: 'trigger'
            ,id: 'albums-searchfield'
            ,ctCls: 'customsearchfield'
            ,emptyText: _('bigbrother.search_placeholder')
            ,onTriggerClick: function(){
                this.reset();    
                this.fireEvent('click');                
            }
            ,listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        this.getStore().setBaseParam('query',field.getValue());
                        this.getStore().load();
                    }
                }
                ,click: function(trigger){
                    this.getStore().setBaseParam('query','');
                    this.getStore().load();
                }
                ,scope: this
            }
        }]
        ,bbar: new Ext.PagingToolbar({
            pageSize: 10
            ,store: this.store
            ,displayInfo: true
            ,displayMsg: 'Listing {0} to {1} of {2} users'
            ,emptyMsg: "No users found"
        })
        ,cls: 'bb-preview-grid'
    })
    BigBrother.Grid.AssignAccountToUser.superclass.constructor.call(this,config);
    this.on('afterrender',this.onAfterRender,this);
    this.getStore().on('exception',this.onStoreException,this);
    this.on('afteredit',this.onAfterEdit,this);    
};
Ext.extend(BigBrother.Grid.AssignAccountToUser, Ext.grid.EditorGridPanel,{
    _init: function(){
        /* Grid store */
        this.store = new Ext.data.JsonStore({
            url: BigBrother.ConnectorUrl
            ,baseParams: { 
                action: 'manage/getUserList'
                ,start: 0
                ,limit: 10
            }
            ,totalProperty: 'total'
            ,root: 'data'
            ,fields: ['id','fullname','account']
            ,remoteSort: false
            ,storeId: Ext.id()
            ,autoDestroy: true
            ,listeners:{
                load: function(){ Ext.getCmp('modx-content').doLayout(); }
                ,scope: this
            }
        })
        /* Available Account list store */
        this.comboStore = new Ext.data.JsonStore({
            url: BigBrother.ConnectorUrl
            ,root: 'results'
            ,totalProperty: 'total'
            ,fields: ['id', 'name']
            ,errorReader: MODx.util.JSONReader
            ,baseParams: {
                action : 'manage/accountlist'
                ,assign : true
            }
        })
    }
    
    ,onStoreException: function(dp,type,act,opt,resp){
        var r = Ext.decode(resp.responseText);
        if (!r.success) {
            this.getView().emptyText = '<div class="empty-msg x-grid3-row">'+ r.message +'</div>';
            this.getView().refresh(false);
        }
    }
    
    ,onAfterRender: function(){
        /* grid store */
        this.store.load();
        /* Account list */
        this.comboStore.load();
    }
    
    ,onAfterEdit: function(e){
        if(e.originalValue != e.value){
            var accountName = this.comboStore.query('id', e.value).get(0).data.name;
            Ext.Ajax.request({
                url : BigBrother.ConnectorUrl
                ,params : { 
                    action : 'manage/assignAccount'
                    ,account : e.value
                    ,accountName : accountName
                    ,user : e.record.data.id
                }
                ,method: 'GET'
                ,scope: this
                ,success: function ( result, request ) { 
                    var data = Ext.util.JSON.decode( result.responseText );
                    if(!data.success){
                        Ext.MessageBox.alert(_('bigbrother.alert_failed'), data.msg); 
                    } else {
                        /* Remove mark dirty */
                        e.record.commit();
                        /* Reload current page */
                        this.store.reload();
                    }
                }
                ,failure: function ( result, request) { 
                    Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
                } 
            });
        }
    }
});
Ext.reg('bigbrother-grid-assign-account-to-user', BigBrother.Grid.AssignAccountToUser);