/**
 * A template desc panel base class
 * 
 * @class MODx.DescPanel
 * @extends Ext.Panel
 * @param {Object} config An object of options.
 * @xtype modx-desc-panel
 */
MODx.DescPanel = function(config) {
    config = config || {}; 
	this.startingMarkup = new Ext.XTemplate('<tpl for=".">'
		+'<div class="panel-desc loading"><p>{message}</p></div>'
	+'</tpl>', {
		compiled: true
	});
	Ext.applyIf(config,{
		frame:false
		,startingText: 'Loading...'
		,markup: '<div class="panel-desc {cls}"><p>{message}</p></div>'
		,plain:true
		,border: false
	});
	MODx.DescPanel.superclass.constructor.call(this,config);
	this.on('render', this.init, this);
}
Ext.extend(MODx.DescPanel, Ext.Panel,{
	init: function(){
		this.reset();
		this.tpl = new Ext.XTemplate(this.markup, { compiled: true });
	}

	,reset: function(){	
		this.body.hide();
		this.startingMarkup.overwrite(this.body, {message: this.startingText});
		this.body.slideIn('r', {stopFx:true, duration:.2});
		Ext.getCmp('modx-content').doLayout();
	}
	
	,updateDetail: function(data) {		
		this.body.hide();
		this.tpl.overwrite(this.body, data);
		this.body.slideIn('r', {stopFx:true, duration:.2});
		Ext.getCmp('modx-content').doLayout();
	}
});	
Ext.reg('modx-template-desc-panel',MODx.DescPanel);

/**
 * Loads a grid of GAPreview.
 * 
 * @class MODx.grid.GAPreview
 * @extends MODx.grid.Grid
 * @param {Object} config An object of options.
 * @xtype modx-grid-package
 */
MODx.grid.GAPreview = function(config) {
    config = config || {};
	Ext.applyIf(config,{
		 url : MODx.bigbrotherConnectorUrl
		,enableHdMenu: false
		,remoteSort: false
		,paging: false
		,header: true
		,collapsible: false
		,cls: 'ga-grid-preview'
		,baseParams: {
			action: this.action
		}
	});
    MODx.grid.GAPreview.superclass.constructor.call(this,config);
};
Ext.extend(MODx.grid.GAPreview,MODx.grid.Grid,{});
Ext.reg('modx-grid-ga-preview',MODx.grid.GAPreview);

/**
 * A basic definition for pie panel
 * 
 * @class MODx.panel.GAPiePanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.GAPiePanel = function(config) {
    config = config || {};	
	this.panelId = Ext.id();
	Ext.applyIf(config,{
		html: '<div id="charts-'+this.panelId+'" style="height: 195px; margin: 0 auto"></div>'
		,cls: 'ga-panel charts-wrapper'
		,listeners:{
			afterrender: this.getData
			,scope: this
		}
	});
	MODx.panel.GAPiePanel.superclass.constructor.call(this,config);	
};
Ext.extend(MODx.panel.GAPiePanel,MODx.Panel,{
	getData: function(){
		Ext.Ajax.request({
			url : MODx.bigbrotherConnectorUrl
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
Ext.reg('modx-ga-pie-panel', MODx.panel.GAPiePanel);
	