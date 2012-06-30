Ext.define('Pecunia.CurrenciesPanel', {
    extend: 'Dextop.Panel',

    title: 'Currencies',
    border: true,
    closable: true,

    uniquePanelType: 'currencies',

    initComponent: function () {

        var historyStore = this.remote.createStore("history");
        var grid, calcForm;

        grid = Ext.create('Dextop.ux.SwissArmyGrid', {
            region: 'center',
            remote: this.remote,
            border: true,
            margins: '0 0 -1 -1',
            margins: '5',
            paging: false,
            autoSelect: true,
            storeOptions: {
                autoLoad: true
            },
            listeners: {
                scope: this,
                select: this.refreshChart = function () {
                    var record = grid.getSelectionModel().getLastSelected();
                    if (record) {
                        historyStore.load({
                            params: {
                                ISOCode: record.get("ISOCode"),
                                BaseCurrencyISOCode: calcForm.getForm().findField('Currency').getValue()
                            }
                        });
                    }
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
                var form = calcForm;
                if (!form.getForm().isValid())
                    return;
                grid.store.load({
                    params: form.getForm().getFieldValues()
                });
                this.refreshChart();
            }
        });

        calcForm = Ext.create('Ext.form.Panel', {
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
            store: historyStore,            
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['Rate'],
                grid: true
            }, {
                type: 'Time',
                dateFormat: 'M d',
                position: 'bottom',
                fields: ['Date'],
                grid: true,
                label: {
                    style: 'font-size: 10px',
                    font: '10px arial',
                    fontSize: 5,
                    size: 5,
                    rotate: {
                        degrees: 90
                    }                   
                }
            }],
            series: [{
                type: 'line',
                xField: 'Date',
                yField: 'Rate',
                tips: {                  
                  width: 200,
                  height: 28,
                  renderer: function(record, item) {
                    var dateString = Ext.util.Format.date(record.get('Date'), 'M d, Y');           
                    var rateString = Ext.util.Format.number(record.get('Rate'), '0.000000');
                    this.setTitle(dateString + ': ' + rateString);
                    
                  }
                },
            }]
        });

        Ext.apply(this, {
            layout: 'border',
            items: [{
                border: false,
                region: 'west',
                width: 600,
                layout: 'border',
                items: [grid, calcForm]
            }, {
                region: 'center',
                layout: 'border',
                border: false,
                items: [chart, {
                    region: 'north',
                    height: 200,
                    border: false,
                    xtype: 'iframebox',
                    src: Dextop.getSession().absoluteUrl('Content/Article/Currencies')
                }]
            }]
        });

        this.callParent(arguments);

    }
});