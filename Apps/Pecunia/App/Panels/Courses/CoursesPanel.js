Ext.define('Pecunia.CoursesPanel', {
    extend: 'Dextop.Panel',

    title: 'Courses',
    border: true,
    closable: true,

    initComponent: function () {

        var historyStore = this.remote.createStore("history");

        var grid = Ext.create('Dextop.ux.SwissArmyGrid', {
            region: 'center',
            remote: this.remote,
            border: true,
            margins: '0 0 -1 -1',
            margins: '5',
            paging: false,
            storeOptions: {
                autoLoad: true
            },
            listeners: {
                itemclick: function (view, record) {
                    historyStore.load({
                        params: { ISOCode : record.get("ISOCode") }
                    });
                }
            }

        });

        // ---

        var formFields = Ext.create(this.getNestedTypeName('.form.ConvertForm')).getItems({
            remote: this.remote,
            data: this.convertData,
            apply: {
                Amount: {
                    listeners: {
                        scope: this,
                        'specialkey': function (field, e) {
                            if (e.getKey() == e.ENTER)
                                this.recalculate();
                        }
                    }
                }
            }
        });

        formFields.push({
            text: 'Recalculate',
            xtype: 'button',
            margin: '0 0 0 5',
            height: 35,
            scope: this,
            handler: this.recalculate = function () {
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


        var chart = Ext.create('Ext.chart.Chart', {
            region: 'center',
            width: 400,
            height: 300,
            store: historyStore,
            axes: [
            {
                title: 'Value',
                type: 'Numeric',
                position: 'left',
                fields: ['Rate']
            },
            {
                title: 'Date',
                type: 'Time',
                dateFormat: 'd M Y',
                position: 'bottom',
                fields: ['Date']
            }
            ],
            series: [
            {
                type: 'line',
                xField: 'Date',
                yField: 'Rate'
            }
            ]
        });


        var _self = this;
        Ext.apply(this, {
            layout: 'border',
            items: [{
                border: false,
                region: 'west',
                width: 600,
                layout: 'border',
                items: [grid, calcForm]
            }, chart],
            buttons: [{
                text: 'Callback Function',
                handler: function () {
                    _self.remote.getCurrencyHistoryRate("AUD", function (r) {
                        if (r && r.success)
                            store.loadData(r.result);
                        else
                            alert('failed');
                    }, _self);
                }
            }]
        });

        this.callParent(arguments);

    }
});