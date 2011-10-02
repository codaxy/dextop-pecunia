Ext.define('Pecunia.NavigationPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.navigationpanel',
	width: 150,
	initComponent: function () {

		var store = Ext.create('Ext.data.Store', {
			autoLoad: true,
			fields: ['title', 'type', 'iconCls'],
			reader: {
				type: 'json'
			},
			proxy: {
				type: 'memory',
				data: this.data
			}
		});

		Ext.apply(this, {
			layout: 'fit',
			items: {
				xtype: 'dataview',
				store: store,
				border: false,
				tpl: [
					'<tpl for=".">',
						'<div class="{iconCls} welcome-navigation-pane">',
						'{title}',
						'</div>',
					'</tpl>',
					'<div class="x-clear"></div>'
				],				
				trackOver: true,
				overItemCls: 'x-item-over',
				itemSelector: 'div.welcome-navigation-pane',
				listeners: {
					scope: this,
					'itemclick': function (view, record) {
						Dextop.getSession().addPanel(record.get('type'), { activate: true });
					}
				}
			}
		});

		this.callParent(arguments);
	}
});