/**
 * The panel containing the audience overview
 * 
 * @class BigBrother.Panel.AudienceOverview
 * @extends Ext.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
BigBrother.Panel.AudienceOverview = function(config) {
    config = config || {};    
    Ext.applyIf(config,{
        title: _('bigbrother.audience')    
        ,defaults: { 
            border: false 
        }
        ,items:[{
            xtype: 'modx-desc-panel'                
            ,startingText: _('bigbrother.audience_overview')
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
                xtype: 'bb-areachart-panel'
                ,title: _('bigbrother.audience_visits')    
                ,metrics: 'ga:visits,ga:pageViews'
            },{    
                layout: 'column'
                ,items:[{
                    xtype:'bb-meta-panel'
                    ,id:'report-audience-metas'
                    ,metrics: 'ga:visits,ga:visitors,ga:pageviews,ga:uniquePageviews,ga:percentNewVisits,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate'
                    ,cols: 2
                    ,columnWidth: 0.5
                },{
                    xtype: 'bb-pie-panel'
                    ,title: _('bigbrother.visitors')
                    ,dimensions: 'ga:visitorType'
                    ,metrics: 'ga:visits'
                    ,sort: 'ga:visits'
                    ,chartHeight: 250
                    ,columnWidth: 0.5
                }]                
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
                            ,dimension: 'ga:language'
                            ,fieldName: 'language'
                        }]
                    },{
                        title: _('bigbrother.country')    
                        ,items:[{
                            xtype: 'bb-report-grid'                        
                            ,dimension: 'ga:country'
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
                            ,dimension: 'ga:browser'
                            ,fieldName: 'browser'
                        }]
                    },{
                        title: _('bigbrother.operating_system')    
                        ,items:[{
                            xtype: 'bb-report-grid'                        
                            ,dimension: 'ga:operatingSystem'
                            ,fieldName: 'operating_system'
                        }]
                    },{
                        title: _('bigbrother.service_provider')    
                        ,items:[{
                            xtype: 'bb-report-grid'                        
                            ,dimension: 'ga:networkLocation'
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
                            ,dimension: 'ga:operatingSystem'
                            ,fieldName: 'operating_system'
                            ,filters: 'ga:isMobile==Yes'
                        }]
                    },{
                        title: _('bigbrother.service_provider')    
                        ,items:[{
                            xtype: 'bb-report-grid'                        
                            ,dimension: 'ga:networkLocation'
                            ,fieldName: 'service_provider'
                            ,filters: 'ga:isMobile==Yes'
                        }]
                    },{
                        title: _('bigbrother.screen_resolution')    
                        ,items:[{
                            xtype: 'bb-report-grid'                        
                            ,dimension: 'ga:screenResolution'
                            ,fieldName: 'screen_resolution'
                            ,filters: 'ga:isMobile==Yes'
                        }]                        
                    }]
                }]
            }]
        }]    
    });
    BigBrother.Panel.AudienceOverview.superclass.constructor.call(this,config);
};
Ext.extend(BigBrother.Panel.AudienceOverview,Ext.Panel);
Ext.reg('bb-panel-audience-overview', BigBrother.Panel.AudienceOverview);