/**
 * Pie Panel base class
 * 
 * @class MODx.panel.BigBrotherPiePanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-pie-panel
 */
MODx.panel.BigBrotherPiePanel = function(config) {
    config = config || {};	
	this.panelId = Ext.id();
	Ext.applyIf(config,{
		html: '<div id="charts-'+this.panelId+'" style="height: 260px; margin: 0 auto"></div>'
		,cls: 'bb-panel charts-wrapper'
		,listeners:{
			afterrender: this.getData
			,scope: this
		}
	});
	MODx.panel.BigBrotherPiePanel.superclass.constructor.call(this,config);	
};
Ext.extend(MODx.panel.BigBrotherPiePanel,MODx.Panel,{
	getData: function(){
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : 'report/pie'
				,dimensions: this.dimensions || null
				,metrics: this.metrics || null
				,sort: this.sort || null
				,replace: this.replace || null
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				this.loadChart(data.series);			
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
			} 
		});
	}
	
	,loadChart: function(series){		
		var chart;
		var container = 'charts-'+this.panelId;
		// define the options		
		this.chart = new Highcharts.Chart({
			chart: {
				renderTo: container,
				defaultSeriesType: 'pie',
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			colors: [ 						
				'#8BAF4C',
				'#4F6C84', 
				'#c33232',				
				'#80699B', 
				'#3D96AE', 
				'#DB843D', 
				'#92A8CD', 
				'#A47D7C', 
				'#B5CA92'
			],
			title: {
				text: null
			},
			credits: {
				enabled: false
			},
			tooltip: {
				formatter: function(){
					return '<b>'+ this.point.name +'</b>: '+ Math.round(this.percentage) +'%';
				}
				,style: {
					fontFamily: 'Arial, Helvetica, sans-serif',
					fontSize: '10px'
				}
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [series],
			legend: {
				verticalAlign: 'middle',
				align: 'right',
				layout: 'vertical',
				borderWidth: 0,
				y: -10,
				x: -50,
				itemStyle: {
					color: '#6A6969',				
					fontFamily: 'Arial, Helvetica, sans-serif',			
					fontSize: '10px'		
				},
				labelFormatter: function() {
					return '<b>'+this.name +'</b> ('+this.y+')<br/>';
				}
			}
		});
	}
});	
Ext.reg('bb-pie-panel', MODx.panel.BigBrotherPiePanel);

/**
 * Line Charts Panel base class
 * 
 * @class MODx.panel.BigBrotherAreaChartPanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-linechart-panel
 */
MODx.panel.BigBrotherAreaChartPanel = function(config) {
    config = config || {};	
	this.panelId = Ext.id();
	Ext.applyIf(config,{
		// html: '<div id="charts-'+this.panelId+'" style="height: 310px; margin: 0 auto"></div>'
		startingMarkup: '<tpl for="."><div id="charts-{id}"style="height: {height}px; margin: 0 auto"></div></tpl>'
		,height: 310
		,cls: 'bb-panel charts-wrapper charts-line'
	});
	MODx.panel.BigBrotherAreaChartPanel.superclass.constructor.call(this,config);	
	this.addEvents('chartsloaded');
	this.on('afterrender',this.getData, this);
};
Ext.extend(MODx.panel.BigBrotherAreaChartPanel,MODx.TemplatePanel,{
	getData: function(){		
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : 'report/area'
				,metrics : this.metrics
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				this.loadChart(data.series, data.pointStart);			
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
			} 
		});
	}
	
	,reset: function(){	
		this.body.hide();
		this.defaultMarkup.overwrite(this.body, {
			id: this.panelId
			,height: this.height	
		});
		this.body.slideIn('r', {stopFx:true, duration:.2});
		setTimeout(function(){
			Ext.getCmp('modx-content').doLayout();
		}, 500);
	}
	
	,loadChart: function(series, dateStart){				
		var chart;
		var container = 'charts-'+this.panelId;

		this.chart = new Highcharts.Chart({
			chart: {
				renderTo: container,
				defaultSeriesType: 'area',
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
			series: []
		});
		var c = this.chart;
		Ext.each(series, function(serie, i){
			c.addSeries({
				data: serie.data,                                     
				name: serie.name,
				pointStart: new Date(serie.begin),
				lineWidth: 4,
				pointInterval: 24 * 3600 * 1000,
				marker: {
					radius: 6,
					symbol: 'circle',
					fillColor: '#FFFFFF',
					lineWidth: 2,
					lineColor: null
				} 
			});    			
		});
		this.fireEvent('chartsloaded');
		// console.log(container)
		// console.log(this.id)
		// Ext.select('#'+container).resizable({
			// On resize, set the chart size to that of the
			// resizer minus padding. If your chart has a lot of data or other
			// content, the redrawing might be slow. In that case, we recommend
			// that you use the 'stop' event instead of 'resize'.
			// resize: function() {
				// chart.setSize(
					// this.offsetWidth - 20,
					// this.offsetHeight - 20,
					// false
				// );
			// }
		// });
	}
});	
Ext.reg('bb-areachart-panel', MODx.panel.BigBrotherAreaChartPanel);
	
/**
 * Line Charts Panel base class
 * 
 * @class MODx.panel.BigBrotherAreaChartComparePanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-linechart-panel
 */
MODx.panel.BigBrotherAreaChartComparePanel = function(config) {
    config = config || {};	
	this.panelId = Ext.id();
	Ext.applyIf(config,{
		html: '<div id="charts-'+this.panelId+'" style="height: 360px; margin: 0 auto"></div>'
		,cls: 'bb-panel charts-wrapper charts-line'
		,listeners:{
			afterrender: this.getData
			,scope: this
		}
	});
	MODx.panel.BigBrotherAreaChartComparePanel.superclass.constructor.call(this,config);	
};
Ext.extend(MODx.panel.BigBrotherAreaChartComparePanel,MODx.Panel,{
	getData: function(){		
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : 'report/areaCompare'
				,metrics : this.metrics
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );			
				this.loadChart(data.series);			
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
			} 
		});	
	}
	
	,loadChart: function(series){		
		var chart;
		var container = 'charts-'+this.panelId;
		// define chart the options
		this.chart = new Highcharts.Chart({
			chart: {
				renderTo: container,
				defaultSeriesType: 'area',
				marginBottom: 100
			},
			title: {
				text: null
			},
			credits: {
				enabled: false
			},
			colors: ['#4F6C84','#8BAF4C','#4572A7','#AA4643','#89A54E','#80699B','#3D96AE','#DB843D','#92A8CD','#A47D7C','#B5CA92'],
			xAxis: [{   
				offset: 0,            
				type: 'datetime',
				gridLineColor: '#E5E5E5',
				lineColor: '#E5E5E5',
				tickInterval: 7 * 24 * 3600 * 1000, // one week
				tickWidth: 0,
				tickColor: '#c0c0c0',
				gridLineWidth: 1,
				showLastLabel: false,
				labels: {
					align: 'center',
					x: 0,
					y: 18
				}
			},{
				offset: 40,
				type: 'datetime',
				gridLineColor: '#E5E5E5',
				lineColor: '#E5E5E5',
				tickInterval: 7 * 24 * 3600 * 1000, // one week
				tickWidth: 0,
				tickColor: '#c0c0c0',
				gridLineWidth: 1,
				showLastLabel: false,				
				labels: {
					align: 'center',
					x: 0,
					y: 18
				}
			}],  
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
					var s = ''; // Will cause undefined message if left empty
					$.each(this.points, function(i, point) {
						s += '<span style="color:'+ point.series.color +';">'+  Highcharts.dateFormat('%d %b %Y', point.x) 
							+'</span><br/><b>'+ point.y 
							+'</b><span style="font-weight:bold;color:'+ point.series.color +';">'+ point.series.name
							+'</span>';
						if(i == 0){ s += '<br/>' }
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
					fontSize: '10px'			
				}
			},
			plotOptions: {
				area: {
					fillOpacity: 0.1
				}
			},
			series: []
		});
		var c = this.chart;
		Ext.each(series, function(serie, i){
			c.addSeries({
				data: serie.data,                                    
				xAxis: i,  
				name: serie.name,
				lineWidth: 4,
				pointInterval: 24 * 3600 * 1000,
				marker: {
					radius: 6,
					symbol: 'circle',
					fillColor: '#FFFFFF',
					lineWidth: 2,
					lineColor: null
				} 
			});   			
		});
	}
});	
Ext.reg('bb-chart-area-compare', MODx.panel.BigBrotherAreaChartComparePanel);
	