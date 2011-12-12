/**
 * The panel containing the analytics
 * 
 * @class MODx.panel.BigBrotherPanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype modx-panel-ga-oauth-complete
 */
MODx.panel.BigBrotherPanel = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		id: 'bb-panel'
        ,cls: 'container'
        ,bodyStyle: ''
		,unstyled:true		
        ,items: [{
            html: '<h2>'+_('bigbrother.main_title')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },MODx.getPageStructure([{
            title: _('bigbrother.content')	
			,defaults: { 
				border: false 
			}
			,items:[{
				xtype: 'modx-template-panel'
				,id: 'bb-desc'
				,bodyCssClass: 'panel-desc'
				,startingMarkup: '<tpl for=".">'+_('bigbrother.overview.desc_markup')+'</tpl>'
				,reset: function(){	
					this.body.hide();
					//Override default text
					this.defaultMarkup.overwrite(this.body, {
						id: MODx.config['bigbrother.account']
						,name: MODx.config['bigbrother.account_name']
						,title: _('bigbrother.content_overview')
					});
					this.body.slideIn('r', {stopFx:true, duration:.2});
					setTimeout(function(){
						Ext.getCmp('modx-content').doLayout();
					}, 500);
				}
            },{
				 layout: 'form'
				,cls: 'main-wrapper'
				,autoHeight: true
				,defaults: { 
					border: false 
					,autoHeight: true
				}
				,id: 'report-panel'
				,items:[{
					xtype: 'bb-linechart-panel'
					,title: _('bigbrother.overview.visits_and_uniques')	
					,action: 'overview/pageviews'
				},{
					xtype:'bb-meta-panel'
					,id:'report-metas'
					,action: 'overview/metas'
				},{
					xtype: 'bb-vtabs'					
					// ,id:'test
					,items:[{
						title: _('bigbrother.page')	
						,items:[{
							xtype: 'bb-preview-grid'
							,header: false
							,baseParams: {
								action: 'content/page'
							}					
							,fields: ['pagepath','pageviews','uniquepageviews']
							,columns:[
								 { header: _('bigbrother.page') ,dataIndex: 'pagepath', id:'title', width: 150 }
								,{ header: _('bigbrother.pageviews') ,dataIndex: 'pageviews', id:'aright' }
								,{ header: _('bigbrother.unique_pageviews') ,dataIndex: 'uniquepageviews', id:'aright' }
							]
						}]
					},{
						title: _('bigbrother.pagetitle')	
						,items:[{
							xtype: 'bb-preview-grid'
							,header: false
							,baseParams: {
								action: 'content/pagetitle'
							}					
							,fields: ['pagepath','pageviews','uniquepageviews']
							,columns:[
								 { header: _('bigbrother.pagetitle') ,dataIndex: 'pagepath', id:'title', width: 150 }
								,{ header: _('bigbrother.pageviews') ,dataIndex: 'pageviews', id:'aright' }
								,{ header: _('bigbrother.unique_pageviews') ,dataIndex: 'uniquepageviews', id:'aright' }
							]
						}]
					}]
					
					
					// layout: 'column'
					// ,defaults: { 
						// border: false 
						// ,autoHeight: true
					// }
					// ,items:[{
						// xtype: 'bb-pie-panel'
						// ,title: _('bigbrother.overview.traffic_sources_overview')	
						// ,action: 'overview/trafficsource'
						// ,columnWidth: .5				
					// },{
						// xtype: 'panel'
						// ,layout: 'form'
						// ,columnWidth: .5
						// ,defaults: { 
							// border: false 
							// ,autoHeight: true
						// }
						// ,items:[{
							// xtype: 'bb-preview-grid'
							// ,title: _('bigbrother.overview.top_content')	
							// ,baseParams: {
								// action: 'overview/topcontent'
							// }					
							// ,fields: ['pagepath','pageviews','uniquepageviews']
							// ,columns:[
								 // { header: _('bigbrother.page') ,dataIndex: 'pagepath', id:'title', width: 150 }
								// ,{ header: _('bigbrother.pageviews') ,dataIndex: 'pageviews', id:'aright' }
								// ,{ header: _('bigbrother.unique_pageviews') ,dataIndex: 'uniquepageviews', id:'aright' }
							// ]
						// }]
					// }]
				}]
			}]
		},{
			title: _('bigbrother.audience')	
			,defaults: { 
				border: false 
			}
			,items: []
		},{
			title: _('bigbrother.traffic_sources')	
			,defaults: { 
				border: false 
			}
			,items: []
		}])]	
	});
	MODx.panel.BigBrotherPanel.superclass.constructor.call(this,config);
	
	this.init();
};
Ext.extend(MODx.panel.BigBrotherPanel,MODx.Panel, {
	init: function(){
		me = this;
		this.actionToolbar = new Ext.Toolbar({
			renderTo: "modAB"
			,id: 'modx-action-buttons'
			,defaults: { scope: me }
			,items: []
		});		
		if(MODx.config['bigbrother.total_account'] > 1){
			this.win = false;
			this.actionToolbar.add({
				text: _('bigbrother.change_account')
				,handler: this.loadAccountWindow
			});
		}		
		this.actionToolbar.add({
			text: _('bigbrother.revoke_authorization')
			,handler: this.revokeAuthorizationPromptWindow
		});		
		this.actionToolbar.doLayout();
	}
	
	,loadAccountWindow: function(btn){
		me = this;
		if(!this.win){
			this.win = new Ext.Window({
				cls: 'win'
				,title: _('bigbrother.select_another_account')
				,closeAction: 'hide'
				,border: false		
				,width: 400
				,items: [{
					xtype: 'modx-template-panel'
					,id: 'winca-desc'
					,bodyCssClass: 'win-desc panel-desc'
					,startingMarkup: '<tpl for="."><p>{text}</p></tpl>'
					,startingText: _('bigbrother.select_another_account_desc')
				},{
					layout: 'form'
					,border: false
					,bodyCssClass: 'main-wrapper'
					,items:[{
						xtype: 'combo'
						,displayField: 'name'
						,valueField: 'id'
						,triggerAction: 'all'
						,anchor: '100%'
						,editable: false
						,forceSelection: true
						,hideLabel: true
						,emptyText: _('bigbrother.oauth_select_account')	
						,id: 'account-list'
						,listClass: 'account-list'
						,ctCls: 'cb-account-list'
						,store: new Ext.data.JsonStore({
							url: MODx.BigBrotherConnectorUrl
							,root: 'results'
							,totalProperty: 'total'
							,fields: ['id', 'name']
							,errorReader: MODx.util.JSONReader
							,baseParams: {
								action : 'manage/accountlist'
							}
						})
						,listeners : {
							'select' : function(c){
								Ext.getCmp('select-account-btn').enable();
							}
						}
					}]		
				}]			
				,buttons: [{
					text: _('cancel')
					,scope: this
					,handler: function() { this.win.hide(); }
				},{
					 xtype: 'button'
					,id: 'select-account-btn'
					,text: _('bigbrother.change_account')
					,handler: this.selectAccount
					,disabled: true
					,scope: this
				}]
			});
		}
		this.win.show(btn.id);
	}
	
	,selectAccount: function(btn){
		this.disable();
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : 'manage/setAccount'
				,account : Ext.getCmp('account-list').getValue()
				,accountName : Ext.getCmp('account-list').getRawValue()
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				var data = Ext.util.JSON.decode( result.responseText );
				this.win.hide();				
				if(data.success){ this.redirect() }
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
				this.enable();
			} 
		});
	}
	
	,revokeAuthorizationPromptWindow: function(btn){
		Ext.Msg.show({
			title: _('bigbrother.revoke_permission'),
			msg: _('bigbrother.revoke_permission_msg'),
			buttons: Ext.Msg.OKCANCEL,
			fn: this.revokeAuthorization,
			animEl: btn.id,
			icon: Ext.MessageBox.WARNING  
		});
	}
	
	,revokeAuthorization: function(action){
		var pnl = Ext.getCmp('bb-panel');		
		if(action == 'ok'){
			pnl.disable();
			Ext.Ajax.request({
				url : MODx.BigBrotherConnectorUrl
				,params : { 
					action : 'manage/revoke'
				}
				,method: 'GET'
				,scope: pnl
				,success: function ( result, request ) { 
					var data = Ext.util.JSON.decode( result.responseText );						
					if(data.success){ this.redirect() }
				}
				,failure: function ( result, request) { 
					Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
					pnl.enable();
				} 
			});
		}
	}
	
	,redirect: function(){ location.href = MODx.BigBrotherRedirect; }
});
Ext.reg('bb-panel', MODx.panel.BigBrotherPanel);

/**
 * Loads a grid of TopContents.
 * 
 * @class MODx.grid.TopContent
 * @extends MODx.grid.Grid
 * @param {Object} config An object of options.
 * @xtype modx-grid-package
 */
// MODx.grid.TopContent = function(config) {
    // config = config || {};
	// Ext.applyIf(config,{
		// title: 'Content Performance'
		// ,url : MODx.BigBrotherConnectorUrl
		// ,baseParams: { 
			// action : 'request/topcontent'
		// }
		// ,fields: ['pagepath','pageviews','uniquepageviews','avgtimeonpage','exitpage','bouncerate']
		// ,columns:[
			 // { header: 'Page' ,dataIndex: 'pagepath', id:'title', width: 320 }
			// ,{ header: 'Pageviews' ,dataIndex: 'pageviews', id:'highlight' }
			// ,{ header: 'Unique Pageviews' ,dataIndex: 'uniquepageviews', id:'aright' }
			// ,{ header: 'Avg. Time on Page' ,dataIndex: 'avgtimeonpage', id:'aright' }			
			// ,{ header: 'Bounce Rate' ,dataIndex: 'bouncerate', id:'aright' }
			// ,{ header: '% Exit' ,dataIndex: 'exitpage', id:'aright' }
		// ]
		// ,pageSize: 10
		// ,primaryKey: 'signature'
		// ,autoExpandColumn: 'pagepath'
		// ,enableHdMenu: false
		// ,remoteSort: false
		// ,paging: true
	// });
    // MODx.grid.TopContent.superclass.constructor.call(this,config);
// };
// Ext.extend(MODx.grid.TopContent,MODx.grid.Grid,{});
// Ext.reg('modx-grid-topcontent',MODx.grid.TopContent);