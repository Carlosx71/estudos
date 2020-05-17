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

		var oDinoT = new sap.suite.ui.commons.GenericTile({
			header:"Dinosaur",
			subheader: "Mountains",
			tileContent:[
				new sap.suite.ui.commons.TileContent({
					footer:"Rank",
					content:[
						new sap.suite.ui.commons.NumericContent({
							indicator:"Up",
							value:"1",
							valueColor: "Good"
						})
					]
				})
			]
		});

		var oEleT = new sap.suite.ui.commons.GenericTile({
			header:"Elephant",
			subheader: "Forest",
			tileContent:[
				new sap.suite.ui.commons.TileContent({
					footer:"Rank",
					content:[
						new sap.suite.ui.commons.NumericContent({
							indicator:"Down",
							value:"2",
							valueColor: "Good"
						})
					]
				})
			]
		});	
		
		var oDCT = new sap.m.CustomTile({
			content:[
				oDinoT
			]
		});

		var oECT = new sap.m.CustomTile({
			content:[
				oEleT
			]
		});

		var oTileContainer = new sap.m.TileContainer({
			tiles:[
				oDCT,
				oECT
			]
		});

 		var oPage = new sap.m.Page({
			title: "KPI Tiles",
			content: [
				oTileContainer
			]
		});
		return oPage;
	}

});