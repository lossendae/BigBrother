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
		html: '<div id="charts-'+this.panelId+'" style="height: 195px; margin: 0 auto"></div>'
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
				action : this.action
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				this.loadChart(data.results);			
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert('Failed', result.responseText); 
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
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			colors: [ 						
				'#4F6C84', 
				'#AA4643', 
				'#8BAF4C', 
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
 * @class MODx.panel.BigBrotherLineChartPanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-linechart-panel
 */
MODx.panel.BigBrotherLineChartPanel = function(config) {
    config = config || {};	
	this.panelId = Ext.id();
	Ext.applyIf(config,{
		html: '<div id="charts-'+this.panelId+'" style="height: 310px; margin: 0 auto"></div>'
		,cls: 'bb-panel charts-wrapper charts-line'
		,listeners:{
			afterrender: this.getData
			,scope: this
		}
	});
	MODx.panel.BigBrotherLineChartPanel.superclass.constructor.call(this,config);	
};
Ext.extend(MODx.panel.BigBrotherLineChartPanel,MODx.Panel,{
	getData: function(){		
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : this.action
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				this.loadChart(data.series, data.pointStart);			
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
		var container = 'charts-'+this.panelId;

		// define the options
		this.chart = new Highcharts.Chart({
			chart: {
				renderTo: container,
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
Ext.reg('bb-linechart-panel', MODx.panel.BigBrotherLineChartPanel);
	