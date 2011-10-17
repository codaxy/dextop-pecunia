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
Ext.define('Pecunia.CurrenciesPanel.model.RateModel',
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
		name: 'Code',
		type: 'string',
		useNull: true
	}, {
		name: 'Name',
		type: 'string',
		useNull: true
	}, {
		name: 'Value',
		type: 'float',
		useNull: true
	}, {
		name: 'Price',
		type: 'float',
		useNull: true
	}, {
		name: 'Change',
		type: 'float',
		useNull: true
	}],
	idProperty: 'Name'
});
Ext.define('Pecunia.model.RichPerson',
{
	extend: 'Ext.data.Model',
	fields: [{
		name: 'Id',
		type: 'string',
		useNull: true
	}, {
		name: 'Name',
		type: 'string',
		useNull: true
	}, {
		name: 'DOB',
		type: 'string',
		useNull: true
	}, {
		name: 'PhotoUrl',
		type: 'string',
		useNull: true
	}, {
		name: 'WikipediaUrl',
		type: 'string',
		useNull: true
	}, {
		name: 'Nationality',
		type: 'string',
		useNull: true
	}, {
		name: 'Religion',
		type: 'string',
		useNull: true
	}, {
		name: 'Children',
		type: 'int',
		useNull: true
	}, {
		name: 'Business',
		type: 'string',
		useNull: true
	}, {
		name: 'Fortune',
		type: 'float',
		useNull: true
	}, {
		name: 'Occupation',
		type: 'string',
		useNull: true
	}, {
		name: 'Bio',
		type: 'string',
		useNull: true
	}, {
		name: 'ExtraTitle',
		type: 'string',
		useNull: true
	}, {
		name: 'Extra',
		type: 'string',
		useNull: true
	}],
	idProperty: 'Id'
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
