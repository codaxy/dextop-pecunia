Ext.define('Pecunia.CoursesPanel', {
	extend: 'Dextop.Panel',

	title: 'Courses',
	border: true,
	closable: true,

	initComponent: function () {

		var grid = Ext.create('Dextop.ux.SwissArmyGrid', {
			region: 'center',			
			remote: this.remote,
			border: true,
			margins: '0 0 -1 -1',
			paging: false,
			storeOptions: {
				autoLoad: true
			}
		});

		// ---

		var formFields = Ext.create(this.getNestedTypeName('.form.ConvertForm')).getItems({
			remote: this.remote,
			data: this.convertData
		});

		formFields.push({
			text: 'Recalculate',
			xtype: 'button',
			margin: '0 0 0 5',
			height: 40,
			scope: this,
			handler: function () {
				var form = this.down('form');
				if (!form.getForm().isValid())
					return;
				grid.store.load({
					params: form.getForm().getFieldValues()
				});
			}
		});

		var calcForm = Ext.create('Ext.form.Panel', {
			height: 60,
			region: 'north',
			border: false,
			layout: {
				type: 'hbox',
				align: 'middle'
			},
			fieldDefaults: {
				margin: '0 0 0 5'
			},
			bodyStyle: 'padding: 5px',
			items: formFields
		});

		Ext.apply(this, {
			layout: 'border',
			items: [{
				border: false,
				region: 'west',
				width: 600,
				layout: 'border',
				items: [grid, calcForm]
			}, {
				region: 'center',
				border: false,
				xtype: 'iframebox',
				src: 'Content/Article/Currencies'
				//bodyStyle: 'padding: 10px',
//				html: ['<h2>Currency</h2>',
//					'<b>Wikipedia</b>: In economics, currency refers to a generally accepted medium of exchange.',
//					' These are usually the coins and banknotes of a particular government, ',
//					'which comprise the physical aspects of a nation\'s money supply. ',
//					'The other part of a nation\'s money supply consists of bank deposits ',
//					'(sometimes called deposit money), ownership of which can be transferred',
//					' by means of cheques, debit cards, or other forms of money transfer. ',
//					'Deposit money and currency are money in the sense that both are acceptable as a means of payment.']
				}]
		});

		this.callParent(arguments);

	}
});