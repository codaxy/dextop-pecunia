Ext.define('Pecunia.navigation.NavigationBar', {
	extend: 'Ext.panel.Panel',
	width: 150,
	initComponent: function () {

		Ext.apply(this, {
			layout: { 
				type: 'accordion'
			},
			items: [{
				title: 'Finance',
				xtype: 'navigationpanel',
				data: [{
					title: 'Currencies',
					type: 'courses',
					iconCls: 'accounting'
	            }, {
                    title: 'Stocks',
                    type: 'stocks',
                    iconCls: 'shares'
                }]
			}, {
				title: 'Cool Topic 1',
				xtype: 'navigationpanel',
				expanded: true,
				data: [{
					title: 'Manage Users',
					type: 'users',
					iconCls: 'account'
				}]
			}, {
				title: 'Cool Topic 2',
				xtype: 'navigationpanel',
				data: [{
					title: 'Manage Users',
					type: 'users',
					iconCls: 'account'
				}]
			}, {
				title: 'Administration',
				xtype: 'navigationpanel',
				data: [{
					title: 'Manage Users',
					type: 'users',
					iconCls: 'account'
				}]
			}]
		});

		this.callParent(arguments);
	}
});