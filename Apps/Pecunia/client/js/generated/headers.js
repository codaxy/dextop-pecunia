Ext.define('Pecunia.CurrenciesPanel.columns.RateModel', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(){
		var dict = {};
		dict["Currency"] = {
			text: this.CurrencyText,
			width: 200,
			dataIndex: 'Currency',
			type: 'string'
		};
		dict["Rate"] = {
			text: this.RateText,
			width: 100,
			dataIndex: 'Rate',
			type: 'float'
		};
		dict["Amount"] = {
			text: this.AmountText,
			renderer: 'money',
			dataIndex: 'Amount',
			type: 'float'
		};
		dict["ISOCode"] = {
			text: this.ISOCodeText,
			width: 50,
			dataIndex: 'ISOCode',
			type: 'string'
		};
		return dict;

	},
	buildItems: function(dict){
		return [dict['Currency'], dict['Rate'], dict['Amount'], dict['ISOCode']];
	},
	CurrencyText: 'Currency',
	RateText: 'Rate',
	AmountText: 'Amount',
	ISOCodeText: 'ISO'
});
Ext.define('Pecunia.GdpPanel.columns.ReportType', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(){
		var dict = {};
		dict["Title"] = {
			text: this.TitleText,
			flex: 1,
			dataIndex: 'Title',
			type: 'string'
		};
		return dict;

	},
	buildItems: function(dict){
		return [dict['Title']];
	},
	TitleText: 'Title'
});
Ext.define('Pecunia.columns.RichPerson', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(){
		var dict = {};
		dict["Name"] = {
			text: this.NameText,
			flex: 1,
			dataIndex: 'Name',
			type: 'string'
		};
		dict["Fortune"] = {
			text: this.FortuneText,
			width: 100,
			dataIndex: 'Fortune',
			type: 'float'
		};
		return dict;

	},
	buildItems: function(dict){
		return [dict['Name'], dict['Fortune']];
	},
	NameText: 'Name',
	FortuneText: 'Fortune (B$)'
});
Ext.define('Pecunia.columns.Stock', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(){
		var dict = {};
		dict["Code"] = {
			text: this.CodeText,
			width: 60,
			dataIndex: 'Code',
			type: 'string'
		};
		dict["Name"] = {
			text: this.NameText,
			flex: 1,
			dataIndex: 'Name',
			type: 'string'
		};
		dict["Value"] = {
			text: this.ValueText,
			width: 70,
			dataIndex: 'Value',
			type: 'float'
		};
		dict["Price"] = {
			text: this.PriceText,
			width: 70,
			dataIndex: 'Price',
			type: 'float'
		};
		dict["Change"] = {
			text: this.ChangeText,
			width: 70,
			dataIndex: 'Change',
			type: 'float'
		};
		return dict;

	},
	buildItems: function(dict){
		return [dict['Code'], dict['Name'], dict['Value'], dict['Price'], dict['Change']];
	},
	CodeText: 'Code',
	NameText: 'Name',
	ValueText: 'Value (B$)',
	PriceText: 'Price',
	ChangeText: 'Change (%)'
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
