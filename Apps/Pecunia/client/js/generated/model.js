Ext.define('Pecunia.UsersPanel.model.User',
{
	extend: 'Ext.data.Model',
	fields: [{
		name: 'Id',
		type: 'int',
		useNull: true
	}, {
		name: 'Active',
		type: 'boolean',
		useNull: true
	}, {
		name: 'Username',
		type: 'string',
		useNull: true
	}, {
		name: 'DisplayName',
		type: 'string',
		useNull: true
	}, {
		name: 'EMail',
		type: 'string',
		useNull: true
	}],
	idProperty: 'Id'
});
