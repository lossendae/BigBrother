/**
 * The panel containing the traffic sources overview
 * 
 * @class BigBrother.Panel.TrafficSourcesOverview
 * @extends Ext.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
BigBrother.Panel.TrafficSourcesOverview = function(config) {
    config = config || {};    
    Ext.applyIf(config,{
        title: _('bigbrother.traffic_sources')    
        ,defaults: { 
            border: false 
        }
        ,items:[{
            xtype: 'modx-desc-panel'                
            ,startingText: _('bigbrother.traffic_sources_overview')
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
                xtype: 'bb-areachart-panel'
                ,title: _('bigbrother.audience_visits')    
                ,metrics: 'ga:visits,ga:pageViews'
            },{
                layout: 'column'
                ,items:[{
                    xtype:'bb-meta-panel'
                    ,id:'report-tf-metas'
                    ,metrics: 'ga:visits,ga:visitors,ga:pageviews,ga:uniquePageviews,ga:percentNewVisits,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate'
                    ,cols: 2
                    ,columnWidth: 0.5
                },{
                    xtype: 'bb-pie-panel'
                    ,title: _('bigbrother.traffic_sources')
                    ,dimensions: 'ga:medium'
                    ,metrics: 'ga:visits'
                    ,sort: 'ga:visits'
                    ,chartHeight: 250
                    ,replace: 'direct_traffic'
                    ,columnWidth: 0.5
                }]        
            },{
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
                            ,dimension: 'ga:keyword'
                            ,fieldName: 'keyword'
                        }]
                    },{
                        title: _('bigbrother.organic_source')    
                        ,items:[{
                            xtype: 'bb-report-grid'                        
                            ,dimension: 'ga:source'
                            ,fieldName: 'source'
                            ,filters: 'ga:organicSearches>0'
                        }]
                    },{
                        title: _('bigbrother.referral_source')    
                        ,items:[{
                            xtype: 'bb-report-grid'                        
                            ,dimension: 'ga:source'
                            ,fieldName: 'source'
                            ,filters: 'ga:organicSearches==0'
                        }]
                    },{
                        title: _('bigbrother.landing_page')    
                        ,items:[{
                            xtype: 'bb-report-grid'                        
                            ,dimension: 'ga:landingPagePath'
                            ,fieldName: 'landing_page'
                            ,filters: 'ga:medium==(none)'
                        }]
                    }]                    
                }]
            }]
        }]    
    });
    BigBrother.Panel.TrafficSourcesOverview.superclass.constructor.call(this,config);
};
Ext.extend(BigBrother.Panel.TrafficSourcesOverview,Ext.Panel);
Ext.reg('bb-panel-traffic-sources-overview', BigBrother.Panel.TrafficSourcesOverview);