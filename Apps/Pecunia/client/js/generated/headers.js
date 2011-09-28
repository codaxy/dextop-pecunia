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
