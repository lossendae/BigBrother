/**
 * A Description panel base class
 * 
 * @class MODx.DescPanel
 * @extends MODx.TemplatePanel
 * @param {Object} config An object of options.
 * @xtype modx-template-panel
 */
MODx.DescPanel = function(config) {
    config = config || {}; 
	Ext.applyIf(config,{
		bodyCssClass: 'panel-desc'
		,startingMarkup: '<tpl for=".">'+_('bigbrother.desc_markup')+'</tpl>'
	});
	MODx.DescPanel.superclass.constructor.call(this,config);
}
Ext.extend(MODx.DescPanel,MODx.TemplatePanel,{
	reset: function(){	
		this.body.hide();
		//Override default text
		this.defaultMarkup.overwrite(this.body, {
			id: MODx.config['bigbrother.account']
			,name: MODx.config['bigbrother.account_name']
			,title: _('bigbrother.' + this.lexicon)
		});
		this.body.slideIn('r', {stopFx:true, duration:.2});
		setTimeout(function(){
			Ext.getCmp('modx-content').doLayout();
		}, 500);
	}
});	
Ext.reg('modx-desc-panel',MODx.DescPanel);

/**
 * Report grid base class.
 * 
 * @class MODx.grid.BigBrotherReportGrid
 * @extends MODx.grid.Grid
 * @param {Object} config An object of options.
 * @xtype modx-grid-package
 */
MODx.grid.BigBrotherReportGrid = function(config) {
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
    MODx.grid.BigBrotherReportGrid.superclass.constructor.call(this,config);
	this.on('render', this.loadStore, this);
	this.getStore().on('exception',this.onStoreException,this);
};
Ext.extend(MODx.grid.BigBrotherReportGrid,Ext.grid.GridPanel,{
	_init: function(){
		var fields = [this.config.fieldName,'visits','percent']
		this.store = new Ext.data.JsonStore({
			url: MODx.BigBrotherConnectorUrl
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
Ext.reg('bb-report-grid',MODx.grid.BigBrotherReportGrid);

/**
 * The panel containing the report for single meta values
 * 
 * @class MODx.panel.BigBrotherMetaPanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-meta-panel
 */
MODx.panel.BigBrotherMetaPanel = function(config) {
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
		+'<div class="metas-wrapper"><table><tbody><tr><td class="{cls}">{start}</td></tr></tbody></table><br class="clear"/></div>'
	+'</tpl>', {
		compiled: true
	});
	
	Ext.applyIf(config,{
		 frame:false
		,startingText: _('bigbrother.metas.loading')
		,plain:true
		,border: false				
	});
	MODx.panel.BigBrotherMetaPanel.superclass.constructor.call(this,config);
	
	this.on('render', this.init, this);
};
Ext.extend(MODx.panel.BigBrotherMetaPanel,Ext.Panel,{
	init: function(){
		this.reset();		
		
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : this.action
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
Ext.reg('bb-meta-panel', MODx.panel.BigBrotherMetaPanel);

/**
 * A vertical tabpanel with custom settings
 * 
 * @class MODx.VerticalTabs.BigBrother
 * @extends MODx.VerticalTabs
 * @param {Object} config An object of options.
 * @xtype bb-meta-panel
 */
MODx.VerticalTabs.BigBrother = function(config) {
	config = config || {};		
	Ext.applyIf(config,{
		cls: 'vertical-tabs-panel'
		,monitorResize: true
		,border: false
		,defaults: {
			bodyCssClass: 'vertical-tabs-body'
            ,autoScroll: true
            ,autoHeight: true
            ,autoWidth: true
            ,border: false
			,layout: 'form'
		}
		,listeners:{	//Dirty fix
			tabchange: function(tb, pnl){ 				
				this.fixPanelWidth(pnl);				
			}
			,resize: function(){
				var pnl = this.getActiveTab();
				if(pnl != null){ this.fixPanelWidth(pnl); }				
			}
			,scope: this
		}		
	});
	MODx.VerticalTabs.BigBrother.superclass.constructor.call(this,config);
};
Ext.extend(MODx.VerticalTabs.BigBrother, MODx.VerticalTabs,{
	fixPanelWidth: function(pnl){			
		var w = this.bwrap.getWidth();
		pnl.body.setWidth(w);
		// console.log(w);
		setTimeout(function(){
			if(pnl.body.getWidth() != w){ 
				pnl.body.setWidth(w) ;
				pnl.doLayout();
			}							
		}, 500);
		pnl.doLayout();
	}
});
Ext.reg('bb-vtabs', MODx.VerticalTabs.BigBrother);