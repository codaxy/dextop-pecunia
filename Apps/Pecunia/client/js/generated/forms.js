Ext.define('Pecunia.CoursesPanel.form.ConvertForm', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(options){
		options = options || {};
		options.data = options.data || {};
		var dict = {};
		dict["Amount"] = {
			name: 'Amount',
			xtype: 'textfield',
			width: 100,
			value: options.data['Amount'],
			fieldLabel: 'Amount',
			labelAlign: 'top'
		};
		dict["Currency"] = {
			name: 'Currency',
			xtype: 'combo',
			width: 200,
			value: options.data['Currency'],
			fieldLabel: 'Currency',
			labelAlign: 'top',
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
		return [dict['Amount'], dict['Currency']];
	}
});

