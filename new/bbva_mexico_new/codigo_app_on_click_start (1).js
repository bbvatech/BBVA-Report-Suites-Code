console.log('setFulfillmentModel("' + digitalData.application.fulfillmentModel + '");');
console.log('setName("' + digitalData.application.application.name + '");');
console.log('setType("' + digitalData.application.application.type + '");');
console.log('setStep("app on click start:" + nombreLink);');
console.log('setPrimaryCategory("' + digitalData.product.primaryCategory + '");');
console.log('setProductSubtype("' + digitalData.product.productSubtype + '");');
console.log('setProductName("' + digitalData.product.productName + '");');

console.log('<a data-fulfillmentmodel="'+ digitalData.application.fulfillmentModel +
    '" data-migadata="'+digitalData.application.application.name+
    '" data-type="'+digitalData.application.application.type +
    '" data-step="app on click start:seguro contenidos del hogar one click'+
    '" data-primarycategory="'+digitalData.product.primaryCategory+
    '" data-productsubtype="'+digitalData.product.productSubtype+
    '" data-productName="'+digitalData.product.productName+'">');

//Condicion
var nombreLink;
if (this.id == "continuarOfertaAdelantoS" ||
    (this.attributes["href"] != undefined && this.attributes["href"].textContent.search(/promocionAdelantoS/gi) > -1)) {
    nombreLink = "zona one click adelanto de sueldo";
}

if (nombreLink != undefined) {
    s.clearVars();
    // Damos valor a las variables

setFulfillmentModel("online");
setName("compra de fondos one click");
setType("compra");
setStep("app on click start:" + nombreLink);
setPrimaryCategory("inversiones");
setProductSubtype("");
setProductName("fondos");

    // Ejecutamos la regla
    window.tms_funnel("App On Click Start",digitalData);
    // return true;
}
