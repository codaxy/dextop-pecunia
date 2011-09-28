Ext.define('Pecunia.CoursesPanel', {
	extend: 'Dextop.Panel',

	title: 'Courses',
	border: false,
	closable: true,


	initComponent: function () {

	    var simple = Ext.create('Ext.form.Panel', {
            region:'west',
	        url: 'save-form.php',
	        frame: true,
            split: true,
	        title: 'Simple Form',
	        bodyStyle: 'padding:5px 5px 0',
	        width: 350,
	        fieldDefaults: {
	            msgTarget: 'side',
	            labelWidth: 75
	        },
	        defaultType: 'textfield',
	        defaults: {
	            anchor: '100%'
	        },

	        items: [{
	            xtype: 'ti',
	            fieldLabel: 'Time',
	            name: 'time',
	            minValue: '8:00am',
	            maxValue: '6:00pm'
	        }, {
	            fieldLabel: 'First Name',
	            name: 'first',
	            allowBlank: false
	        }, {
	            fieldLabel: 'Last Name',
	            name: 'last'
	        }, {
	            fieldLabel: 'Company',
	            name: 'company'
	        }, {
	            fieldLabel: 'Email',
	            name: 'email',
	            vtype: 'email'
	        }],

	        buttons: [{
	            text: 'Save'
	        }, {
	            text: 'Cancel'
	        }]
	    });
   
	    var grid = Ext.create('Dextop.ux.SwissArmyGrid', {
			remote: this.remote,
			paging: true,
			border: false,
            split: true,
			region: 'center',
            width: 250,
			editing: 'row',
			tbar: ['add', 'edit', 'remove'],
			storeOptions: {
				pageSize: 10,
				autoLoad: true,
				autoSync: true
			},
			editingOptions: {
				clicksToEdit: 1
			}
        });

	    Ext.apply(this, {
	        layout: 'border',
            items: [grid, simple]
	    });

	this.callParent(arguments);
	
    }
});