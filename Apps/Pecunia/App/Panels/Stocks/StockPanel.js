Ext.define('Pecunia.StockPanel', {
    extend: 'Dextop.Panel',

    title: 'Stocks',
    border: true,
    closable: true,
    barChart: false,

    initComponent: function () {
        var _self = this;

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
                   _self.selection(record);
                }   
            }
        });

        this.barChart = Ext.create('Ext.chart.Chart', {
            region: 'center',
            store: grid.store,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['Capital'],
                title: 'Market Capital'
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['Code'],
                title: 'Code'
            }],
            series: [{
                type: 'column',
                xField: 'Code',
                yField: 'Capital'
            }]
        });
       
        Ext.apply(this, {
            layout: 'border',
            items: [
            {
                border: false,
                region: 'east',
                width: 800,
                layout: 'border',
                items: [_self.barChart, {
                    region: 'north',
                    height: 220,
                    border: false,
                    xtype: 'iframebox',
                    src: 'Content/Article/Shares'
                }]
            },
            grid]
        });

        this.callParent(arguments);
    },

    selection: function (storeItem) {
        var name = storeItem.get('Name');
        var series = this.barChart.series.get(0);
        var i, l, items;

        series.highlight = true;
        series.unHighlightItem();
        series.cleanHighlights();

        for (i = 0, items = series.items, l = items.length; i < l; i++) {
            if (name == items[i].storeItem.get('Name')) {
                selectedStoreItem = items[i].storeItem;
                series.highlightItem(items[i]);
                break;
            }
        }
        series.highlight = false;
    },

});