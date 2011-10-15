Ext.ns('Pecunia.controls');

Ext.define('Pecunia.controls.Item', {
	extend: 'Ext.Component',

	imgWidth: 50,
	imgHeight: 50,
    width: 120,
    height: 80,
    maxHeight: 80,
    maxWidth: 120,
    minHeight: 80,
    minWidth: 120,
   
	// ----------------------------------------------------------------------------------------------------
	
	initComponent: function () {
		this.callParent();
	},
	
	onRender: function (ct, position) {
		this.rendered = true;
		
		var tplHTML = '<div id="menu-item-{id}"><table border="0"><tr><td>' +
		'<img src="{imgPath}" width="{imgWidth}" height="{imgHeight}" /></td></tr>' +
		'<tr><td><div id="menu-item-text">{imgText:htmlEncode}</div>' +
		'</td></tr></table></div>';	

		var tpl = new Ext.Template(tplHTML);

		var btn, targs = {
			imgPath: this.disabled ? this.disabledImgPath : this.imgPath,
			imgWidth: this.imgWidth || "",
			imgHeight: this.imgHeight || "",
			imgText: this.text || "",
			tooltip: this.tooltip || this.text,
			id: this.itemId
		};

		btn = tpl.append(ct, targs, true);
	
		btn.addCls('menu-item');
		
		this.el = btn;

		btn.on('click', this.onClick, this);		
	}			
});