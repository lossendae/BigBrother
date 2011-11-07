/**
 * The panel containing the analytics
 * 
 * @class MODx.panel.GAPanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.GAPanel = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		 layout: 'form'
		,autoHeight: true
		,defaults: { border: false }
		,id: 'main-panel'
		,items:[{
		   // xtype: 'modx-template-desc-panel'
		   // ,id: 'desc'
		// },{
			id: 'main'
			,unstyled : true	
			,autoHeight : true	
			,layout: 'card'
			,activeItem: 0
			,defaults:{
				cls: 'main-wrapper'
				,preventRender: true
				,autoHeight: true
				,unstyled: true
			}
			,items: []		
		}]		
	});
	MODx.panel.GAPanel.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.GAPanel,MODx.Panel);
Ext.reg('modx-panel-ga-container', MODx.panel.GAPanel);

/**
 * The panel containing the analytics
 * 
 * @class MODx.panel.GAReport
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.GAReport = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		 layout: 'form'
		,autoHeight: true
		,defaults: { 
			border: false 
			,autoHeight: true
		}
		,id: 'report-panel'
		,items:[{
		    xtype: 'panel'	
			,border: true 
			,title: 'Visits and Uniques'
			,cls: 'ga-panel charts-wrapper charts-line'
			,html: '<div id="charts-line" style="height: 310px; margin: 0 auto"></div>'
			,listeners:{
				afterrender: this.getData
				,scope: this
			}
		},{
			xtype:'modx-panel-ga-report-metas'
			,id:'report-metas'
		},{
			layout: 'column'
			,defaults: { 
				border: false 
				,autoHeight: true
			}
			,items:[{
				xtype: 'modx-ga-pie-panel'
				,title: 'Traffic Sources Overview'	
				,action: 'request/referral'
				,columnWidth: .5				
			},{
				xtype: 'panel'
				,layout: 'form'
				,columnWidth: .5
				,defaults: { 
					border: false 
					,autoHeight: true
				}
				,items:[{
					xtype: 'modx-grid-ga-preview'
					,title: 'Top Content'	
					,baseParams: {
						action: 'request/topcontentpreview'
					}					
					,fields: ['pagepath','pageviews','uniquepageviews']
					,columns:[
						 { header: 'Page' ,dataIndex: 'pagepath', id:'title', width: 150 }
						,{ header: 'Pageviews' ,dataIndex: 'pageviews', id:'aright' }
						,{ header: 'Unique Pageviews' ,dataIndex: 'uniquepageviews', id:'aright' }
					]
				}]
			}]
		// },{
			// xtype: 'modx-grid-topcontent'		
		}]	
		// ,buttonAlign: 'center'			
		// ,tbar: [{
			 // xtype: 'button'
			// ,text: 'Select this account'		
			// ,handler: this.test
			// ,scope: this
		// }]			
	});
	MODx.panel.GAReport.superclass.constructor.call(this,config);	
};
Ext.extend(MODx.panel.GAReport,MODx.Panel,{
	updateDesc: function(daterange){
		data = {};
		data.message = 'Visits and Uniques<br/><span class="daterange">'+daterange+'</div>';
		data.cls = 'panel-title';
		setTimeout(function(){ 
			Ext.getCmp('desc').updateDetail(data); 
		}, 1000);			
	}
	
	,test: function(){
		Ext.Ajax.request({
			url : MODx.bigbrotherConnectorUrl
			,params : { 
				action : 'request/referral'
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				console.log(data)			
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
			} 
		});
	}
	
	,getData: function(){
		Ext.Ajax.request({
			url : MODx.bigbrotherConnectorUrl
			,params : { 
				action : 'request/pageviews'
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				// console.log(data)
				this.loadChart(data.series, data.pointStart);
				// this.updateDesc(data.daterange);				
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
			} 
		});
	}
	
	,loadChart: function(series, dateStart){
		var ds = new Date(dateStart);		
		Ext.each(series, function(data, i){
			data.pointStart = new Date(dateStart);
			data.pointInterval = 24 * 3600 * 1000;
			data.lineWidth = 4;
			data.marker = {
				radius: 6,
				symbol: 'circle',
				fillColor: '#FFFFFF',
				lineWidth: 2,
				lineColor: null
			}
		});
		
		var chart;
		// define the options
		this.chart = new Highcharts.Chart({
			chart: {
				renderTo: 'charts-line',
				marginBottom: 60
			},
			title: {
				text: null
			},
			credits: {
				enabled: false
			},
			colors: [
				'#4F6C84', 		
				'#8BAF4C', 						
				'#4572A7', 
				'#AA4643', 
				'#89A54E', 
				'#80699B', 
				'#3D96AE', 
				'#DB843D', 
				'#92A8CD', 
				'#A47D7C', 
				'#B5CA92'
			],
			xAxis: {
				type: 'datetime',
				gridLineColor: '#E5E5E5',
				lineColor: '#E5E5E5',
				tickInterval: 7 * 24 * 3600 * 1000, // one week
				tickWidth: 0,
				tickColor: '#c0c0c0',
				gridLineWidth: 1,
				labels: {
					align: 'center',
					x: 0,
					y: 18 
				}
			},
			yAxis: [{
				title: {
					text: null
				},
				tickWidth: 0,				
				tickColor: '#E5E5E5',
				gridLineColor: '#E5E5E5',
				labels: {
					align: 'right',
					x: -10,
					y: 3,
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					}
				},
				showFirstLabel: false
			}],
			tooltip: {
				shared: true,
				crosshairs: true,
				borderRadius: 2,
				borderWidth: 1,
				formatter: function() {
					var s = '<span style="color:#666;">'+  Highcharts.dateFormat('%A, %d %B, %Y', this.x) +'</span>';
					$.each(this.points, function(i, point) {						
						s += '<br><b>'+ point.y 
							+'</b><span style="font-weight:bold;color:'+ point.series.color +';">'+ point.series.name
							+'</span>';
					});									
					return s;
				},
				style: {
					fontFamily: 'Arial, Helvetica, sans-serif',
					fontSize: '10px',
					padding: 10
				}
			},
			legend: {
				align: 'left',
				verticalAlign: 'bottom',
				y: 0,
				floating: true,
				borderWidth: 0,
				itemStyle: {
					color: '#6A6969',				
					fontFamily: 'Arial, Helvetica, sans-serif',			
					fontSize: '9px'			
				}
			},
			plotOptions: {
				area: {
					fillOpacity: 0.1
				}
			},
			series: series
		});
	}
});
Ext.reg('modx-panel-ga-report', MODx.panel.GAReport);

/**
 * The panel containing the report single meta values
 * 
 * @class MODx.panel.GAReportMetas
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.GAReportMetas = function(config) {
	config = config || {};	
	this.tpl = new Ext.XTemplate('<tpl if="typeof(metas) != &quot;undefined&quot;">'
		+'<div class="metas-wrapper"><table><tbody><tr>'
			+'<tpl for="metas">'
				+'<td class="{cls}">'
					+'<span class="highlight {key}">{value}</span>'  
					+'{name}'  
				+'</td>'
			+'</tpl>'
		+'</tr></tbody></table><br class="clear"/></div>'
	+'</tpl>'
	+'<tpl if="typeof(start) != &quot;undefined&quot;">'
		+'<p>{start}</p>'
	+'</tpl>', {
		compiled: true
	});
	
	Ext.applyIf(config,{
		 frame:false
		,startingText: 'Loading...'
		,plain:true
		,border: false				
	});
	MODx.panel.GAReportMetas.superclass.constructor.call(this,config);
	
	this.on('render', this.init, this);
};
Ext.extend(MODx.panel.GAReportMetas,Ext.Panel,{
	init: function(){
		this.reset();		
		
		Ext.Ajax.request({
			url : MODx.bigbrotherConnectorUrl
			,params : { 
				action : 'request/generalmetas'
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				this.updateDetail(data)
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
			} 
		});
	}
	
	,reset: function(){	
		this.updateDetail({start:this.startingText});
	}
	
	,updateDetail: function(data) {		
		this.body.hide();
		this.tpl.overwrite(this.body, data);
		this.body.slideIn('r', {stopFx:true, duration:.2});
		setTimeout(function(){
			Ext.getCmp('modx-content').doLayout();
		}, 500);
	}
});
Ext.reg('modx-panel-ga-report-metas', MODx.panel.GAReportMetas);

/**
 * Loads a grid of TopContents.
 * 
 * @class MODx.grid.TopContent
 * @extends MODx.grid.Grid
 * @param {Object} config An object of options.
 * @xtype modx-grid-package
 */
MODx.grid.TopContent = function(config) {
    config = config || {};
	Ext.applyIf(config,{
		title: 'Content Performance'
		,url : MODx.bigbrotherConnectorUrl
		,baseParams: { 
			action : 'request/topcontent'
		}
		,fields: ['pagepath','pageviews','uniquepageviews','avgtimeonpage','exitpage','bouncerate']
		,columns:[
			 { header: 'Page' ,dataIndex: 'pagepath', id:'title', width: 320 }
			,{ header: 'Pageviews' ,dataIndex: 'pageviews', id:'highlight' }
			,{ header: 'Unique Pageviews' ,dataIndex: 'uniquepageviews', id:'aright' }
			,{ header: 'Avg. Time on Page' ,dataIndex: 'avgtimeonpage', id:'aright' }			
			,{ header: 'Bounce Rate' ,dataIndex: 'bouncerate', id:'aright' }
			,{ header: '% Exit' ,dataIndex: 'exitpage', id:'aright' }
		]
		,pageSize: 10
		,primaryKey: 'signature'
		,autoExpandColumn: 'pagepath'
		,enableHdMenu: false
		,remoteSort: false
		,paging: true
	});
    MODx.grid.TopContent.superclass.constructor.call(this,config);
};
Ext.extend(MODx.grid.TopContent,MODx.grid.Grid,{});
Ext.reg('modx-grid-topcontent',MODx.grid.TopContent);