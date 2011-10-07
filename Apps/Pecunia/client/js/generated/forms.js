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

Ext.define('Pecunia.form.Contact', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(options){
		options = options || {};
		options.data = options.data || {};
		var dict = {};
		dict["Firstname"] = {
			name: 'Firstname',
			xtype: 'textfield',
			value: options.data['Firstname'],
			fieldLabel: 'Firstname'
		};
		dict["Lastname"] = {
			name: 'Lastname',
			xtype: 'textfield',
			value: options.data['Lastname'],
			fieldLabel: 'Lastname'
		};
		dict["From"] = {
			name: 'From',
			xtype: 'datefield',
			value: options.data['From'],
			fieldLabel: 'From'
		};
		dict["To"] = {
			name: 'To',
			xtype: 'datefield',
			value: options.data['To'],
			fieldLabel: 'To'
		};
		dict["Science"] = {
			name: 'Science',
			xtype: 'textfield',
			value: options.data['Science'],
			fieldLabel: 'Science'
		};
		return dict;

	},
	buildItems: function(dict){
		return [{
			xtype: 'fieldset',
			title: 'Personal',
			items: [dict['Firstname'], dict['Lastname'], dict['From'], dict['To']]
		}, {
			xtype: 'fieldset',
			title: 'Live',
			items: [dict['Science']]
		}];
	}
});

