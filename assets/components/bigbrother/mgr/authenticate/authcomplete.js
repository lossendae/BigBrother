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
            html: '<h2>'+_('bigbrother.main_title')+'</h2>'
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
                ,desc: _('bigbrother.bd_oauth_complete_in_progress')
                ,root : { 
                    text : _('bigbrother.bd_root_crumb_text')
                    ,className: 'first'
                    ,root: true
                }
                //Method override to allow default crumbs to not be limited to root
                ,reset: function(msg){    
                    if(typeof(this.resetText) == "undefined"){
                        this.resetText = this.getResetText([{ 
                            text : _('bigbrother.bd_root_crumb_text')
                            ,className: 'first'
                            ,root: true
                        },{    text : _('bigbrother.bd_oauth_authorize') }]);
                    }
                    var data = { text : msg ,trail : this.resetText };
                    this._updatePanel(data);
                }    
            },{
                xtype:'bb-account-list'
                ,id: 'account-panel'                
            }]
        }]
    });
    MODx.panel.BigBrotherAuthComplete.superclass.constructor.call(this,config);
    
    this.init();
};
Ext.extend(MODx.panel.BigBrotherAuthComplete,MODx.Panel,{    
    init: function(){            
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
                var data = Ext.util.JSON.decode( result.responseText );
                if(!data.success){
                    data.className = 'highlight desc-error';
                } else {
                    Ext.getCmp('account-panel').show();
                    Ext.getCmp('account-list').store.load();
                    Ext.getCmp('account-list').setWidth(300);
                }                
                Ext.getCmp('bb-breadcrumbs').updateDetail(data);
            }
            ,failure: function ( result, request) { 
                Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
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
        cls: 'main-wrapper'
        ,layout: 'form'
        ,hidden: true
        ,hideMode: 'offsets'
        ,items: [{
            xtype: 'combo'
            ,displayField: 'name'
            ,valueField: 'id'
            ,triggerAction: 'all'
            ,width: 350
            ,editable: false
            ,typeAhead: false
            ,forceSelection: true
            ,hideLabel: true
            ,listClass: 'account-list'
            ,ctCls: 'cb-account-list'
            ,emptyText: _('bigbrother.oauth_select_account')    
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
            ,listeners : {
                'select' : function(c){
                    Ext.getCmp('select-account-btn').enable();
                }
            }
        }]
        ,buttonAlign: 'center'            
        ,buttons: [{
             xtype: 'button'
            ,id: 'select-account-btn'
            ,text: _('bigbrother.oauth_btn_select_account')    
            ,handler: this.selectAccount
            ,disabled: true
            ,scope: this
        }]                        
    });
    MODx.panel.BigBrotherAccountList.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherAccountList,Ext.Panel,{
    selectAccount: function(){    
        Ext.getCmp('select-account-btn').disable();
        Ext.getCmp('account-list').disable();
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
                if(!data.success){
                    data.className = 'highlight desc-error';
                    Ext.getCmp('bb-breadcrumbs').updateDetail(data);
                } else {    
                    data.className = 'highlight loading';
                    Ext.getCmp('bb-breadcrumbs').updateDetail(data);
                    setTimeout(function(){
                        location.href = MODx.BigBrotherRedirect;
                    }, 800);                    
                }                
            }
            ,failure: function ( result, request) { 
                Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
            } 
        });
    }
});
Ext.reg('bb-account-list', MODx.panel.BigBrotherAccountList);