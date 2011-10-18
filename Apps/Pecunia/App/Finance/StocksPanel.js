Ext.define('Pecunia.StocksPanel', {
    extend: 'Dextop.Panel',

    title: 'Stocks',
    border: true,
    closable: true,
    barChart: false,

	uniquePanelType: 'stocks',

    initComponent: function () {
        var me = this;

        var grid = Ext.create('Dextop.ux.SwissArmyGrid', {
            region: 'west',
			width: 500,
            remote: this.remote,
            border: true,
            margins: '0 0 -1 -1',
            margins: '5',
            paging: false,
            storeOptions: {
                autoLoad: true,
				sortOnLoad: true,
				sorters: [{ property: 'Value', direction: 'DESC' }]
            },
			columnModelOptions: {
				renderers: {
					'Change': function(value, meta, record) {
						
						if (value>0) 
							meta.style = "color: green;";
						else if (value<0)
							meta.style = "color: red;";
						else
							meta.style = "color: orange;";
						
						return value;
					}
				}
			},
            listeners: {
				scope: this,
                select: function (sm, record) {
                   this.selection(record);
                }   
            }
        });

        this.barChart = Ext.create('Ext.chart.Chart', {
            region: 'center',
            store: grid.store,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['Value']
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['Code']
            }],
            series: [{
                type: 'column',
				label: {
					contrast: true,
					display: 'insideEnd',
					field: 'Value',
					color: '#000',
					orientation: 'vertical',
					'text-anchor': 'middle'
				},
				highlight: true,
				style: {
					fill: '#456d9f'
				},
				highlightCfg: {
					fill: '#a2b5ca'
				},
                xField: 'Code',
                yField: 'Value'
            }]
        });
       
        Ext.apply(this, {
            layout: 'border',
            items: [grid, {
                border: false,
                region: 'center',
                width: 800,
                layout: 'border',
                items: [this.barChart, {
                    region: 'north',
                    height: 220,
                    border: false,
                    xtype: 'iframebox',
                    src: Dextop.getSession().absoluteUrl('Content/Article/Shares')
                }]
            }]
        });

        this.callParent(arguments);
    },

    selection: function (storeItem) {
        var name = storeItem.get('Code');
        var series = this.barChart.series.get(0);
        var i, l, items;

        series.highlight = true;
        series.unHighlightItem();
        series.cleanHighlights();

        for (i = 0, items = series.items, l = items.length; i < l; i++) {
            if (name == items[i].storeItem.get('Code')) {
                selectedStoreItem = items[i].storeItem;
                series.highlightItem(items[i]);
                break;
            }
        }
        series.highlight = false;
    }
});