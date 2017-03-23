//Condicion
var nombreLink;
if (this.attributes["href"] != undefined &&
    this.attributes["href"].textContent.search(/contratarInversionPlazo\?opcion=contratar/gi) > -1 &&
    $(this).children("em").text() == "A plazo") {
    nombreLink = "menu contrata inversion plazos";
} else if (this.id == "confirmarPromocionInvPlazo" &&
    this.attributes["href"] != undefined && this.attributes["href"].textContent.search(/contratarInversionPlazo\?opcion=oneClic/gi) > -1) {
    nombreLink = "zona one click contrata inversion plazos";
}

if (nombreLink != undefined) {
    // Ejecución de codigo
    //////
    s.clearVars();
    setFulfillmentModel("online");
    setName("inversion a plazo one click");
    setType("contratacion");
    setStep("app on click start:" + nombreLink);
    setPrimaryCategory("inversiones");
    setProductSubtype("");
    setProductName("plazo");

    // Ejecutamos la regla
    tms_funnel("App On Click Start",window.digitalData);
    return true;
}
