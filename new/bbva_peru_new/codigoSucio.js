
var href = this.attributes["href"].textContent;
var linkPage;
var etiqueta = this.localName;

function montaLink(esBanner) {
    var link = "pidela aqui";
    link += esBanner ? " banner" : " contenido";
    var levels = s.pageName.split(":");
    for (var i = 3; i < levels.length; i++) {
        link += " " + levels[i];
    }
    return link;
}

if (etiqueta == "a" && href.indexOf("/personas/tarjetas/formulario-tarjeta-de-credito") > -1) {
    if (s.pageName == "escritorio:publica:personas:home") {
        if (href.indexOf('onsite=onsite-Pago_sin_intereses-Carrusel') > -1) {
            linkPage = 'pidela aqui carrusel home';
        } else if (href.indexOf('onsite=onsite-Tarjeta_de_credito-Secundario1') > -1) {
            linkPage = 'pidela aqui contenido home';
        }
    }
    if (s.pageName == "escritorio:publica:personas:tarjetas" ||
        s.pageName == "escritorio:publica:personas:tarjetas:multiplica" ||
        s.pageName == "escritorio:publica:personas:tarjetas:promociones" ||
        s.pageName == "escritorio:publica:personas:home:tarjetas:pago sin intereses" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito al toque" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:lifemiles:visa" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida:visa" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida:visa:signature" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida:visa:platinum" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida:visa:oro" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida:visa:clasica" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida:mastercard:black" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida:mastercard:platinum" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida:mastercard:oro" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida:mastercard:clasica" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:lifemiles:visa:signature" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:lifemiles:visa:platinum" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:lifemiles:visa:oro" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:lifemiles" ||
        s.pageName == "escritorio:publica:personas:home:tarjetas:credito:puntos vida:visa:bfree" ||
        s.pageName == "escritorio:publica:personas:tarjetas:credito:puntos vida:visa:bfree") {
        if (this.className == "btn btn-destacado btn-lg") {
            linkPage = montaLink(true);
        } else if (this.className == "btn btn-destacado btn-md") {
            linkPage = montaLink(false);
            if (this.previousElementSibling.attributes['href'].textContent.indexOf('signature') > -1) { linkPage += " signature" }
            if (this.previousElementSibling.attributes['href'].textContent.indexOf('platinum') > -1) { linkPage += " platinum" }
            if (this.previousElementSibling.attributes['href'].textContent.indexOf('clasica') > -1) { linkPage += " clasica" }
            if (this.previousElementSibling.attributes['href'].textContent.indexOf('oro') > -1) { linkPage += " oro" }
        } else {
            linkPage = montaLink(false);
        }
    }

}
/*
if (linkPage != undefined) {
    if(window.elementoClickLanzado == undefined && window.eventoLanzado == undefined){
      window.elementoClick = $(this);
        $(this).click(function(evento){
            evento.preventDefault();
        });
        _satellite.setVar('linkPage', linkPage);
       return true;
    } else {
        _satellite.setVar('linkPage', "");
    }
}
*/
if (linkPage != undefined) {
          _satellite.setVar('linkPage', linkPage);
       return true;
}
