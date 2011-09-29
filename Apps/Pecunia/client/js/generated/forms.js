Ext.define('Pecunia.form.ConvertionForm', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(options){
		options = options || {};
		options.data = options.data || {};
		var dict = {};
		dict["From"] = {
			name: 'From',
			xtype: 'textfield',
			value: options.data['From'],
			fieldLabel: 'From'
		};
		dict["To"] = {
			name: 'To',
			xtype: 'textfield',
			value: options.data['To'],
			fieldLabel: 'To'
		};
		dict["FromCurrency"] = {
			name: 'FromCurrency',
			xtype: 'combo',
			value: options.data['FromCurrency'],
			fieldLabel: 'FromCurrency',
			store: options.remote.createStore('Currency'),
			valueField: 'id',
			queryMode: 'local',
			forceSelection: true,
			disableKeyFilter: true,
			editable: false
		};
		dict["ToCurrency"] = {
			name: 'ToCurrency',
			xtype: 'combo',
			value: options.data['ToCurrency'],
			fieldLabel: 'ToCurrency',
			store: options.remote.createStore('Currency'),
			valueField: 'id',
			queryMode: 'local',
			forceSelection: true,
			disableKeyFilter: true,
			editable: false
		};
		return dict;

	},
	buildItems: function(dict){
		return [dict['From'], dict['To'], dict['FromCurrency'], dict['ToCurrency']];
	}
});

