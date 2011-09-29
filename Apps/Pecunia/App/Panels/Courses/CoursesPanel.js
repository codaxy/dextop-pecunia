Ext.define('Pecunia.CoursesPanel', {
    extend: 'Dextop.Panel',

    title: 'Courses',
    border: false,
    closable: true,

    initComponent: function () {

        var grid = Ext.create('Dextop.ux.SwissArmyGrid', {
            region: 'center',
            split: true,
            flex: 1,
            remote: this.remote,
            border: false,
            paging: false,
            storeOptions: {
                autoLoad: true,
                autoSync: false
            }
        });

        // ---

        var formFields = Ext.create('Pecunia.form.ConvertionForm').getItems({
            remote: this.remote
        });

        var calcForm = Ext.create('Ext.form.Panel', {
            xtype: 'form',
            split: true,
            flex: 1,
            region: 'south',
            itemId: 'form',
            border: false,
            items: formFields,
            buttons: [{
                text: 'Send',
                scope: this,
                handler: function () {
                    var form = this.getComponent('form');
                    if (!form.getForm().isValid())
                        return;
                    var data = form.getForm().getFieldValues();
                    this.remote.Send(data, {
                        type: 'alert',
                        success: function () {
                            Dextop.infoAlert('Form has been successfully submited.');
                        }
                    });
                }
            }]
        });


        var gridCalc = Ext.create('Dextop.ux.SwissArmyGrid', {
            remote: this.remote,
            region: 'south',
            border: false,
            paging: false,
            storeOptions: {
                autoLoad: true,
                autoSync: false
            },
            split: true,
            region: 'center',
            flex: 1
        });

        Ext.apply(this, {
            layout: 'border',
            items: [{
                xtype: 'panel',
                region: 'west',
                layout: 'border',
                width: 400,
                split: true,
                items: [calcForm, gridCalc]
            }, grid]
        });

        this.callParent(arguments);

    }
});