Ext.define('Pecunia.Session', {
	extend: 'Dextop.Session',


	initSession: function () {

		Dextop.data.RendererFactory.register('money', Ext.util.Format.numberRenderer('0.00'));

		// The navigation panel on the left side
		var navigation = new Pecunia.NavigationBar({
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
				src: this.absoluteUrl('Content/Article/Welcome'),
				border: false
			}]
		});

		this.viewport = Ext.create('Ext.container.Viewport', {
			//renderTo: document.body,
			layout: 'border',
			items: [navigation, {
				//el: 'header',
				region: 'north',
				height: 50,
				xtype: 'container',
				html: '<div id="header"><h1>Pecunia</h1></div>'
			}, this.tabs, {
				//el: 'footer',
				region: 'south',
				height: 20,
				xtype: 'container',
				border: false,
				html: '<div id="footer">Pecunia v'+ this.versionNumber + ' Copyright © Codaxy 2011</div>'
			}]
		});


	},

	addPanel: function (type, options) {
		options = options || {};
		for (var i = 0; i < this.tabs.items.getCount(); i++) {
			var panelType = this.tabs.items.getAt(i).uniquePanelType;
			if (panelType === type) {
				this.tabs.setActiveTab(i);
				return;
			}
		}

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

	absoluteUrl: function (url) {
		if (url.substring(this.appPath) == 0)
			return url;
		var res = this.appPath;
		if (url) {
			if (url[0] == '/')
				res += url;
			else
				res += '/' + url;
		}
		return res;
	}
});