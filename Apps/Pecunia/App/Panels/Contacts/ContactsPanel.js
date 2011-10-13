Ext.define('Pecunia.ContactsPanel', {
    extend: 'Dextop.Panel',

    title: 'Contacts',
    border: true,
    closable: true,

    initComponent: function () {

        var grid, contactForm;

        grid = Ext.create('Dextop.ux.SwissArmyGrid', {
            region: 'center',
            flex: 1,
            remote: this.remote,
            border: true,
            tbar: ['add', 'edit', 'remove'],
            margins: '0 0 -1 -1',
            margins: '5',
            paging: false,
            editing: 'form',
            storeOptions: {
                autoLoad: true
            },
            listeners: {
                scope: this,
                itemclick: function () {
                    var record = grid.getSelectionModel().getLastSelected();
                    if (record) {
                        image.setSrc(record.get('ImageUrl'));
                        info.setSrc(record.get('InfoUrl'));
                    }
                }
            }
        });

        // ---

        var formFields = Ext.create(('Pecunia.form.Contact')).getItems({
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

        contactForm = Ext.create('Ext.form.Panel', {
            flex: 1,
            width: 300,
            region: 'center',
            border: false,
            fieldDefaults: {
                margin: '0 0 0 5'
            },
            bodyStyle: 'padding: 5px',
            items: formFields
        });


        var image = Ext.widget('iframebox', {
            flex: 1,
            title: 'Image',
            region: 'east',
            src: "http://upload.wikimedia.org/wikipedia/commons/b/bf/Bill_Gates_World_Economic_Forum_2007.jpg"
        });

        var info = Ext.widget('iframebox', {
            title: 'bio',
            region: 'south',
            src: 'Content/Contact/BillGates',
            height: 300
        });

        var _self = this;
        Ext.apply(this, {
            layout: 'border',
            items: [
                {
                    border: false,
                    region: 'center',
                    width: 600,
                    layout: 'border',
                    items: [grid, {
                        border: false,
                        region: 'east',
                        flex: 1,
                        layout: 'border',
                        items: [contactForm, image, info]
                    }
                    ]
                }
			]
        });

        this.callParent(arguments);

    }
});