Ext.define('Pecunia.UsersPanel', {
	extend: 'Dextop.Panel',

	title: 'Users',
	border: false,
	closable: true,

	initComponent: function () {
		var grid = Ext.create('Dextop.ux.SwissArmyGrid', {
			remote: this.remote,
			paging: true,
			border: false,
			editing: 'row',
			tbar: ['add', 'edit', 'remove'],
			storeOptions: {
				pageSize: 10,
				autoLoad: true,
				autoSync: true
			},
			editingOptions: {
				clicksToEdit: 1
			}
});




		Ext.apply(this, {
			layout: 'fit',
			items: grid
		});

		this.callParent(arguments);
	}
});