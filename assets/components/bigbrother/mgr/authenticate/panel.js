/**
 * The panel for authenticating to google analytics
 * 
 * @class MODx.panel.BigBrotherAuthorizePanel
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype bb-authorize-panel
 */
MODx.panel.BigBrotherAuthorizePanel = function(config) {
    config = config || {};	
	Ext.applyIf(config,{
		id: 'modx-panel-bigbrother'
        ,cls: 'container'
        ,unstyled: true
        ,defaults: { collapsible: false ,autoHeight: true }
        ,items: [{
            html: '<h2>'+_('bigbrother.main_title')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
		},{
			layout: 'form'
			,autoHeight: true
			,defaults: { border: false }
			,id: 'main-panel'
			,items:[{
				xtype: 'modx-breadcrumbs-panel'
				,id: 'bb-breadcrumbs'				
				,desc: _('bigbrother.bd_root_desc')
				,root : { 
					text : _('bigbrother.bd_root_crumb_text')
					,className: 'first'
					,root: true
				}
			},{
				xtype:'panel'
				,cls: 'main-wrapper centered'
				,id: 'login-panel'
				,unstyled : true	
				,hidden: true
				,buttonAlign: 'center'			
				,buttons: [{
					 xtype: 'button'
					,id: 'action-btn'
					,text: ''		
					,handler: this.doAction
					,scope: this
				}]
			}]
		}]
	});
	MODx.panel.BigBrotherAuthorizePanel.superclass.constructor.call(this,config);
	
	this.init();
};
Ext.extend(MODx.panel.BigBrotherAuthorizePanel,MODx.Panel,{
	getToken: false
	,init: function(){	
		var btn = Ext.getCmp('action-btn');
		
		Ext.Ajax.request({
			url : MODx.BigBrotherConnectorUrl
			,params : { 
				action : 'authenticate/checkRequiredExtensions'
			}
			,method: 'GET'
			,scope: this
			,success: function ( result, request ) { 
				data = Ext.util.JSON.decode( result.responseText );
				if(!data.success){
					data.className = 'highlight desc-error';
					this.getToken = false;
					btn.setText(_('bigbrother.verify_prerequisite_settings'));					
				} else {					
					this.getToken = true;
					btn.setText(_('bigbrother.start_the_login_process'));
				}
				Ext.getCmp('login-panel').show();
				Ext.getCmp('bb-breadcrumbs').updateDetail(data);
			}
			,failure: function ( result, request) { 
				Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
			} 
		});
	}
	
	,doAction: function(){
		if( this.getToken ){
			Ext.Ajax.request({
				url : MODx.BigBrotherConnectorUrl
				,params : { 
					action : 'authenticate/getAnonymousToken'
				}
				,method: 'GET'
				,scope: this
				,success: function ( result, request ) { 
					data = Ext.util.JSON.decode( result.responseText );
					if(!data.success){
						data.className = 'highlight desc-error';
						Ext.getCmp('bb-breadcrumbs').updateDetail(data);
					} else {
						data.className = 'highlight loading';		
						Ext.getCmp('bb-breadcrumbs').updateDetail(data);
						setTimeout(function(){
							window.location = data.url;
						}, 800);							
					}					
				}
				,failure: function ( result, request) { 
					Ext.MessageBox.alert(_('bigbrother.alert_failed'), result.responseText); 
				} 
			});
		} else {
			this.init();
		}		
	}
});
Ext.reg('bb-authorize-panel', MODx.panel.BigBrotherAuthorizePanel);