sap.ui.jsview("i18ndemo.i18ndemo", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf i18ndemo.i18ndemo
	*/ 
	getControllerName : function() {
		return "i18ndemo.i18ndemo";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf i18ndemo.i18ndemo
	*/ 
	createContent : function(oController) {

		var oBtn = new sap.m.Button({
			text: "{i18n>greet}"
		})

 		var oPage = new sap.m.Page({
			title: "Exemplo i18n",
			content: [
				oBtn
			]
		});
		return oPage;
	}

});