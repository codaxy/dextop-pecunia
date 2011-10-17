Ext.define('Pecunia.form.RichPerson', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(options){
		options = options || {};
		options.data = options.data || {};
		var dict = {};
		dict["Name"] = {
			name: 'Name',
			xtype: 'textfield',
			anchor: '0',
			value: options.data['Name'],
			fieldLabel: 'Name'
		};
		dict["DOB"] = {
			name: 'DOB',
			xtype: 'textfield',
			value: options.data['DOB'],
			fieldLabel: 'DOB'
		};
		dict["PhotoUrl"] = {
			name: 'PhotoUrl',
			xtype: 'textfield',
			anchor: '0',
			value: options.data['PhotoUrl'],
			fieldLabel: 'Photo URL'
		};
		dict["WikipediaUrl"] = {
			name: 'WikipediaUrl',
			xtype: 'textfield',
			anchor: '0',
			value: options.data['WikipediaUrl'],
			fieldLabel: 'Wikipedia URL'
		};
		dict["Nationality"] = {
			name: 'Nationality',
			xtype: 'textfield',
			anchor: '0',
			value: options.data['Nationality'],
			fieldLabel: 'Nationality'
		};
		dict["Religion"] = {
			name: 'Religion',
			xtype: 'textfield',
			anchor: '0',
			value: options.data['Religion'],
			fieldLabel: 'Religion'
		};
		dict["Children"] = {
			name: 'Children',
			xtype: 'numberfield',
			value: options.data['Children'],
			fieldLabel: 'Children'
		};
		dict["Business"] = {
			name: 'Business',
			xtype: 'textfield',
			anchor: '0',
			value: options.data['Business'],
			fieldLabel: 'Business'
		};
		dict["Fortune"] = {
			name: 'Fortune',
			xtype: 'textfield',
			value: options.data['Fortune'],
			fieldLabel: 'Fortune US$ (billion)'
		};
		dict["Occupation"] = {
			name: 'Occupation',
			xtype: 'textfield',
			anchor: '0',
			value: options.data['Occupation'],
			fieldLabel: 'Occupation'
		};
		dict["Bio"] = {
			name: 'Bio',
			xtype: 'textarea',
			anchor: '0',
			value: options.data['Bio'],
			fieldLabel: 'Bio',
			labelAlign: 'top',
			height: 200
		};
		dict["ExtraTitle"] = {
			name: 'ExtraTitle',
			xtype: 'textfield',
			anchor: '0',
			value: options.data['ExtraTitle'],
			fieldLabel: 'Title',
			labelAlign: 'top'
		};
		dict["Extra"] = {
			name: 'Extra',
			xtype: 'textarea',
			anchor: '0',
			value: options.data['Extra'],
			fieldLabel: 'Extra',
			labelAlign: 'top',
			height: 200
		};
		dict["tab"] = {
			itemId: 'tab',
			xtype: 'tabpanel',
			items: [{
				xtype: 'panel',
				title: 'General',
				layout: 'anchor',
				bodyStyle: 'padding: 5px',
				hideEmptyLabel: false,
				items: [{
					xtype: 'fieldset',
					title: 'Personal',
					items: [dict['DOB'], dict['PhotoUrl'], dict['WikipediaUrl'], dict['Nationality'], dict['Religion'], dict['Children']]
				}, {
					xtype: 'fieldset',
					title: 'Life',
					items: [dict['Business'], dict['Fortune'], dict['Occupation']]
				}]
			}, {
				xtype: 'panel',
				title: 'Bio',
				layout: 'anchor',
				bodyStyle: 'padding: 5px',
				hideEmptyLabel: false,
				items: [dict['Bio']]
			}, {
				xtype: 'panel',
				title: 'Extra',
				layout: 'anchor',
				bodyStyle: 'padding: 5px',
				hideEmptyLabel: false,
				items: [dict['ExtraTitle'], dict['Extra']]
			}]
		};
		return dict;

	},
	buildItems: function(dict){
		return [dict['Name'], dict['tab']];
	}
});

Ext.define('Pecunia.CurrenciesPanel.form.ConvertForm', {
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

