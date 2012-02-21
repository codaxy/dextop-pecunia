Ext.define('Pecunia.IFrameBox', {
	extend: 'Ext.Component',
	alias: 'widget.iframebox',

	initComponent: function () {
		Ext.apply(this, {			
			autoEl: {
				tag: 'iframe',
				src: this.src,
				height: '100%',
				width: '100%',
				frameborder: '0',
				border: 'none'
			}
		});

		this.callParent(arguments);
	},

	setSrc: function (src) {
		this.el.set({ src: src });
	}
});