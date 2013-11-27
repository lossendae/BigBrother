/**
 * Pie Panel base class
 *
 * @class BigBrother.Panel.PieChart
 * @extends MODx.TemplatePanel
 * @param {Object} config An object of options.
 * @xtype bb-pie-panel
 */
BigBrother.Panel.PieChart = function(config) {
    config = config || {};
    this.panelId = Ext.id();
    Ext.applyIf(config,{
        startingMarkup: '<tpl for="."><div id="charts-{id}"style="height: {height}px; margin: 0 auto"></div></tpl>'
        ,height: 260
        ,cls: 'bb-panel charts-wrapper'
        ,listeners:{
            resize: function(p){
                if(p.chart !== undefined){
                    this.adjustWidth(p);
                }
            }
            ,chartsloaded:function(p){
                this.adjustWidth(p);
            }
            ,scope: this
        }
    });
    BigBrother.Panel.PieChart.superclass.constructor.call(this,config);
    this.addEvents('chartsloaded');
    this.on('afterrender',this.getData, this);
};
Ext.extend(BigBrother.Panel.PieChart,MODx.TemplatePanel,{
    getData: function(){
        Ext.Ajax.request({
            url : BigBrother.ConnectorUrl
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

    ,adjustWidth: function(p){
        var w = p.body.getWidth() - 15;
        var h = p.body.getHeight() - 30;
        p.chart.setSize(w,h);
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
        this.fireEvent('chartsloaded', this);
    }
});
Ext.reg('bb-pie-panel', BigBrother.Panel.PieChart);

/**
 * Line Charts Panel base class
 *
 * @class BigBrother.Panel.AreaChart
 * @extends BigBrother.Panel.PieChart
 * @param {Object} config An object of options.
 * @xtype bb-linechart-panel
 */
BigBrother.Panel.AreaChart = function(config) {
    config = config || {};
    this.panelId = Ext.id();
    Ext.applyIf(config,{
        height: 310
        ,cls: 'bb-panel charts-wrapper charts-line'
    });
    BigBrother.Panel.AreaChart.superclass.constructor.call(this,config);
};
Ext.extend(BigBrother.Panel.AreaChart,BigBrother.Panel.PieChart,{
    getData: function(){
        Ext.Ajax.request({
            url : BigBrother.ConnectorUrl
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
        this.fireEvent('chartsloaded', this);
    }
});
Ext.reg('bb-areachart-panel', BigBrother.Panel.AreaChart);

/**
 * Line Charts Panel base class
 *
 * @class BigBrother.Panel.AreaChartCompare
 * @extends BigBrother.Panel.AreaChart
 * @param {Object} config An object of options.
 * @xtype bb-linechart-panel
 */
BigBrother.Panel.AreaChartCompare = function(config) {
    config = config || {};
    this.panelId = Ext.id();
    Ext.applyIf(config,{
        height: 360
    });
    BigBrother.Panel.AreaChartCompare.superclass.constructor.call(this,config);
};
Ext.extend(BigBrother.Panel.AreaChartCompare,BigBrother.Panel.AreaChart,{
    getData: function(){
        Ext.Ajax.request({
            url : BigBrother.ConnectorUrl
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
                        s += '<span style="color:'+ point.series.color +';">'+  Highcharts.dateFormat('%A, %d %b %Y', point.x)
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
        this.fireEvent('chartsloaded', this);
    }
});
Ext.reg('bb-chart-area-compare', BigBrother.Panel.AreaChartCompare);
