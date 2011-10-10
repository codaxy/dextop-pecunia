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
Ext.define('Pecunia.model.Stock',
{
	extend: 'Ext.data.Model',
	fields: [{
		name: 'Name',
		type: 'string',
		useNull: true
	}, {
		name: 'Code',
		type: 'string',
		useNull: true
	}, {
		name: 'Capital',
		type: 'float',
		useNull: true
	}, {
		name: 'Change',
		type: 'float',
		useNull: true
	}, {
		name: 'Price',
		type: 'float',
		useNull: true
	}],
	idProperty: 'Name'
});
Ext.define('Pecunia.model.CurrencyHistoryRate',
{
	extend: 'Ext.data.Model',
	fields: [{
		name: 'Date',
		type: 'date',
		useNull: true
	}, {
		name: 'Rate',
		type: 'float',
		useNull: true
	}],
	idProperty: 'Date'
});
Ext.define('Pecunia.GdpPanel.model.ReportType',
{
	extend: 'Ext.data.Model',
	fields: [{
		name: 'ReportId',
		type: 'string',
		useNull: true
	}, {
		name: 'Title',
		type: 'string',
		useNull: true
	}],
	idProperty: 'ReportId'
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
Ext.define('Pecunia.model.Contact',
{
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'int',
		useNull: true
	}, {
		name: 'Firstname',
		type: 'string',
		useNull: true
	}, {
		name: 'Lastname',
		type: 'string',
		useNull: true
	}, {
		name: 'From',
		type: 'date',
		useNull: true
	}, {
		name: 'To',
		type: 'date',
		useNull: true
	}, {
		name: 'Business',
		type: 'string',
		useNull: true
	}, {
		name: 'Capital',
		type: 'int',
		useNull: true
	}, {
		name: 'ImageUrl',
		type: 'string',
		useNull: true
	}, {
		name: 'InfoUrl',
		type: 'string',
		useNull: true
	}],
	idProperty: 'id'
});
