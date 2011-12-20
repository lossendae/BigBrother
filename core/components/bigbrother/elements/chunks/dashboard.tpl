/**
 * The widget container for Quick overview
 * 
 * @class MODx.panel.BigBrotherDashboard
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-panel
 */
MODx.panel.BigBrotherDashboard = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		id: 'modx-panel-bigbrother'
        ,unstyled: true
        ,defaults: { collapsible: false ,autoHeight: true, unstyled: true }
        ,items: [{
			layout: 'form'
			,cls: 'main-wrapper'
			,id: 'bb-container'
			,items:[]
		}]
		,renderTo: "bb-panel"
	});
	MODx.panel.BigBrotherDashboard.superclass.constructor.call(this,config);
	
	this.init();
};
Ext.extend(MODx.panel.BigBrotherDashboard,MODx.Panel,{
	init: function(){
		var container = Ext.getCmp('bb-container');
		var total = 0;
		if(MODx.config['bigbrother.show_visits_on_dashboard'] == 1){
			container.add(this.getPanels('visits')); total++;
		}
		if(MODx.config['bigbrother.show_metas_on_dashboard'] == 1){
			container.add(this.getPanels('metas')); total++;
		}
		if(MODx.config['bigbrother.show_pies_on_dashboard'] == 1){
			container.add(this.getPanels('pies')); total++;
		}
		container.doLayout();
	}
	
	,getPanels: function(panel){
		switch(panel){
			case 'visits':
				return { 
					 xtype: 'bb-areachart-panel'
					,title: '[[+bigbrother.visits]]'
					,metrics: 'ga:visits'
					,id: 'visits-panel'
					,cls: 'bb-panel charts-wrapper charts-line visits'
					,height: 225
					,listeners:{
						chartsloaded:function(){
							this.fixWidth();
							Ext.getCmp('visits-panel').setHeight(290);
						}
						,scope: this
					}
				};
				break;
			case 'metas':
				return { 
					xtype:'bb-meta-panel'
					,id:'report_content-metas'
					,metrics: 'ga:visits,ga:visitors,ga:pageviews,ga:uniquePageviews,ga:percentNewVisits,ga:exitRate,ga:avgTimeOnSite,ga:visitBounceRate'
					,cols: 4
				};
				break;
			case 'pies':
				return { 
					layout: 'column'
					,border: false
					,items:[{
						xtype: 'bb-pie-panel'
						,title: '[[+bigbrother.traffic_sources]]'
						,dimensions: 'ga:medium'
						,metrics: 'ga:visits'
						,sort: 'ga:visits'
						,chartHeight: 250
						,replace: 'direct_traffic'
						,columnWidth: 0.5
					},{
						xtype: 'bb-pie-panel'
						,title: '[[+bigbrother.visitors]]'
						,dimensions: 'ga:visitorType'
						,metrics: 'ga:visits'
						,sort: 'ga:visits'
						,chartHeight: 250
						,columnWidth: 0.5
					}]
				}
				break;
			default:
				break;
		}
	}
	
	,fixWidth: function(){
		Ext.getCmp('bb-container').doLayout();
	}
});
Ext.reg('bb-panel', MODx.panel.BigBrotherDashboard);