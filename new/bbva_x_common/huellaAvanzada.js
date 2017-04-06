//Establecemos los datos necesarios de las páginas previas para incluirlas en todos
//los eventos -> s.t(), s.tl()
_satellite.setVar("pageNamePrevPage", window.s.cookieRead("pageNamePrevPage"));
_satellite.setVar("pageURLPrevPage", window.s.cookieRead("pageURLPrevPage"));
_satellite.setVar('pageIntentPrevPage', window.s.cookieRead("pageIntentPrevPage"));
_satellite.setVar('siteSectionPrevPage', window.s.cookieRead("siteSectionPrevPage"));

//Establecemos los datos iniciales
tms_O.tipo = tms_O.clase.huella;
_satellite.getVar("setVariablesHuella");

//Config huella basica
function finalHuella() {
    s.t();
  	tms_O.tipo = "";
    s.clearVars();
    //Restablece el app started
    var appStarted = 'appStarted' + _satellite.getVar('serializacion_application');
    if (_satellite.getVar(appStarted) != undefined) {
        _satellite.setVar(appStarted, undefined);
    }

    //Establecemos los valores pre para la siguiente carga de página
    window.TMS_CookieWrite('pageNamePrevPage', digitalData.page.pageInfo.sysEnv + ":" + digitalData.page.pageInfo.pageName, 0);
    window.TMS_CookieWrite('pageURLPrevPage', window.location.href.substr(window.location.href.indexOf("//") + 2), 0);
    window.TMS_CookieWrite('pageIntentPrevPage', digitalData.page.pageInfo.pageIntent.length == 0 ? "informacion" : digitalData.page.pageInfo.pageIntent, 0);
    window.TMS_CookieWrite('siteSectionPrevPage', digitalData.page.pageInfo.level1, 0);
    onYouTubeIframeAPIReadyDTM();

    //Configurar las impresiones de campañas internas
    function quitarComas(valor) {
        for (var i = 0; i < valor.length; i++) {
            valor = valor.replace(",", "");
        }
        return valor;
    }
    var intCampS = _satellite.getVar('internalCampaignAttributes');
    if (intCampS != undefined && intCampS.length > 0 && intCampS[0].location != "") {
        var campanas = "";
        for (var i = 0; i < intCampS.length; i++) {
            var aux = quitarComas(intCampS[i].location);
            campanas += aux + ":";
            aux = quitarComas(intCampS[i].campaignFormat);
            campanas += aux + ":";
            aux = quitarComas(intCampS[i].collectiveCode);
            campanas += aux + ":";
            aux = quitarComas(intCampS[i].campaignName);
            campanas += aux + ":";
            aux = quitarComas(intCampS[i].product);
            campanas += aux + ":";
            aux = quitarComas(intCampS[i].productCode);
            campanas += aux + ":";
            aux = quitarComas(intCampS[i].quantity);
            campanas += aux + ",";
        }
        if (campanas.charAt(campanas.length - 1) == ",") {
            campanas = campanas.slice(0, campanas.length - 1);
        }
        setTimeout(function() {
            _satellite.getVar("setVariablesHuella");
            s.list2 = campanas;
            s.events = "event34,event35";
            s.linkTrackVars += ",events,list2";
            s.linkTrackEvents = "event34,event35";
          	window.setLinkTrackVars();
            s.tl(this, 'o', "internal campaign impressions");
            //s.clearVars();
            s.events = "";
            s.linkTrackEvents = "";
            s.linkTrackVars = "";
            s.list2 = "";
        }, 400);
    }
    _satellite.setVar('pageNameAppStart', _satellite.getVar('pageName'));
    //Eliminamos la basura que queda en las variables.
    s.linkTrackVars = s.linkTrackEvents = "";
    //Scroll
    window.lanzaScroll = function () {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            window.mouseWheeledFired = true;
            setTimeout(function() { window.mouseWheeledFired = undefined }, 5000);
            _satellite.track("scroll-complete");
        }
    }
    $('body').on('DOMMouseScroll mousewheel', function(e) {
        if ((e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) && window.mouseWheeledFired == undefined) {
            lanzaScroll();
        }
    });
    window.clickedOnScrollbar = function(mouseX) {
        if ($(window).outerWidth() <= mouseX) {
            return true;
        }
    }
    var mY = 0;
    $(document).mouseup(function(e) {
        if (clickedOnScrollbar(e.clientX) && window.mouseWheeledFired == undefined) {
            lanzaScroll();
        }
    })
}
setTimeout(function() { finalHuella(); }, 700);
