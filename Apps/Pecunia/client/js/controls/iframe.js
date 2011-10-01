Ext.define('Pecunia.IFrameBox', {
	extend: 'Ext.Panel',
	alias: 'widget.iframebox',

	layout: 'fit',

	initComponent: function () {

		if (this.title)
			Ext.apply(this, {
				tools: [{
					type: 'maximize',
					tooltip: 'Open in new Tab',
					scope: this,
					handler: function (event, toolEl, panel) {
						window.open(this.url);
					}
				}]
			});

		Ext.apply(this, {
			tpl: new Ext.Template('<iframe width="100%" height="100%" frameborder="0" src="{src}" />'),
			collapseFirst: false
		});

		if (this.src) {
			this.data = {
				src: this.src
			};
		}

		this.callParent(arguments);
	},

	setSrc: function (src) {
		this.src = src;
		this.update({ src: src });
	}
});