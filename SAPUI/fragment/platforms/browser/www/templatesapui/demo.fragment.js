//O parametro "templatesapui" e o nome do projeto e o "demo" e o nome do arquivo
sap.ui.jsfragment("templatesapui.demo",{

    createContent: function(oController){

        var oItemTemplate = new sap.m.StandardListItem({
            title: "{list>Name}",
            active: true
        });

        var oSelDialog = new sap.m.SelectDialog({

            noDataText: "Vazio",
            title: "Animals",
            type: "Active",
            liveChange: [oController.handleSearch, oController],
            confirm:[oController.handleConfirm, oController],
            type: "Active"
        });

        oSelDialog.bindAggregation("items","list>/names", oItemTemplate);

        return oSelDialog;
    }
})