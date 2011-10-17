Ext.define('Pecunia.NavigationBar', {
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
					type: 'currencies',
					iconCls: 'accounting'
				}, {
					title: 'Stocks',
					type: 'stocks',
					iconCls: 'shares'
				}, {
					title: 'Rich People',
					type: 'rich-people',
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