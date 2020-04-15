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


		var oCol1 = new sap.ui.table.Column({
			label: new sap.m.Label({text:"Name"}),
			template: new sap.m.Text({
				text:"{Name}"
			})
		});


		var oCol2 = new sap.ui.table.Column({
			label: new sap.m.Label({text:"Name"}),
			template: new sap.m.Text({
				text:"{Name}"
			})
		});



		var oCol3 = new sap.ui.table.Column({
			label: new sap.m.Label({text:"Name"}),
			template: new sap.m.Text({
				text:"{Name}"
			})
		});


		var oTable = new sap.ui.table.Table({

			title:"Simple Table",
			columns:[
				oCol1,
				oCol2,
				oCol3
			]
		});



		oTable.bindRows("/names")


 		return new sap.m.Page({
			title: "Simple Animal List",
			content: [
				oTable
			]
		});
	}

});