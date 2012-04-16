Ext.namespace('BigBrother','BigBrother.Panel','BigBrother.Grid','BigBrother.Tabs');

/**
 * A Description panel base class
 * 
 * @class BigBrother.Panel.Description
 * @extends MODx.TemplatePanel
 * @param {Object} config An object of options.
 * @xtype modx-desc-panel
 */
BigBrother.Panel.Description = function(config) {
    config = config || {}; 
    Ext.applyIf(config,{
        startingMarkup: '<tpl for=".">'+_('bigbrother.desc_markup')+'</tpl>'
        ,cls: 'styled-desc'
        ,unstyled: true
    });
    BigBrother.Panel.Description.superclass.constructor.call(this,config);
}
Ext.extend(BigBrother.Panel.Description,MODx.TemplatePanel,{
    reset: function(){    
        this.body.hide();
        //Override default text
        this.defaultMarkup.overwrite(this.body, {
            title: this.startingText
            ,date_begin: BigBrother.DateBegin
            ,date_end: BigBrother.DateEnd
            ,id: BigBrother.account
            ,name: BigBrother.accountName
        });
        this.body.slideIn('r', {stopFx:true, duration:.2});
        setTimeout(function(){
            Ext.getCmp('modx-content').doLayout();
        }, 500);
    }
});    
Ext.reg('modx-desc-panel',BigBrother.Panel.Description);

/**
 * Report grid base class.
 * 
 * @class BigBrother.Grid.Report
 * @extends MODx.grid.Grid
 * @param {Object} config An object of options.
 * @xtype bb-report-grid
 */
BigBrother.Grid.Report = function(config) {
    config = config || {};
    this.config = config;
    this._init();    
    
    Ext.applyIf(config,{
         store: this.store
        ,cm: this.cm
        ,sm: new Ext.grid.RowSelectionModel({singleSelect:true})
        ,autoHeight: true
        ,loadMask: true
        ,stripeRows: true
        ,enableHdMenu: false
        ,remoteSort: false
        ,paging: false
        ,header: false
        ,collapsible: false
        ,cls: 'bb-preview-grid'
        ,viewConfig: {
            forceFit: true
            ,enableRowBody: true
            ,autoFill: true
            ,showPreview: true
            ,scrollOffset: 0
            ,emptyText: _('ext_emptymsg')
        }
    });
    BigBrother.Grid.Report.superclass.constructor.call(this,config);
    this.on('render', this.loadStore, this);
    this.getStore().on('exception',this.onStoreException,this);
};
Ext.extend(BigBrother.Grid.Report,Ext.grid.GridPanel,{
    _init: function(){
        var fields = [this.config.fieldName,'visits','percent']
        this.store = new Ext.data.JsonStore({
            url: BigBrother.ConnectorUrl
            ,baseParams: { 
                action: 'report/getList'
                ,fieldName: this.config.fieldName
                ,dimension: this.config.dimension
            }
            ,fields: fields
            ,root: 'results'
            ,totalProperty: 'total'
            ,remoteSort: false
            ,storeId: Ext.id()
            ,autoDestroy: true
            ,listeners:{
                load: function(){ Ext.getCmp('modx-content').doLayout(); }
                ,scope: this
            }
        });    
        if(this.config.filters !== undefined){
            this.store.setBaseParam('filters', this.config.filters)
        }
        this.config.columns = [
             { header: _('bigbrother.' + this.config.fieldName) ,dataIndex: this.config.fieldName, id:'title', width: 150 }
            ,{ header: _('bigbrother.visits') ,dataIndex: 'visits', id:'aright' }
            ,{ header: _('bigbrother.percent_visits') ,dataIndex: 'percent', id:'aright' }
        ];
        this.cm = new Ext.grid.ColumnModel(this.config.columns);
    }
    ,onStoreException: function(dp,type,act,opt,resp){
        var r = Ext.decode(resp.responseText);
        if (r.message) {
            this.getView().emptyText = r.message;
            this.getView().refresh(false);
        }
    }
    ,loadStore: function(){
        this.getStore().load({ params:{ start:0, limit:20 }});
    }
});
Ext.reg('bb-report-grid',BigBrother.Grid.Report);

/**
 * The panel containing the report for report metas
 * 
 * @class BigBrother.Panel.Meta
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-meta-panel
 */
BigBrother.Panel.Meta = function(config) {
    config = config || {};    
    this.tpl = new Ext.XTemplate('<tpl if="typeof(metas) != &quot;undefined&quot;">'
        +'<div class="metas-wrapper"><table><tbody>'
            +'<tpl for="metas">'
                +'<tr>'
                    +'<tpl for=".">'
                        +'<td class="{cls}">'
                            +'<div class="highlight {key}">{value}<span class="compare {progressionCls}">{progression} %</span></div>'  
                            +'{name}'  
                        +'</td>'
                    +'</tpl>'
                +'</tr>'
            +'</tpl>'
        +'</tbody></table><br class="clear"/></div>'
    +'</tpl>'
    +'<tpl if="typeof(start) != &quot;undefined&quot;">'
        +'<div class="metas-wrapper"><table><tbody><tr><td class="{cls}">{start}</td></tr></tbody></table><br class="clear"/></div>'
    +'</tpl>', {
        compiled: true
    });
    
    Ext.applyIf(config,{
         frame:false
        ,startingText: _('bigbrother.loading')
        ,plain:true
        ,border: false                
    });
    BigBrother.Panel.Meta.superclass.constructor.call(this,config);
    
    this.on('render', this.init, this);
};
Ext.extend(BigBrother.Panel.Meta,Ext.Panel,{
    init: function(){
        this.reset();        
        
        Ext.Ajax.request({
            url : BigBrother.ConnectorUrl
            ,params : { 
                action : 'report/metas'
                ,metrics : this.metrics
                ,cols : this.cols || 4
            }
            ,method: 'GET'
            ,scope: this
            ,success: function ( result, request ) { 
                data = Ext.util.JSON.decode( result.responseText );
                this.updateDetail(data);
            }
            ,failure: function ( result, request) { 
                Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
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
Ext.reg('bb-meta-panel', BigBrother.Panel.Meta);

/**
 * A vertical tabpanel with custom settings
 * 
 * @class BigBrother.Tabs.Vertical
 * @extends MODx.VerticalTabs
 * @param {Object} config An object of options.
 * @xtype bb-vtabs
 */
BigBrother.Tabs.Vertical = function(config) {
    config = config || {};        
    Ext.applyIf(config,{
        cls: 'vertical-tabs-panel'
        ,monitorResize: true
        ,border: false
        ,defaults: {
            bodyCssClass: 'vertical-tabs-body'
            ,autoScroll: true
            ,autoHeight: true
            ,border: false
            ,layout: 'form'
        }
        ,listeners:{    //Dirty fix
            tabchange: function(tb, pnl){                 
                this.fixPanelWidth();    
            }
            ,resize: function(){
                var pnl = this.getActiveTab();
                if(pnl != null){ this.fixPanelWidth(); }    
            }
            ,scope: this
        }        
    });
    BigBrother.Tabs.Vertical.superclass.constructor.call(this,config);
};
Ext.extend(BigBrother.Tabs.Vertical, MODx.VerticalTabs,{
    fixPanelWidth: function(){    
        var pnl = this;
        var w = this.bwrap.getWidth();
        pnl.body.setWidth(w);
        pnl.doLayout();
    }
});
Ext.reg('bb-vtabs', BigBrother.Tabs.Vertical);