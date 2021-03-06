sap.ui.controller("twopagesimpleapp.first", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf twopagesimpleapp.first
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf twopagesimpleapp.first
*/
//	onBeforeRendering: function() {
//
//	},
    //Funcao que avanca para segunda tela
    goToSecondPage: function(oEvent){
        //Pegou o a label na segunda view
        var oLabel = sap.ui.getCore().byId("idLabel");
        //Pegou o VALOR do input na primeira view
        var oInputVal = sap.ui.getCore().byId("idInput").getValue();
        //Verifica se o valor no input e definido
        if(oInputVal !== undefined){
            //Atribui o valor digitado para a label da segunda pagina
            oLabel.setText(oInputVal);
            //Faz a alteracao da tela pegando o id da tela especificado na index
            app.to("idSecond1");
        }
    },
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf twopagesimpleapp.first
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf twopagesimpleapp.first
*/
//	onExit: function() {
//
//	}

});