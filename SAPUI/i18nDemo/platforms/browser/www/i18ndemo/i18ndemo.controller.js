sap.ui.controller("i18ndemo.i18ndemo", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf i18ndemo.i18ndemo
*/
	onInit: function() {

        //Pega a localizacao so sujeito
        var sLoc = sap.ui.getCore().getConfiguration().getLanguage();
        var i18nPath = "i18n/i18n";

        //Escolhe o local para o idioma
        if (sLoc === "de_DE") {
            i18nPath = i18nPath + "_de.properties";
        } else if (sLoc === "zh-Hans") {
            i18nPath = i18nPath + "_ch.properties"
        } else {
            i18nPath = i18nPath + ".properties"
        };

        //Passa o caminho escolhido do idioma
        var oi18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl: i18nPath
        });

        //Passa para view
        sap.ui.getCore().setModel(oi18nModel, "i18n");
        //Exemplo para testar http://localhost:8000/index.html?sap-ui-language=zh-Hans
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf i18ndemo.i18ndemo
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf i18ndemo.i18ndemo
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf i18ndemo.i18ndemo
*/
//	onExit: function() {
//
//	}

});