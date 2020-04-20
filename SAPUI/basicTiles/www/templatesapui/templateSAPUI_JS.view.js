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

		var oData =  {
			names : [{
			"icon": "sap-icon://sap-ui5",
			"Name":"Dinosaur",               
			"Place":"Mountain"
		},
		{
			"icon": "sap-icon://general-leave-request",
			"Name":"Elephant",               
			"Place":"Forest"
		},
		{
			"icon": "sap-icon://map-2",
			"Name":"Whale",               
			"Place":"Sea"
		},
		{
			"icon": "sap-icon://travel-expense",
			"Name":"Duck",               
			"Place":"Water"
		}]
		}

		var oModel = new sap.ui.model.json.JSONModel(oData);
		sap.ui.getCore().setModel(oModel);

		var oTileTemp = new sap.m.StandardTile({
				icon:"{icon}",
				title:"{Name}",
				info:"{Place}"
		});

		var oTitleCont = sap.m.TileContainer();

		oTitleCont.bindAggregation("tiles", "/names", oTileTemp);


 		return new sap.m.Page({
			title: "Tiles",
			content: [
				oTitleCont
			]
		});
	}

});