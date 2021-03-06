sap.ui.controller("masterdetaildemo.master", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf masterdetaildemo.master
*/
    onInit: function () {
        // create some dummy JSON oData
        var oData = {
            names: [{
                Name: "Dinosaurs",
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
        // create some dummy JSON oData
        this.oDataTable = {
            "names": [{
                id: 1,
                Name: "Dinosaurs",
                Place: "Mountain"
            }, {
                id: 2,
                Name: "Elephant",
                Place: "Forest"
            }, {
                id: 3,
                Name: "Whale",
                Place: "Sea"
            }, {
                id: 4,
                Name: "Duck",
                Place: "Water"
            }, {
                id: 5,
                Name: "Monkey",
                Place: "Tree"
            }]
        };
        
        //Criacao da model para algum json
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData(oData);
        sap.ui.getCore().setModel(oModel,"list");
    },

    //Funcao para mostrar os detalhes quando se clica em um item da listafp
    showDetails: function(oEvt) {
        var sClickedData = oEvt.getSource().getTitle();
        var oData = this.oDataTable;
        var oNewData = [];
        for(var i = 0; i < oData["names"].length; i++){
            if(oData["names"][i]["Name"] === sClickedData){
                oNewData.push(oData["names"][i])
            }
        }
        console.log(oNewData)
        //Esta setando a this.oDataTable na controller details para a tabela
        sap.ui.getCore().getModel("table").setData(oNewData);
    },


/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf masterdetaildemo.master
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf masterdetaildemo.master
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf masterdetaildemo.master
*/
//	onExit: function() {
//
//	}

});