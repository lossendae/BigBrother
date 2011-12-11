/**
 * The panel containing the audience overview
 * 
 * @class MODx.panel.BigBrotherTrafficSourcesOverview
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.BigBrotherTrafficSourcesOverview = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		title: _('bigbrother.traffic_sources')	
		,defaults: { 
			border: false 
		}
		,items:[{
			xtype: 'modx-desc-panel'
			,lexicon: 'traffic_sources_overview'
			,id: 'bb-traffic-sources-desc'
		},{
			 layout: 'form'
			,cls: 'main-wrapper'
			,autoHeight: true
			,defaults: { 
				border: false 
				,autoHeight: true
			}
			,id: 'report-traffic-sources-panel'
			,items:[{
				xtype: 'bb-linechart-panel'
				,title: _('bigbrother.traffic_sources_visits')	
				,action: 'audience/visitsCharts'
			},{
				// xtype:'bb-meta-panel'
				// ,id:'report-audience-metas-first'
				// ,action: 'audience/metasFirstRow'
			// },{
				// xtype:'bb-meta-panel'
				// ,id:'report-audience-metas-second'
				// ,action: 'audience/metasSecondRow'
			// },{
				xtype: 'panel'
				,cls: 'report-panel'
				,title: _('bigbrother.search_traffic')
				,border: true 
				,items: [{
					xtype: 'bb-vtabs'
					,items:[{
						title: _('bigbrother.keyword')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'keyword'
							,fieldName: 'keyword'
						}]
					},{
						title: _('bigbrother.source')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'source'
							,fieldName: 'source'
							,filters: 'ga:organicSearches>0'
						}]
					}]					
				}]
			},{
				xtype: 'panel'
				,cls: 'report-panel'
				,title: _('bigbrother.referral_traffic')
				,border: true 
				,items: [{
					xtype: 'bb-vtabs'
					,items:[{
						title: _('bigbrother.source')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'source'
							,fieldName: 'source'
							,filters: 'ga:organicSearches==0'
						}]
					}]
				}]
			},{
				xtype: 'panel'
				,cls: 'report-panel'
				,title: _('bigbrother.direct_traffic')
				,border: true 
				,items: [{
					xtype: 'bb-vtabs'
					,items:[{
						title: _('bigbrother.landing_page')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'landingPagePath'
							,fieldName: 'landing_page'
							,filters: 'ga:medium==(none)'
						}]
					}]
				}]
			}]
		}]	
	});
	MODx.panel.BigBrotherTrafficSourcesOverview.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherTrafficSourcesOverview,MODx.Panel,{});
Ext.reg('bb-panel-traffic-sources-overview', MODx.panel.BigBrotherTrafficSourcesOverview);