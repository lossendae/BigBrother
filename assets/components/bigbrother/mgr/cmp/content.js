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
			,startingText: _('bigbrother.content_overview')
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
				xtype: 'bb-chart-area-compare'
				,title: _('bigbrother.visits_comparisons')	
				,metrics: 'ga:visits'
			},{
				xtype:'bb-meta-panel'
				,id:'report_content-metas'
				,metrics: 'ga:visits,ga:visitors,ga:pageviews,ga:uniquePageviews,ga:percentNewVisits,ga:exitRate,ga:avgTimeOnSite,ga:visitBounceRate'
				,cols: 4
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
							,dimension: 'ga:pagePath'
							,fieldName: 'page'
						}]
					},{
						title: _('bigbrother.pagetitle')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'ga:pageTitle'
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