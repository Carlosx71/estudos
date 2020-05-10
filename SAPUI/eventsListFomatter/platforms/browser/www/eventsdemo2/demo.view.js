sap.ui.jsview("eventsdemo2.demo", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf eventsdemo2.demo
	*/ 
	getControllerName : function() {
		return "eventsdemo2.demo";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf eventsdemo2.demo
	*/ 
	createContent : function(oController) {
	

		
		// create a oList control
		var oList = new sap.m.List({
			headerText: "Animals",
			itemPress:[oController.selectEventHad,oController]
		});

		// bind the oList items to the oData collection
		oList.bindItems({
			path: "list>/names",
			template: new sap.m.StandardListItem({
				title:({
					parts:[{
						path: "list>Name",
						type: new sap.ui.model.type.String()
					},
					{	path: "list>Place",
						type: new sap.ui.model.type.String()
					}
				],
				formatter: function(sName, sPlace){
					return sName + " : Hello " + sPlace;
				}
				}),
				type: sap.m.ListType.Navigation	
						
			})
			
		});

		// create the oPage holding the oList
		var oPage = new sap.m.Page({
			title: "List Formatter",
			content: [
			          oList
			          ]
		});
		return oPage;
		
	}

});