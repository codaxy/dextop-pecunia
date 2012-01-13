Ext.define('Pecunia.CurrenciesPanel.form.ConvertForm', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(options){
		options = options || {};
		options.data = options.data || {};
		var dict = {};
		dict["Amount"] = {
			name: 'Amount',
			fieldLabel: this.AmountFieldLabelText,
			xtype: 'numberfield',
			width: 100,
			value: options.data['Amount'],
			labelAlign: 'top'
		};
		dict["Currency"] = {
			name: 'Currency',
			fieldLabel: this.CurrencyFieldLabelText,
			xtype: 'combo',
			width: 200,
			value: options.data['Currency'],
			store: options.remote.createStore('Currency'),
			labelAlign: 'top',
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
	},
	AmountFieldLabelText: 'Amount',
	CurrencyFieldLabelText: 'Currency'
});

Ext.define('Pecunia.form.RichPerson', {
	extend: 'Dextop.ItemFactory',
	getDictionary: function(options){
		options = options || {};
		options.data = options.data || {};
		var dict = {};
		dict["Name"] = {
			name: 'Name',
			fieldLabel: this.NameFieldLabelText,
			xtype: 'textfield',
			anchor: '0',
			value: options.data['Name']
		};
		dict["DOB"] = {
			name: 'DOB',
			fieldLabel: this.DOBFieldLabelText,
			xtype: 'textfield',
			value: options.data['DOB']
		};
		dict["PhotoUrl"] = {
			name: 'PhotoUrl',
			fieldLabel: this.PhotoUrlFieldLabelText,
			xtype: 'textfield',
			anchor: '0',
			value: options.data['PhotoUrl']
		};
		dict["WikipediaUrl"] = {
			name: 'WikipediaUrl',
			fieldLabel: this.WikipediaUrlFieldLabelText,
			xtype: 'textfield',
			anchor: '0',
			value: options.data['WikipediaUrl']
		};
		dict["Nationality"] = {
			name: 'Nationality',
			fieldLabel: this.NationalityFieldLabelText,
			xtype: 'textfield',
			anchor: '0',
			value: options.data['Nationality']
		};
		dict["Religion"] = {
			name: 'Religion',
			fieldLabel: this.ReligionFieldLabelText,
			xtype: 'textfield',
			anchor: '0',
			value: options.data['Religion']
		};
		dict["Children"] = {
			name: 'Children',
			fieldLabel: this.ChildrenFieldLabelText,
			xtype: 'numberfield',
			value: options.data['Children']
		};
		dict["Business"] = {
			name: 'Business',
			fieldLabel: this.BusinessFieldLabelText,
			xtype: 'textfield',
			anchor: '0',
			value: options.data['Business']
		};
		dict["Fortune"] = {
			name: 'Fortune',
			fieldLabel: this.FortuneFieldLabelText,
			xtype: 'numberfield',
			value: options.data['Fortune']
		};
		dict["Occupation"] = {
			name: 'Occupation',
			fieldLabel: this.OccupationFieldLabelText,
			xtype: 'textfield',
			anchor: '0',
			value: options.data['Occupation']
		};
		dict["Bio"] = {
			name: 'Bio',
			fieldLabel: this.BioFieldLabelText,
			xtype: 'textarea',
			anchor: '0',
			value: options.data['Bio'],
			height: 200,
			labelAlign: 'top'
		};
		dict["ExtraTitle"] = {
			name: 'ExtraTitle',
			fieldLabel: this.ExtraTitleFieldLabelText,
			xtype: 'textfield',
			anchor: '0',
			value: options.data['ExtraTitle'],
			labelAlign: 'top'
		};
		dict["Extra"] = {
			name: 'Extra',
			fieldLabel: this.ExtraFieldLabelText,
			xtype: 'textarea',
			anchor: '0',
			value: options.data['Extra'],
			height: 200,
			labelAlign: 'top'
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
	},
	NameFieldLabelText: 'Name',
	DOBFieldLabelText: 'DOB',
	PhotoUrlFieldLabelText: 'Photo URL',
	WikipediaUrlFieldLabelText: 'Wikipedia URL',
	NationalityFieldLabelText: 'Nationality',
	ReligionFieldLabelText: 'Religion',
	ChildrenFieldLabelText: 'Children',
	BusinessFieldLabelText: 'Business',
	FortuneFieldLabelText: 'Fortune US$ (billion)',
	OccupationFieldLabelText: 'Occupation',
	BioFieldLabelText: 'Bio',
	ExtraTitleFieldLabelText: 'Title',
	ExtraFieldLabelText: 'Extra'
});

