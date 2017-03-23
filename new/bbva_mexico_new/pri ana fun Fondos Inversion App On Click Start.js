//Condicion
var nombreLink;
if (this.id ="confirmarPromocionInvFondos" &&
    this.attributes["href"].textContent.search(/contratarInversionFondos\?opcion=oneClic/gi) > -1) {
    nombreLink = "zona one click fondos de inversion";
} else if (this.attributes["href"]!= undefined &&
        this.attributes["href"].textContent.search(/contratarInversionFondos\?opcion=contrata/gi) >-1 &&
        $(this).children("em").text() == "Fondos"){
    nombreLink = "menu contrata fondos de inversion";
}

if (nombreLink != undefined) {
    // Ejecución de codigo
    s.clearVars();
    // Damos valor a las variables
    setFulfillmentModel("online");
    setName("fondos de inversion one click");
    setType("contratacion");
    setStep("app on click start:" + nombreLink);
    setPrimaryCategory("inversiones");
    setProductSubtype("");
    setProductName("fondos");

    // Ejecutamos la regla
    tms_funnel("App On Click Start",window.digitalData);
    return true;
}
