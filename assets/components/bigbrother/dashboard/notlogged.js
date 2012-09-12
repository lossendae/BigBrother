/**
 * The panel widget if the user has not authorized Google API tobe used by MODx
 *
 * @class MODx.panel.BigBrotherNotLogged
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-panel
 */
MODx.panel.BigBrotherNotLogged = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'modx-panel-bigbrother'
        ,unstyled: true
        ,defaults: { collapsible: false ,autoHeight: true, unstyled: true }
        ,items: [{
            layout: 'form'
            ,cls: 'main-wrapper'
            ,defaults: { border: false }
            ,items:[{
                xtype: 'modx-template-panel'
                ,bodyCssClass: 'centered'
                ,startingMarkup: '<tpl for=".">'
                    +'<p>{text}</p>'
                    +'</tpl>'
                ,startingText: _('bigbrother.notlogged_desc')
                ,buttonAlign: 'center'
                ,buttons: [{
                    xtype: 'button'
                    ,id: 'action-btn'
                    ,text: _('bigbrother.notlogged_btn')
                    ,handler: function(){ location.href = BigBrother.RedirectUrl; }
                    ,scope: this
                }]
            }]
        }]
        ,renderTo: 'bb-panel'
    });
    MODx.panel.BigBrotherNotLogged.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherNotLogged,MODx.Panel);
Ext.reg('bb-panel', MODx.panel.BigBrotherNotLogged);