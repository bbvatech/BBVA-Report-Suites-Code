var appStarted = 'appStarted' + _satellite.getVar('serializacion_application');

function un() {
    window.elementoClick.unbind('click');
    window.elementoClick[0].click();
}
if (_satellite.getVar(appStarted) == undefined && (this.baseURI.indexOf("/promocionPrestamoPersonal") > -1 || this.baseURI.indexOf("simuladorDeCreditos") > -1)) {
    if (this.id == "continuarPromocion" && this.value == "Lo quiero") {
        window.nombreLink = "boton lo quiero";
    } else if (this.id == "modificarImporteRec" || this.id == "modificarImportePPI") {
        window.nombreLink = "modificar importe";
    }

    if (window.nombreLink != undefined) {
        if (window.elementoClickLanzado == undefined) {
            window.elementoClick = $(this);
            $(this).click(function(evento) {
                evento.preventDefault();
            });
            _satellite.setVar('custom link', _satellite.getVar("applicationName") + ":app started:" + window.nombreLink);
            _satellite.setVar(appStarted, true)
            _satellite.track("App Started");
            window.elementoClickLanzado = true;
            setTimeout(function() { un(); }, 5000);
            return true;
        } else {
            _satellite.setVar('custom link', "");
        }
    }
}
