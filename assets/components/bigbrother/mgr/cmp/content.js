/**
 * The panel containing the content overview
 * 
 * @class MODx.panel.BigBrotherContentOverview
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.BigBrotherContentOverview = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		title: _('bigbrother.content')	
		,defaults: { 
			border: false 
		}
		,items:[{
			xtype: 'modx-desc-panel'
			,lexicon: 'content_overview'
			,id: 'bb-content-desc'
		},{
			 layout: 'form'
			,cls: 'main-wrapper'
			,autoHeight: true
			,defaults: { 
				border: false 
				,autoHeight: true
			}
			,id: 'report_content-panel'
			,items:[{
				xtype: 'bb-linechart-panel'
				,title: _('bigbrother.visits_and_uniques')	
				,action: 'content/pageviews'
			},{
				xtype:'bb-meta-panel'
				,id:'report_content-metas'
				,action: 'content/metas'
			},{	
				xtype: 'panel'
				,cls: 'report-panel'
				,title: _('bigbrother.site_content')
				,border: true 
				,items: [{
					xtype: 'bb-vtabs'
					,items:[{
						title: _('bigbrother.page')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'pagePath'
							,fieldName: 'page'
						}]
					},{
						title: _('bigbrother.pagetitle')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'pageTitle'
							,fieldName: 'pagetitle'
						}]
					}]
				}]
			}]
		}]	
	});
	MODx.panel.BigBrotherContentOverview.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherContentOverview,MODx.Panel,{});
Ext.reg('bb-panel-content-overview', MODx.panel.BigBrotherContentOverview);