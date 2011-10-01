Ext.define('Pecunia.CoursesPanel.model.RateModel',
{
	extend: 'Ext.data.Model',
	fields: [{
		name: 'Currency',
		type: 'string',
		useNull: true
	}, {
		name: 'Rate',
		type: 'float',
		useNull: true
	}, {
		name: 'Amount',
		type: 'float',
		useNull: true
	}, {
		name: 'ISOCode',
		type: 'string',
		useNull: true
	}],
	idProperty: 'ISOCode'
});
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
