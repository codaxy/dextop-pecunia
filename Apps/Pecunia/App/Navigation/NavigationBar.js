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
				}, {
					title: 'Wealthy People',
					type: 'contacts',
					iconCls: 'wallet'
				}, {
					title: 'GDP',
					type: 'gdp',
					iconCls: 'worldbank'
				}]
			}]
		});

		this.callParent(arguments);
	}
});