sap.ui.jsview("eventsdemo2.demo", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf eventsdemo2.demo
	*/
	getControllerName: function () {
		return "eventsdemo2.demo";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf eventsdemo2.demo
	*/
	createContent: function (oController) {


		var oPlace = new sap.m.Text({
			text: "{table>Place}"
		});

		var oId = new sap.m.Text({
			text: "{table>id}"
		});

		var oCol1 = new sap.ui.table.Column({
			label: new sap.m.Label({
				text: "Name"
			}),
			template: new sap.m.Text({
				text: "{table>Name}"
			})
		});

		var oCol2 = new sap.ui.table.Column({
			label: new sap.m.Label({
				text: "Place"
			}),
			template: new sap.m.Text({
				text: "{table>Place}"
			})
		});

		var oCol3 = new sap.ui.table.Column({
			label: new sap.m.Label({
				text: "Id"
			}),
			template: new sap.m.Text({
				text: "{table>id}"
			})
		});


		var oTable = new sap.ui.table.Table("idTable", {
			title: "Simple Table",
			columns: [
				oCol3,
				oCol1,
				oCol2
			],
			cellClick: [oController.goToNextPage , oController]
		});

		oTable.bindRows("table>/names");
		// create the oPage holding the oList																												
		var oPage = new sap.m.Page({
			title: "Events in table",
			content: [
				oTable
			]
		});
		return oPage;

	}

});