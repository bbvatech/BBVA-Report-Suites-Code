// Recoge los eventos de click sobre todas las páginas que tengan slider y se pulse sobre el boton de la pelota
var resultado = "";
var pagina = "";
var bolaCarrusel = "";

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
    } else if (url.indexOf("/personal/index.jsp") > -1) {
        //ES LA HOME BANCA PERSONAL
        res = "banca personal:";
    } else if (url.indexOf("/patrimonial/index.jsp") > -1) {
        //ES LA HOME BANCA PATRIMONIAL
        res = "banca patrimonial:";
    } else if (url.indexOf("/privada/index.jsp") > -1) {
        //ES LA HOME BANCA PRIVADA
        res = "banca privada:";
    } else if (url.indexOf("/empresas/index.jsp") > -1) {
        //ES LA HOME EMPRESAS
        res = "empresas:";
    } else if (url.indexOf("/negocios/index.jsp") > -1) {
        //ES LA HOME NEGOCIOS
        res = "negocios:";
    } else if (url.indexOf("/gobierno/index.jsp") > -1) {
        //ES LA HOME GOBIERNO
        res = "gobierno:";
    } else if (url.indexOf("/corporativos/index.jsp") > -1) {
        //ES LA HOME CORPORATIVOS
        res = "corporativos:";
    } else {
        res = null;
    }
    return res;
}

function getBolaCarrusel(obj) {
    var numSlider = "";
    var cont = 0;
    var dato = null;

    if (pagina == "principal:"){
        numSlider = obj.innerHTML;

    } else {
        numSlider = obj.getAttribute("data-slide-to");
        cont = 1
    }
    
    if (numSlider != null) {
        var paginaNum = parseInt(numSlider) + cont;
        dato = "bolas carrusel " + paginaNum;
    }
    return dato;
}

var pagina = obtenerPagina();
//console.log("channel: " + etiqueta);
if (pagina == null) {
    return false;
}

var bolaCarrusel = getBolaCarrusel(this);
if (bolaCarrusel == null) {
    return false;
}
resultado = pagina + bolaCarrusel;
_satellite.setVar("etiquetaHome", resultado);
return true;
