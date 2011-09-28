﻿Ext.define('Pecunia.navigation.NavigationBar', {
    extend: 'Ext.panel.Panel',

    title: 'Menu',

    width: 200,
    autoHeight: true,

    initComponent: function () {

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['title', 'type', 'iconCls'],
            reader: {
                type: 'json'
            },
            proxy: {
                type: 'memory',
                data: [{
                    title: 'Manage Domains',
                    type: '',
                    iconCls: 'account'
                }, {
                    title: 'Manage Users',
                    type: 'users',
                    iconCls: 'accounting'
                }]
            }
        });

        Ext.apply(this, {
            border: false,
            layout: 'fit',
            items: [{
                xtype: 'dataview',
                store: store,
                border: false,
                tpl: [
					'<tpl for=".">',
						'<div class="{iconCls} welcome-navigation-pane">',
						'{title}',
						'</div>',
					'</tpl>',
					'<div class="x-clear"></div>'
				],
                multiSelect: true,
                trackOver: true,
                overItemCls: 'x-item-over',
                itemSelector: 'div.welcome-navigation-pane',
                listeners: {
                    scope: this,
                    'itemclick': function (view, record) {
                        Dextop.getSession().addPanel(record.get('type'), { activate: true });
                    }
                }

            }]
        });

        this.callParent(arguments);
    }
});