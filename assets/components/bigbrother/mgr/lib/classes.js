/**
 * Preview grid base class.
 * 
 * @class MODx.grid.BigBrotherPreviewGrid
 * @extends MODx.grid.Grid
 * @param {Object} config An object of options.
 * @xtype modx-grid-package
 */
MODx.grid.BigBrotherPreviewGrid = function(config) {
    config = config || {};
	Ext.applyIf(config,{
		 url : MODx.BigBrotherConnectorUrl
		,enableHdMenu: false
		,remoteSort: false
		,paging: false
		,header: true
		,collapsible: false
		,cls: 'bb-preview-grid'
		,baseParams: {
			action: this.action
		}
	});
    MODx.grid.BigBrotherPreviewGrid.superclass.constructor.call(this,config);
};
Ext.extend(MODx.grid.BigBrotherPreviewGrid,MODx.grid.Grid,{});
Ext.reg('bb-preview-grid',MODx.grid.BigBrotherPreviewGrid);

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
		,startingText: 'Loading...'
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
Ext.reg('bb-meta-panel', MODx.panel.BigBrotherMetaPanel);