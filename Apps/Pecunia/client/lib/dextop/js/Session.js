﻿Ext.ns('Dextop');

Ext.define('Dextop.Session', {

	sessionTerminatedReloadText: 'Your session is terminated. Would you like start a new session?',

	mixins: {
		observable: 'Ext.util.Observable',
		remotable: 'Dextop.remoting.Remotable'
	},

	requires: ['Dextop.remoting.Remotable'],

	statics: {
		instance: undefined,

		initialize: function (config) {
			Dextop.Session.instance = Dextop.create(config);
			Dextop.Session.instance.initSession();
			return Dextop.Session.instance;
		},

		getInstance: function () {
			if (!Dextop.Session.instance)
				throw 'Dextop session is not initialized.';
			return Dextop.Session.instance;
		}
	},

	constructor: function (config) {
		this.initDirect(config.direct);
		delete config.direct;
		this.initRemote(config.remote);
		delete config.remote;

		if (config.modules) {
			for (var p in config.modules)
				config.modules[p] = Dextop.create(Ext.apply(config.modules[p], {
					session: this
				}));
		}

		Ext.Function.defer(function () {
			this.extendSessionTask = Ext.TaskManager.start({
				scope: this,
				run: this.extendExpiry,
				interval: 4 * 60 * 1000
			});
		}, 2 * 60 * 1000, this);		

		Ext.apply(this, config);
	},

	destroy: function () {
		this.terminate();
		this.destroyRemote();
	},

	initSession: function () {
		Ext.tip.QuickTipManager.init();
	},

	extendExpiry: function () {
		this.remote.ExtendSession(function (r) {
			if (r.success === false && r.result && r.result.type === 'session')
				this.terminate();
		}, this);
	},

	terminate: function () 
	{		
		if (this.terminated)
			return;
		this.terminated = true;
		
		if (this.extendSessionTask) {
			Ext.TaskManager.stop(this.extendSessionTask);
			delete this.extendSessionTask;
		}
		
		this.stopDirect();
	},

	handleSessionTermination: function() {
		
		if (this.terminated)
			return;
		this.terminate();

		Dextop.warningAlert({ 
			msg: this.sessionTerminatedReloadText, 
			buttons: Ext.MessageBox.YESNO,
			scope: this,
			fn: function(btn) {
				if (btn=='yes') 
					this.restartSession();	
			}
		});
		
	},

	restartSession: function() {
		window.location.reload();
	},

	handleDirectMessage: function (msg) {
		if (msg) {
			if (msg.success)
				Dextop.remoting.Remotable.dispatchServerMessages(msg.data);
			else {
				if (msg.data && msg.data.type === 'session') {
					this.handleSessionTermination();
				}
			}
		} else {
			//not sure what can be done here
		}
	},

	initDirect: function (config) {

		Ext.Direct.on('message', this.handleDirectMessage, this);

		if (!config || !config.remotingUrl)
			throw 'Dextop.Direct configuration not specified.';

		Dextop.remoting.Proxy.ajaxUrlBase = config.remotingUrl + '&ajax=1';

		this.remotingProvider = Ext.Direct.addProvider({
			id: 'rpc',
			url: config.remotingUrl,
			type: "remoting",
			maxRetries: 0,
			priority: 0,
			"actions": {
				"Remote": [{
					"name": "invoke",
					"len": 3
				}]
			}
		});

		this.fsProvider = Ext.Direct.addProvider({
			id: 'form',
			url: config.remotingUrl + '&formSubmit=1',
			type: "remoting",
			maxRetries: 0,
			priority: 0,
			"actions": {
				"Remote": [{
					"name": "submitForm",
					"len": 1,
					"formHandler": true
				}]
			}
		});

		if (config.longPollingUrl)
			this.pollingProvider = Ext.Direct.addProvider({
				id: 'long-poller',
				url: config.longPollingUrl,
				type: "longpolling"
			});
		else if (config.pollingUrl)
			this.pollingProvider = Ext.Direct.addProvider({
				id: 'poller',
				url: config.pollingUrl,
				type: "polling",
				interval: config.pollingInterval || 5000
			});
	},

	stopDirect: function () {

		if (this.remotingProvider) {
			Ext.Direct.removeProvider(this.remotingProvider);
			delete this.remotingProvider;
		}

		if (this.fsProvider) {
			Ext.Direct.removeProvider(this.fsProvider);
			delete this.fsProvider;
		}

		if (this.pollingProvider) {
			Ext.Direct.removeProvider(this.pollingProvider);
			delete this.pollingProvider;
		}
	},
	
	onServerMessage: function(msg) {
		if (msg.type === 'notification')
			this.notify(msg.data);
	},
	
	notify: function(msg) {
		
		if (typeof msg === 'string')
			msg = {
				type: 'info',				
				msg: msg
			};
			
		var	defaults = {
			info: {
				title: Dextop.infoText
			}, 
			warning: {
				title: Dextop.warningText
			},
			error: {
				title: Dextop.errorText
			}
		};		
		
		Ext.applyIf(msg, defaults[msg.type]);
		
		msg.msg = msg.message = msg.msg || msg.message || msg.exception || msg.text;		
		
		if (msg.sound) {
			if (msg.sound === true)
				this.playSound(msg.type);
			else
				this.playSound(msg.sound);
		}
		
		if (msg.alert) 
			this.alert(msg);
		else
			this.displayPopupNotification(msg);				
	},	
	
	//virtual
	playSound: function(sound) {

	},

	getAbsolutePath: function(path) {
		if (!path)
			return path;
		if (path.indexOf(this.virtualAppPath)==0)
			return path;
		if (path.charAt(0)=='/')
			return this.virtualAppPath + path.substring(1);
		return this.virtualAppPath + path;
	},
	
	alert: function(msg) {
		if (typeof msg === 'string')
			msg = {						
				msg: msg
			};
			
		var	alertDefaults = {
			info: {
				title: Dextop.infoText,
				icon: Ext.MessageBox.INFO,
				buttons: Ext.MessageBox.OK
			}, 
			warning: {
				title: Dextop.warningText,
				icon: Ext.MessageBox.WARNING,
				buttons: Ext.MessageBox.OK
			},
			error: {
				title: Dextop.errorText,
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			}
		};		
		
		Ext.applyIf(msg, alertDefaults[msg.type || 'info']);
		
		msg.msg = msg.msg || msg.message || msg.exception || msg.text;		
		
		Ext.MessageBox.show(msg);
	},
	
	displayPopupNotification: function(notification) {    
        var msg = '<div class="msg ' + notification.type + '"><h3>' + notification.title + '</h3><p>' + notification.message + '</p></div>';
        if(!this.msgCt){
        	this.msgCt = Ext.core.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
		}        
        var m = Ext.core.DomHelper.append(this.msgCt, msg, true);
        m.hide();
        m.slideIn('t').ghost("t", { delay: 1000, remove: true});        
	},
	
	sharedLookupData: {},
	
	//lookups
	getSharedLookupData: function(name) {
		var data = this.sharedLookupData[name];
		if (!data)
			throw "Shared lookup data '" + name + "' not found.";
		return data.data;
	},	
	
	setSharedLookupData: function(data) {
		var old = this.sharedLookupData[data.name];
		if (data.data && (!old || old.version != data.version || !old.registered)) {
			this.remote.RegisterLookupDataVersion(data.name, data.version, {
				success: function() {
					data.registered = true;
				}
			});
			this.sharedLookupData[data.name] = data;
		}			
	}
});