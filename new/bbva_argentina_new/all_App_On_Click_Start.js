// var digi = fnClone(window.digitalData);
var digi = _satellite.getVar("digitalDataPrevPage");
if (this.localName == "button" && this.textContent.trim().toLowerCase() =="voy a"){
    return true;
    window.localStorage.getItem("sdsat_debug") == "true" ? console.log("fired TMS: evento vacio para evitar que se lance el evento ultimosMovimientos de la etiqueta html padre tr") : "";
} else if (this.id != undefined && dataFunnel.setTipoEvento(this.id)) {
    dataFunnel.e.appStep = dataFunnel.e.appStep + ":" +
        (this.id.search(/_voyA/gi) > -1 ||this.id.search(/_tabla/gi) > -1 ? "voy a" : this.id.search(/_operaciones/gi) > -1 ? "operaciones" : "menu lateral");
    digi.application.fulfillmentModel = dataFunnel.e.fulfillmentModel;
    digi.application.application.name = dataFunnel.e.appName;
    digi.application.application.type = dataFunnel.e.appType;
    digi.application.step = dataFunnel.e.appStep;

    // if (this.id.search(/_menuLateral_detalle/gi) > -1)
    //     digi.application.step = dataFunnel.e.appStep; //Aunque lo tienen que informar en el dataLayer para el botón lateral de detalle no lo hacen

    if (this.id.search(/_operaciones|_menuLateral_detalle/gi) == -1) {
        //Definido en el dataLayer en operaciones, todo menos en enlace a "Fondos de inversión"
        digi.product.primaryCategory = dataFunnel.e.primaryCategory;
        digi.product.productSubtype = dataFunnel.e.productSubtype;
        digi.product.productName = dataFunnel.e.productName;
    }
    //Caso para plazo fijo operaciones
    if (this.id.search(/a_plazoFijo_operaciones/gi) > -1) {
        digi.product.primaryCategory = "inversiones";
        digi.product.productSubtype = "plazos fijos";
        digi.product.productName = "plazo fijo clasico";
    }
    // Ejecutamos la regla
    window.tms_funnel("App On Click Start", digi);
    window.dataFunnel.doClear();
    return true;
} else if (this.attributes["class"] != undefined && this.attributes["class"].textContent == "ng-binding" &&
    _satellite.getVar("pageName").search(/.*:privada:.*:inversiones/gi) > -1 &&
    this.text == "Hacer un plazo fijo") {
    var nombreLink = "pestana hacer un plazo fijo";

    //funcionalidad creada para los funnel en los que no se puede mer id

    digi.application.fulfillmentModel = "online";
    digi.application.application.name = "hacer plazo fijo clasico";
    digi.application.application.type = "contratacion";
    digi.application.step = "app on click start:" + nombreLink;
    digi.product.primaryCategory = "inversiones";
    digi.product.productSubtype = "plazos fijos";
    digi.product.productName = "plazo fijo clasico";

    // Ejecutamos la regla
    window.tms_funnel("App On Click Start", digi);
    window.dataFunnel.doClear();
    return true;
}
digi = undefined;
