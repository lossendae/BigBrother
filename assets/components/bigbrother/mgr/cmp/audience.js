/**
 * The panel containing the audience overview
 * 
 * @class MODx.panel.BigBrotherAudienceOverview
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.BigBrotherAudienceOverview = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		title: _('bigbrother.audience')	
		,defaults: { 
			border: false 
		}
		,items:[{
			xtype: 'modx-desc-panel'
			,lexicon: 'audience_overview'
			,id: 'bb-audience-desc'
		},{
			 layout: 'form'
			,cls: 'main-wrapper'
			,autoHeight: true
			,defaults: { 
				border: false 
				,autoHeight: true
			}
			,id: 'report-audience-panel'
			,items:[{
				xtype: 'bb-linechart-panel'
				,title: _('bigbrother.audience_visits')	
				,action: 'audience/visitsCharts'
			},{
				xtype:'bb-meta-panel'
				,id:'report-audience-metas-first'
				,action: 'audience/metasFirstRow'
			},{
				xtype:'bb-meta-panel'
				,id:'report-audience-metas-second'
				,action: 'audience/metasSecondRow'
			},{
				xtype: 'panel'
				,cls: 'report-panel'
				,title: _('bigbrother.demographics')
				,border: true 
				,items: [{
					xtype: 'bb-vtabs'
					,items:[{
						title: _('bigbrother.language')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'language'
							,fieldName: 'language'
						}]
					},{
						title: _('bigbrother.country')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'country'
							,fieldName: 'country'
						}]
					}]
				}]
			},{
				xtype: 'panel'
				,cls: 'report-panel'
				,title: _('bigbrother.system')
				,border: true 
				,items: [{
					xtype: 'bb-vtabs'
					,items:[{
						title: _('bigbrother.browser')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'browser'
							,fieldName: 'browser'
						}]
					},{
						title: _('bigbrother.operating_system')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'operatingSystem'
							,fieldName: 'operating_system'
						}]
					},{
						title: _('bigbrother.service_provider')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'networkLocation'
							,fieldName: 'service_provider'
						}]
					}]
				}]
			},{
				xtype: 'panel'
				,cls: 'report-panel'
				,title: _('bigbrother.mobile')
				,border: true 
				,items: [{
					xtype: 'bb-vtabs'
					,items:[{
						title: _('bigbrother.operating_system')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'operatingSystem'
							,fieldName: 'operating_system'
							,filters: 'ga:isMobile==Yes'
						}]
					},{
						title: _('bigbrother.service_provider')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'networkLocation'
							,fieldName: 'service_provider'
							,filters: 'ga:isMobile==Yes'
						}]
					},{
						title: _('bigbrother.screen_resolution')	
						,items:[{
							xtype: 'bb-report-grid'						
							,dimension: 'screenResolution'
							,fieldName: 'screen_resolution'
							,filters: 'ga:isMobile==Yes'
						}]						
					}]
				}]
			}]
		}]	
	});
	MODx.panel.BigBrotherAudienceOverview.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.BigBrotherAudienceOverview,MODx.Panel,{});
Ext.reg('bb-panel-audience-overview', MODx.panel.BigBrotherAudienceOverview);