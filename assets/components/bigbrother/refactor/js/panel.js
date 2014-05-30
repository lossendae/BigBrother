/**
 * The panel for authenticating to google analytics
 * 
 * @class MODx.panel.BigBrotherAuthorizePanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-authorize-panel
 */
MODx.panel.BigBrotherAuthorizePanel = function(config) {
    config = config || {};    
    Ext.applyIf(config,{
        unstyled: true
        ,defaults: { collapsible: false, autoHeight: true }
        ,items: [{
            html: _('bigbrother.test')
            ,border: false
        }]
    });
    MODx.panel.BigBrotherAuthorizePanel.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherAuthorizePanel,Ext.Panel,{});
Ext.reg('bb-panel', MODx.panel.BigBrotherAuthorizePanel);
