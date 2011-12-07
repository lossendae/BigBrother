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
		id: 'modx-panel-workspace'
        ,cls: 'container'
        ,bodyStyle: ''
		,unstyled:true		
        ,items: [{
            html: '<h2>'+_('bigbrother.main_title')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
            ,id: 'modx-workspace-header'
        },MODx.getPageStructure([{
            title: _('bigbrother.overview.title')	
			,defaults: { 
				border: false 
			}
			,items:[{
				html: '<p>'+_('bigbrother.overview.desc')+'</p>'
				,bodyCssClass: 'panel-desc'
                ,border: false
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
					layout: 'column'
					,defaults: { 
						border: false 
						,autoHeight: true
					}
					,items:[{
						xtype: 'bb-pie-panel'
						,title: _('bigbrother.overview.traffic_sources_overview')	
						,action: 'overview/trafficsource'
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
							xtype: 'bb-preview-grid'
							,title: _('bigbrother.overview.top_content')	
							,baseParams: {
								action: 'overview/topcontent'
							}					
							,fields: ['pagepath','pageviews','uniquepageviews']
							,columns:[
								 { header: _('bigbrother.page') ,dataIndex: 'pagepath', id:'title', width: 150 }
								,{ header: _('bigbrother.pageviews') ,dataIndex: 'pageviews', id:'aright' }
								,{ header: _('bigbrother.unique_pageviews') ,dataIndex: 'uniquepageviews', id:'aright' }
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
			}]
		}])]	
	});
	MODx.panel.BigBrotherPanel.superclass.constructor.call(this,config);
	
	this.admin();
};
Ext.extend(MODx.panel.BigBrotherPanel,MODx.Panel, {
	test: function(){
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
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
	,win: false
	,admin: function(){
		me = this;
		this.actionToolbar = new Ext.Toolbar({
			renderTo: "modAB"
			,id: 'modx-action-buttons'
			,defaults: { scope: me }
			,items: [{
				text: 'Change account'
				,handler: this.loadAccountWindow
			},{
				text: 'Revoke authorization'
				,handler: this.revokeAuthorizationWindow
			}]
		});
	}
	
	,loadAccountWindow: function(btn){
		me = this;
		if(!this.win){
			this.win = new Ext.Window({
				cls: 'win'
				,title: 'Select another account'
				,closeAction: 'hide'
				,border: false		
				,width: 400
				,items: [{
					xtype: 'modx-template-panel'
					,id: 'winca-desc'
					,bodyCssClass: 'win-desc panel-desc'
					,startingMarkup: '<tpl for="."><p>{text}</p></tpl>'
					,startingText: 'Select the account you want to set as default for your report.<br/> Once validated, the page will reload to show the report for the choosen account'
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
					,text: 'Change Account'	
					,handler: this.selectAccount
					,disabled: true
					,scope: this
				}]
			});
		}
		this.win.show(btn.id);
	}
	
	,selectAccount: function(btn){
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : 'manage/setAccount'
				,account : Ext.getCmp('account-list').getValue()
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				if(data.success){ window.location = MODx.BigBrotherRedirect; }
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
			} 
		});
	}
	
	,revokeAuthorizationWindow: function(btn){
		Ext.Msg.show({
			title:'Revoke permission?',
			msg: "By revoking permission, you'll have to go through the setup process again to authorize MODx to use Google Analytics's APIs. <br/> Are you sure you want to revoke permissions ?",
			buttons: Ext.Msg.OKCANCEL,
			fn: this.revoke,
			animEl: btn.id,
			icon: Ext.MessageBox.WARNING  
		});
	}
	
	,revoke: function(action){
		if(action == 'ok'){
			Ext.Ajax.request({
				url : MODx.BigBrotherConnectorUrl
				,params : { 
					action : 'manage/revoke'
				}
				,method: 'GET'
				,scope: this
				,success: function ( result, request ) { 
					data = Ext.util.JSON.decode( result.responseText );		
					if(data.success){ window.location = MODx.BigBrotherRedirect; }
				}
				,failure: function ( result, request) { 
					Ext.MessageBox.alert('Failed', result.responseText); 
				} 
			});
		}
	}
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
MODx.grid.TopContent = function(config) {
    config = config || {};
	Ext.applyIf(config,{
		title: 'Content Performance'
		,url : MODx.BigBrotherConnectorUrl
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