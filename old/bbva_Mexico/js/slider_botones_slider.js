// Recoge los eventos de click sobre todas las páginas que tengan slider y se pulse sobre el boton de la pelota
var pagina = null;
var cadena = null;

function obtenerPagina() {
    var url = window.location.href;
    // var urlLength = url.length;
    var res = "";
    if (url.indexOf("bancomer.com/index.jsp") > -1 | url == "http://integrado.tridion-portal.mex.igrupobbva:36400/#" |
        url == "http://integrado.tridion-portal.mex.igrupobbva:36400/#home-carousel" |
        url == "http://integrado.tridion-portal.mex.igrupobbva:36400/") {
        //ES LA HOME PRINCIPAL
        res = "principal:";
    } else if (url.indexOf("/personas/index.jsp") > -1) {
        //ES LA PERSONAS
        res = "personas:";
    } else {
        res = null;
    }
    return res;
}

function getDesElemento(oJQuery) {
    var enlace = oJQuery.attr("href");
    if (enlace == "http://www.bancomer.com/bancainversiones/informe.html") {
        return "banner carrusel 1:informe anual 2015";
    } else if (enlace.indexOf("/personas/nueva-oferta-de-estreno.jsp") > -1) {
        return "banner carrusel 2:solicita tarjeta bbva bancomer";
    } else if (enlace.indexOf("/personas/sorteo-vida-bbva-bancomer.jsp") > -1) {
        return "banner carrusel 3:sorteo vida bancomer";
    } else if (enlace.indexOf("/personas/firma-digital-nip.jsp") > -1) {
        return "banner carrusel 4:seguridad tarjeta credito nip";
    } else if (enlace == "https://www.fundacionbbvabancomer.org/") {
        return "banner carrusel 5:fundación bancomer";
    }
}

pagina = obtenerPagina();
cadena = getDesElemento($(this));

if (pagina == null | cadena == null) {
    return false;
}

_satellite.setVar("etiquetaHome", pagina + cadena);
return true;
