sap.ui.jsview("simpleformelements.simpleFormElements", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf simpleformelements.simpleFormElements
	*/ 
	getControllerName : function() {
		return "simpleformelements.simpleFormElements";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf simpleformelements.simpleFormElements
	*/ 
	createContent : function(oController) {


		var oCol1 = new sap.m.Column({
			header: new sap.m.Label({text:"Name"})
		});

		var oCol2 = new sap.m.Column({
			header: new sap.m.Label({text:"Place"})
		});

		var oCol3 = new sap.m.Column({
			header: new sap.m.Label({text:"Id"})
		});

		var oTable = new sap.m.Table({

			title:"Simple Table",
			columns:[
				oCol1,
				oCol2,
				oCol3
			]
		});

		var oTemp = new sap.m.ColumnListItem({
			cells:[
				new sap.m.Text({
					text:"{Name}"
				}),
				new sap.m.Text({
					text:"{Place}"
				}),
				new sap.m.Text({
					text:"{Id}"
				})
			]
		});


		oTable.bindItems({
			path:"/names",
			template: oTemp
		})


 		return new sap.m.Page({
			title: "Title",
			content: [
				oTable
			]
		});
	}

});