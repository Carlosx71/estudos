sap.ui.jsview("templatesapui.templateSAPUI_JS", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf templatesapui.templateSAPUI_JS
	*/ 
	getControllerName : function() {
		return "templatesapui.templateSAPUI_JS";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf templatesapui.templateSAPUI_JS
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
			title: "Title",
			content: [
			
			]
		});
	}

});