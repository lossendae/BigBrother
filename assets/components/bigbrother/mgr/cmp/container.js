/**
 * The panel container for the cmp
 * 
 * @class BigBrother.MainPanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-panel
 */
BigBrother.MainPanel = function(config) {
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
    BigBrother.MainPanel.superclass.constructor.call(this,config);    
    this.init();
};
Ext.extend(BigBrother.MainPanel,MODx.Panel, {
    init: function(){
        me = this;
        this.actionToolbar = new Ext.Toolbar({
            renderTo: "modAB"
            ,id: 'modx-action-buttons'
            ,defaults: { scope: me }
            ,items: []
        });                                
        this.actionToolbar.doLayout();
    }
    
    ,showOptionsPanel: function(){
        var tabs = this.getComponent('tabs');
        tabs.add({ xtype: 'bb-panel-options' });
        tabs.setActiveTab('options-panel');        
        this.doLayout();
    }
    
    ,revokeAuthorizationPromptWindow: function(btn){
        Ext.Msg.show({
            title: _('bigbrother.revoke_permission')
            ,msg: _('bigbrother.revoke_permission_msg')
            ,cls: 'revoke-window'
            ,buttons: Ext.Msg.OKCANCEL
            ,fn: this.revokeAuthorization
            ,animEl: btn.id
            ,icon: Ext.MessageBox.WARNING  
        });
    }
    
    ,revokeAuthorization: function(action){
        var pnl = Ext.getCmp('bb-panel');        
        if(action == 'ok'){
            pnl.disable();
            Ext.Ajax.request({
                url : BigBrother.ConnectorUrl
                ,params : { action : 'manage/revoke' }
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
    
    ,redirect: function(){ location.href = BigBrother.RedirectUrl; }
});
Ext.reg('bb-panel', BigBrother.MainPanel);