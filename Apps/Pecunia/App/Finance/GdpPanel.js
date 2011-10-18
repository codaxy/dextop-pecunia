Ext.define('Pecunia.GdpPanel', {
	extend: 'Dextop.Panel',

	title: 'World GDP',
	border: true,
	closable: true,

	uniquePanelType: 'gdp',

	initComponent: function () {

		Ext.apply(this, {
			layout: 'border',
			items: [{
				region: 'center',
				xtype: 'iframebox',
				border: true,
				margin: '1'
			}, {
				region: 'west',
				border: false,
				width: 300,
				layout: 'border',
				items: [{
					xtype: 'iframebox',
					src: Dextop.getSession().absoluteUrl('Content/Article/GDP'),
					region: 'north',
					border: false,
					height: 300
				}, {
					region: 'center',
					border: false,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					bodyStyle: 'padding: 5px',
					items: [{
						border: false,
						html: 'Select Report'
					}, {
						xtype: 'swissarmygrid',
						height: 200,
						model: 'reports',
						hideHeaders: true,
						remote: this.remote,
						storeOptions: {
							autoLoad: true
						},
						selModel: Ext.create('Ext.selection.RowModel', {
							listeners: {
								scope: this,
								select: function (sm, record) {
									var box = this.down('iframebox');
									box.setSrc(this.remote.getAjaxUrl({ type: record.get('ReportId') }));
								}
							}
						})
					}, {
						border: false,
						height: 50,
						layout: 'hbox',
						defaults: {
							xtype: 'button',
							scope: this,
							scale: 'large',
							margin: '5 5 0 0'
						},
						items: [{
							text: 'PDF',
							iconCls: 'pdf',
							handler: function () {
								var record = this.down('swissarmygrid').getSelectionModel().getLastSelected();
								window.open(this.remote.getAjaxUrl({ type: record.get('ReportId'), format: 'pdf' }));
							}
						}, {
							text: 'Excel',
							iconCls: 'excel',
							handler: function () {
								var record = this.down('swissarmygrid').getSelectionModel().getLastSelected();
								window.open(this.remote.getAjaxUrl({ type: record.get('ReportId'), format: 'xlsx' }));
							}
						}, {
							text: 'Text',
							iconCls: 'text',
							handler: function () {
								var record = this.down('swissarmygrid').getSelectionModel().getLastSelected();
								window.open(this.remote.getAjaxUrl({ type: record.get('ReportId'), format: 'text' }));
							}
						}]
					}]
				}]
			}]
		});

		this.callParent(arguments);

	}
});