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
			xtype: 'modx-desc-panel'
			,lexicon: 'audience_overview'
			,id: 'bb-options-desc'
		},{
			 layout: 'form'
			,cls: 'main-wrapper'
			,autoHeight: true
			,defaults: { 
				border: false 
				,autoHeight: true
			}
			,items:[{
				html: "This should be the options panel"
			}]
		}]	
	});
	MODx.panel.BigBrotherOptions.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherOptions,MODx.Panel,{});
Ext.reg('bb-panel-options', MODx.panel.BigBrotherOptions);