var appStarted = 'appStarted' + _satellite.getVar('serializacion_application');
var isPageName = _satellite.getVar("pageName").search(/.*:contratacion fondos de inversion one click:1 introducir datos/gi) > -1 ? true : false;
var nombreLink;
if (isPageName && _satellite.getVar(appStarted) == undefined) {
    var elemento = this.localName;
    if (elemento == "input") {
        if (this.id == "contrato") {
            nombreLink = "check contrato";
        } else if (this.id == "terminos") {
            nombreLink = "check terminos";
        } else if (this.id == "manifiestochk") {
            nombreLink = "check manifiesto";
        } else if (this.id == "beneficiarioschk") {
            nombreLink = "check beneficiarios";
        } else if (this.id == "seguroDigital") {
            nombreLink = "campo codigo seguridad";
        } else if (this.id == "confirmar") {
            nombreLink = "continuar";
        }
    } else if (elemento == "label") {
        if ($(this).siblings("input").attr("id") == "contrato"){
            nombreLink = "check contrato";
        }else if ($(this).siblings("input").attr("id") == "terminos"){
            nombreLink = "check terminos";
        }else if ($(this).siblings("input").attr("id") == "manifiestochk"){
            nombreLink = "check manifiesto";
        }else if ($(this).siblings("input").attr("id") == "beneficiarioschk"){
            nombreLink = "check beneficiarios";
        }
    } else if (elemento == "a") {
        if (this.id == "aceptarContra"){
            nombreLink = "info contrato productos";
        }else if (this.id == "normativaFondos"){
            nombreLink = "normativa de fondos";
        }else if (this.attributes["href"] != undefined && 
            this.attributes["href"].textContent == "posicionGlobal?entrada=otro" &&
            $(this).text()=="No acepto"){
            nombreLink = "no acepto";
        }
    } else if (elemento == "div") {
        if (this.className == "js-bcombo m-select") {
            if ($(this).siblings("select").attr('id') == "idCuentaAsociada") {
                nombreLink = "cuenta asociada";
            } else if ($(this).siblings("select").attr('id') == "inversiones_tipo_operacion" ) {
                nombreLink = "tipo de operacion";
            } else if ($(this).siblings("select").attr("id") == "ejecucionContrato") {
                nombreLink = "ejecucion contrato";
            }
        }
    }
    if (nombreLink != undefined) {
        _satellite.setVar(appStarted, true)
        _satellite.setVar('custom link', _satellite.getVar("applicationName") + ":app started:" + nombreLink);
        _satellite.track("App Started");
        return true;
    }
}
