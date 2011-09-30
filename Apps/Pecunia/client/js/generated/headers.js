Ext.define('Pecunia.columns.Rate', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(){
		var dict = {};
		dict["Currency"] = {
			text: this.CurrencyText,
			width: 200,
			dataIndex: 'Currency',
			type: 'string'
		};
		dict["ISOCode"] = {
			text: this.ISOCodeText,
			width: 100,
			dataIndex: 'ISOCode',
			type: 'string'
		};
		dict["Value"] = {
			text: this.ValueText,
			width: 100,
			dataIndex: 'Value',
			type: 'float'
		};
		return dict;

	},
	buildItems: function(dict){
		return [dict['Currency'], dict['ISOCode'], dict['Value']];
	},
	CurrencyText: 'Currency',
	ISOCodeText: 'ISO Code',
	ValueText: 'Rate'
});
Ext.define('Pecunia.columns.SampleConvertion', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(){
		var dict = {};
		return dict;

	},
	buildItems: function(dict){
		return [];
	}
});
Ext.define('Pecunia.UsersPanel.columns.User', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(){
		var dict = {};
		dict["Active"] = {
			text: this.ActiveText,
			width: 50,
			dataIndex: 'Active',
			type: 'boolean'
		};
		dict["Username"] = {
			text: this.UsernameText,
			width: 100,
			dataIndex: 'Username',
			type: 'string'
		};
		dict["DisplayName"] = {
			text: this.DisplayNameText,
			width: 150,
			dataIndex: 'DisplayName',
			type: 'string'
		};
		dict["EMail"] = {
			text: this.EMailText,
			width: 150,
			dataIndex: 'EMail',
			type: 'string'
		};
		return dict;

	},
	buildItems: function(dict){
		return [dict['Active'], dict['Username'], dict['DisplayName'], dict['EMail']];
	},
	ActiveText: 'Active',
	UsernameText: 'Username',
	DisplayNameText: 'Display Name',
	EMailText: 'EMail'
});
