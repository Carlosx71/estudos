sap.ui.jsview("masterdetaildemo.master", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf masterdetaildemo.master
	*/ 
	getControllerName : function() {
		return "masterdetaildemo.master";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf masterdetaildemo.master
	*/ 
	createContent : function(oController) {

		//Cria a lista de controle

		var oList = new sap.m.List({
			headerText: "Animals"
		});

		//Amarra a lista da colecao oData (json)
		oList.bindItems({
			path: "list>/names",
			template: new sap.m.StandardListItem({
				title: "{list>Name}",
				description: "{list>Place}",
				type: sap.m.ListType.Navigation,
				press: [oController.showDetails, oController]
			})
		});

 		var oPage = new sap.m.Page({
			title: "Master",
			content: [
				oList
			]
		});
		return oPage
	}

});