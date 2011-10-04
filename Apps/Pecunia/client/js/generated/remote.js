Ext.define('Pecunia.CoursesPanel.remoting.Proxy', {
	extend: 'Dextop.Window.remoting.Proxy'
});

Ext.define('Pecunia.UsersPanel.remoting.Proxy', {
	extend: 'Dextop.Window.remoting.Proxy'
});

Ext.define('Pecunia.Session.remoting.Proxy', {
	extend: 'Dextop.Session.remoting.Proxy',
	CreatePanel: function(panelName, callback, scope) { this.invokeRemoteMethod(callback, scope, 'CreatePanel', [panelName]);}
});

