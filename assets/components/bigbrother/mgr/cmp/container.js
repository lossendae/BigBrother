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
            html: '<h2>'+_('bigbrother_main_title')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
            ,id: 'modx-workspace-header'
        },MODx.getPageStructure([{
            title: 'Overview'	
			,defaults: { 
				border: false 
			}
			,items:[{
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
					,title: 'Visits and Uniques'	
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
						,title: 'Traffic Sources Overview'	
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
							,title: 'Top Content'	
							,baseParams: {
								action: 'overview/topcontent'
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
			}]
		}])]	
	});
	MODx.panel.BigBrotherPanel.superclass.constructor.call(this,config);
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