/**
 * Loads the panel for Google Analytics for MODx Revolution.
 * 
 * @class MODx.panel.bigbrother
 * @extends MODx.FormPanel
 * @param {Object} config An object of configuration properties
 * @xtype modx-panel-bigbrother
 */
MODx.panel.bigbrother = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'modx-panel-bigbrother'
        ,cls: 'container'
        ,bodyStyle: ''
        ,defaults: { collapsible: false ,autoHeight: true }
        ,items: [{
            html: '<h2>'+_('bigbrother_main_title')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        }]
    });
    MODx.panel.bigbrother.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.bigbrother,MODx.FormPanel,{});
Ext.reg('modx-panel-bigbrother',MODx.panel.bigbrother);