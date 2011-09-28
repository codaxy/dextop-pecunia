Ext.define('Pecunia.Session', {
	extend: 'Dextop.Session',


	initSession: function () {

        // The navigation panel on the left side
        var navigation = new Pecunia.navigation.NavigationBar({
            region: 'west',
            split: true,
            width: 150,
            border: false,
            collapsible: true
        });

        this.tabs = Ext.create('Ext.tab.Panel', {
			border: false,
			region: 'center',
			items: [{
				title: 'Welcome',
				loader: {
					url: 'welcome.htm',
					autoLoad: true
				},
				border: false
			}]
		});

        this.viewport = Ext.create('Ext.container.Viewport', {
			renderTo: document.body,
			layout: 'border',
			items: [navigation, {
				id: 'header',
				region: 'north',
				height: 50,
				xtype: 'container',
				html: '<h1>Tabs (Template)<h1>'
			}, this.tabs, {
				id: 'footer',
				region: 'south',
				height: 20,
				xtype: 'container',
				html: 'Footer'
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
    },

});