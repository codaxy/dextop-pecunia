Ext.define('Pecunia.ContactsPanel', {
	extend: 'Dextop.Panel',

	title: 'Contacts',
	border: true,
	closable: true,

	initComponent: function () {

		var preview = Ext.widget('panel', {
			autoScroll: true,
			region: 'center',
			bodyStyle: 'padding-top: 5px',
			border: false,
			tpl: new Ext.XTemplate('<div class="person">',
			'<div style="float: left; padding: 0 5px 0px 0;">{[this.photo(values)]}</div>',
			'<h1>{Name}</h1>',
			'<p><i>Source:</i> <a href="{WikipediaUrl}" target="_blank">Wikipedia</a></p>',
			'<table>',
			'<tr><td class="prop-header">Fortune:</td><td class="prop-value">US$ {Fortune} billion</td></tr>',
			'<tr><td class="prop-header">Occupation:</td><td class="prop-value">{[this.occupation(values.Occupation)]}</td></tr>',
			'<tr><td class="prop-header">DOB:</td><td class="prop-value">{DOB}</td></tr>',
			'<tr><td class="prop-header">Nationality:</td><td class="prop-value">{Nationality}</td></tr>',
			'<tr><td class="prop-header">Religion:</td><td class="prop-value">{Religion}</td></tr>',
			'<tr><td class="prop-header">Children:</td><td class="prop-value">{Children}</td></tr>',
			'</table>',
			'<h2>About</h2>',
			'<p>{Bio}</p>',
			'<h2>{ExtraTitle}</h2>',
			'<p>{Extra}</p>',
			'</div>', {
				photo: function (values) {
					if (values.PhotoUrl)
						return '<image class="photo" src="' + values.PhotoUrl + '" />';
					return '';
				},
				occupation: function (value) {
					if (!value)
						return value;
					return value.replace(new RegExp(';', 'g'), '<br/>');
				}
			})
		});

		var grid = Ext.create('Dextop.ux.SwissArmyGrid', {
			region: 'west',
			width: 400,
			remote: this.remote,
			border: true,
			tbar: ['add', 'edit', 'remove'],
			margins: '5',
			paging: false,
			editing: 'form',
			storeOptions: {
				autoLoad: true,
				autoSync: true,
				sortOnLoad: true,
				sorters: [{ property: 'Fortune', direction: 'DESC' }]
			},
			listeners: {
				scope: this,
				select: function (sm, record) {
					preview.update(record.data);
				}
			},
			editingOptions: {
				width: 600,				
				formItemsConfig: {
					apply: {
						'tab': {
							plain: true
						}
					}
				}
			}
		});

		Ext.apply(this, {
			layout: 'border',
			items: [grid, preview]
		});

		this.callParent(arguments);

	}
});