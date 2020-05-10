sap.ui.controller("templatesapui.templateSAPUI_JS", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf templatesapui.templateSAPUI_JS
*/
	onInit: function() {

        var oData = {
            names : [{
                Name: "Dinosaur",
                Place: "Mountain"
            }, {
                Name: "Elephant",
                Place: "Forest"
            }, {
                Name: "Whale",
                Place: "Sea"
            }, {
                Name: "Duck",
                Place: "Water"
            }, {
                Name: "Monkey",
                Place: "Tree"   
            }]
        };

        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData(oData)
        sap.ui.getCore().setModel(oModel,"list")
    },
    

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf templatesapui.templateSAPUI_JS
*/
//	onBeforeRendering: function() {
//
//	},
    openFragment: function(oEvt) {

        if(this.oFragment === undefined){
        this.oFragment = sap.ui.jsfragment("templatesapui.demo",this);
        this.oFragment.open();
        } else {
            this.oFragment.open();
        }
    },
    //Funcao para filtrar
    handleSearch: function(oEvt){
        var sValue = oEvt.getParameter("value");
        var oFilter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sValue);
        var oBiding = oEvt.getSource().getBinding("items");
        oBiding.filter([oFilter])
    },

    handleConfirm: function(oEvt){
        var sSelectedAnimal = oEvt.getParameters().selectedItem.getTitle();
        sap.m.MessageToast.show(sSelectedAnimal + ' was selected'); 
    },
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf templatesapui.templateSAPUI_JS
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf templatesapui.templateSAPUI_JS
*/
//	onExit: function() {
//
//	}

});