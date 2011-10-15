Ext.define('Pecunia.Session', {
	extend: 'Dextop.Session',


	initSession: function () {

		Dextop.data.RendererFactory.register('money', Ext.util.Format.numberRenderer('0.00'));

        // The navigation panel on the left side
        var navigation = new Pecunia.navigation.NavigationBar({
            region: 'west',              
            border: true,
			margins: '5 5 5 5',
            collapseMode: 'mini'
        });

        this.tabs = Ext.create('Ext.tab.Panel', {
			border: true,
			plain: true,
			region: 'center',
			margins: '5 5 5 0',
			items: [{
				title: 'Welcome',
				xtype: 'iframebox',
				src: 'Content/Article/Welcome',
				border: false
			}]
		});

        this.viewport = Ext.create('Ext.container.Viewport', {
			renderTo: document.body,
			layout: 'border',
			items: [navigation, {
				el: 'header',
				region: 'north',
				height: 50,
				xtype: 'container'
			}, this.tabs, {
				el: 'footer',
				region: 'south',
				height: 20,
				xtype: 'container',
				border: false				
			}]
		});

	
	},

	addPanel: function (type, options) {
		options = options || {};
		this.remote.Instantiate({ type: type, own: false }, options.serverConfig, {
			scope: this,
			success: function (result) {
				var panel = Dextop.create(result, options.clientConfig);
				this.tabs.add(panel);
				if (options.activate !== false)
					this.tabs.setActiveTab(panel);
			}
		});
    }
});