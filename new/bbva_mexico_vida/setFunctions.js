/**
 * Clona un objeto (deep-copy)
 * @param  {Any}    from: el objeto a clonar
 * @param  {Object} dest: (opcional) objeto a extender
 * @return {Any} retorna el nuevo objeto clonado
 */
window.fnClone = (function() {
    // @Private
    var _toString = Object.prototype.toString;

    // @Private
    function _clone(from, dest, objectsCache) {
        var prop;
        // determina si @from es un valor primitivo o una funcion
        if (from === null || typeof from !== "object") return from;
        // revisa si @from es un objeto ya guardado en cache
        if (_toString.call(from) === "[object Object]") {
            if (objectsCache.filter(function(item) {
                    return item === from;
                }).length) return from;
            // guarda la referencia de los objetos creados
            objectsCache.push(from);
        }
        // determina si @from es una instancia de alguno de los siguientes constructores
        if (from.constructor === Date || from.constructor === RegExp || from.constructor === Function ||
            from.constructor === String || from.constructor === Number || from.constructor === Boolean) {
            return new from.constructor(from);
        }
        if (from.constructor !== Object && from.constructor !== Array) return from;
        // crea un nuevo objeto y recursivamente itera sus propiedades
        dest = dest || new from.constructor();
        for (prop in from) {
            // TODO: allow overwrite existing properties
            dest[prop] = (typeof dest[prop] === "undefined" ?
                _clone(from[prop], null, objectsCache) :
                dest[prop]);
        }
        return dest;
    }

    // función retornada en el closure
    return function(from, dest) {
        var objectsCache = [];
        return _clone(from, dest, objectsCache);
    };
}());

/**
 * Esta función redondea el numero y eliminando los decimales
 * @param  {string} valor, el número que queremos transformar
 * @return {string} con el número redondeado
 */
window.quitarPuntoCero = function(valor) {
    try {
        if (valor.length > 0)
            valor = "" + parseInt(valor);
        return valor
    } catch (err) {
        _satellite.notify("fired " + tms_O.fnLaunch + " error: quitarPuntoCero() - " + err.stack);
    }
}

/**
 * Devuelve la lista 1 de elementos informados en el dataLayer, en formato ingles y eliminando la ,
 * @param {Object} dD, el objeto dataLayer.
 * return {string} con la lista1
 */
window.AppFlowSelectionList1 = function(dD) {
    try {
        // APPLICATIONFLOWSELECTIONS (LIST1)
        var amount = quitarPuntoCero(dD.application.amount.toString().replace(',', ''));
        var paymentAmount = quitarPuntoCero(dD.application.paymentAmount.toString().replace(',', ''));
        var numberOfPayments = quitarPuntoCero(dD.application.numberOfPayments.toString().replace(',', ''));
        var paymentType = dD.application.paymentType.toString().replace(',', '');
        var paymentDate = dD.application.paymentDate.toString().replace(',', '');
        var term = quitarPuntoCero(dD.application.term.toString().replace(',', ''));
        var interestRate = dD.application.interestRate.toString().replace(',', '');
        var serviceCharge = dD.application.serviceCharge.toString().replace(',', '');
        var res = "";

        if (amount.length != 0) {
            res += "amount:" + amount + ",";
        }
        if (paymentAmount.length != 0) {
            res += "payment amount:" + paymentAmount + ",";
        }
        if (numberOfPayments.length != 0) {
            res += "number of payments:" + numberOfPayments + ",";
        }
        if (paymentType.length != 0) {
            res += "payment type:" + paymentType + ",";
        }
        if (paymentDate.length != 0) {
            res += "payment date:" + paymentDate + ",";
        }
        if (term.length != 0) {
            res += "term:" + term + ",";
        }
        if (interestRate.length != 0) {
            res += "rate:" + interestRate + ",";
        }
        if (serviceCharge.length != 0) {
            res += "service charge:" + serviceCharge;
        }

        if (res.charAt(res.length - 1) == ",") {
            var resAux = "";
            for (var i = 0; i < res.length - 1; i++) {
                resAux += res.charAt(i);
            }
            res = resAux;
        }
        return res;
    } catch (err) {
        _satellite.notify("fired " + tms_O.fnLaunch + " error: AppFlowSelectionList1() - " + err.stack);
    }
}

/**
 * Establece todas las variables para la huella Avanzada en la variable "s" de DTM
 * @param  {object} dD, el data Layer
 */
window.variablesHuellaTMS = function(dD) {
    try {
        s.pageName = dD.page.pageInfo.sysEnv + ":" + dD.page.pageInfo.pageName;
        s.channel = dD.page.pageInfo.channel;
        s.server = dD.page.pageInfo.server;
        s.campaign = window.s.Util.getQueryParam("cid");
        s.hier1 = dD.user.device.userAgent;
        s.eVar1 = dD.page.pageInfo.pageName;
        s.eVar4 = _satellite.getVar("Date Format");
        s.eVar12 = dD.user.userState;
        s.eVar13 = _satellite.getVar("urlFull");
        s.eVar14 = dD.page.pageInfo.pageIntent.length == 0 ? "informacion" : dD.page.pageInfo.pageIntent;
        s.eVar15 = "" + dD.page.pageInfo.channel + ":" + dD.page.pageInfo.sysEnv + ":" + dD.pageInstanceID + ":" + ((navigator.platform.indexOf("iPhone") > -1 || navigator.platform.indexOf("iPad") > -1 || navigator.platform.indexOf("iPod") > -1) ? "ios" : navigator.appVersion.indexOf("Android") > -1 ? "android" : "web");
        s.eVar16 = dD.page.pageInfo.area
        s.eVar17 = dD.page.pageInfo.language;
        s.eVar25 = window.s.getNewRepeat(30, "s_nr");
        s.eVar26 = dD.page.pageInfo.geoRegion;
        s.eVar29 = dD.page.pageInfo.bussinessUnit;
        s.eVar31 = "BBVA Bancomer";
        s.eVar34 = window.s.getVisitNum();
        s.eVar37 = dD.user.profileID;
        s.eVar38 = dD.user.segment.global;
        s.eVar39 = dD.user.age;
        s.eVar40 = dD.user.gender;
        s.eVar41 = dD.user.country == "" ? "" : dD.user.state == "" ? dD.user.country : dD.user.country + ":" + dD.user.state;
        s.prop1 = dD.page.pageInfo.level1;
        s.prop2 = dD.page.pageInfo.level2;
        s.prop3 = dD.page.pageInfo.level3;
        s.prop4 = dD.page.pageInfo.level4;
        s.prop5 = dD.page.pageInfo.level5;
        s.prop6 = dD.page.pageInfo.level6;
        s.prop7 = dD.page.pageInfo.level7;
        s.prop8 = dD.page.pageInfo.level8;
        s.prop9 = dD.page.pageInfo.level9;
        s.prop10 = dD.page.pageInfo.level10;
        s.prop12 = s.eVar12;
        s.prop13 = s.eVar13;
        s.prop14 = s.eVar14;
        s.prop15 = s.eVar15;
        s.prop16 = s.eVar16;
        s.prop17 = s.eVar17;
        var ppvArray = window.s.getPercentPageViewed(dD.page.pageInfo.pageName);
        if (ppvArray != undefined) {
            //s.prop21 = ppvArray[0] //contains the previous page name
            s.prop18 = ppvArray[1] //contains the highest percent viewed of the previous page
            s.prop19 = ppvArray[2] //contains the percent of the previous page viewed on its initial load
            s.prop20 = ppvArray[3] //contains the highest number of vertical pixels viewed of the previous page
        }
        s.prop21 = _satellite.readCookie('pageNamePrevPage');
        _satellite.setCookie('pageNamePrevPage', dD.page.pageInfo.pageName, 0);
        s.prop22 = window.s_getLoadTime();
        s.prop23 = _satellite.readCookie('pageURLPrevPage');
        _satellite.setCookie('pageURLPrevPage', window.location.href.substr(window.location.href.indexOf("//") + 2), 0);
        s.prop24 = _satellite.readCookie('prevSiteSection');
        _satellite.setCookie('prevSiteSection', dD.page.pageInfo.level1, 0);

        s.prop25 = _satellite.readCookie('prevSiteSection');
        _satellite.setCookie('prevSiteSection', dD.page.pageInfo.level1, 0);
        s.prop26 = s.eVar26;
        s.prop31 = s.eVar31;
        s.prop67 = dD.page.pageInfo.version + ":" + dD.versionDL + ":" + _satellite.appVersion + ":" + s.version;

        if (dD.product.primaryCategory.length > 0) {
            s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;;";
            s.linkTrackVars += ",products";
        }

        for (var i = 1; i < 100; i++) {
            if (s["eVar" + i] != undefined && s["eVar" + i] != "") { s.linkTrackVars += ",eVar" + i; }
            if (s["prop" + i] != undefined && s["prop" + i] != "") { s.linkTrackVars += ",prop" + i; }
        }
        s.linkTrackVars += ",hier1";
    } catch (err) {
        _satellite.notify("fired " + tms_O.fnLaunch + " error: variablesHuellaTMS() - " + err.stack);
    }
}

/**
 * En orden ejecuta todas estas acciones.
 * Lanza un evento s.t()
 * Prepara el documento HTML para mandar datos a SiteCatalist de los videos de Youtube.
 * Lanza la impresión de campañas si están establecidas en el data Layer.
 * Setea el valor para el pageName para los eventos asincronos.
 * Limpia la serialización para el evento App Started.
 * Prepara la página para lanzar eventos de scroll.
 * 
 * @param  {object} dD, el Data Layer
 */
window.lanzaHuella = function(dD) {
    try {
        //Establecemos los datos iniciales
        variablesHuellaTMS(dD);
        var cadena = "";
        var props = dD.page.pageInfo.pageName.split(':');
        var level = 0;
        if (dD.page.pageInfo.pageName.indexOf('home') > -1) {
            s.linkTrackVars += "prop1";
            s.prop1 = "home";
        } else {
            for (var i = 1; i + 1 < props.length; i++) {
                s["prop" + i] = cadena == "" ? dD.page.pageInfo['level' + i] : cadena + ":" + dD.page.pageInfo['level' + i];
                cadena = s["prop" + i];
                s.linkTrackVars += ",prop" + (i + 1);
            }
        }
        s.t();
        _satellite.notify("fired " + tms_O.fnLaunch + ":" + tms_O.nombre);
        s.clearVars();
        onYouTubeIframeAPIReadyDTM();
        var intCampS = dD.internalCampaign.attributes;
        if (intCampS != undefined && intCampS.length > 0 && intCampS[0].location != "") {
            function quitarComas(valor) {
                for (var i = 0; i < valor.length; i++) {
                    valor = valor.replace(",", "");
                }
                return valor;
            }

            //Configurar las impresiones de campañas internas
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
                variablesHuellaTMS(dD);
                s.list2 = campanas;
                s.events = "event34,event35";
                s.linkTrackVars += ",events,list2";
                s.linkTrackEvents = "event34,event35";
                s.tl(this, 'o', "internal campaign impressions");
                s.clearVars();
                // s.events = "";
                // s.linkTrackEvents = "";
                // s.linkTrackVars = "";
                // s.list2 = "";
            }, 200);
        }
        _satellite.setVar('pageNameAppStart', dD.page.pageInfo.pageName);
        //Restablece el app started
        var appStarted = 'appStarted' + tms_O.serializacion_product(dD);
        if (_satellite.getVar(appStarted) != undefined) {
            _satellite.setVar(appStarted, undefined);
        }

        //Scroll
        function lanzaScroll() {
            var scrollHeight = $(document).height();
            var scrollPosition = $(window).height() + $(window).scrollTop();
            if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
                window.mouseWheeledFired = true;
                setTimeout(function() { window.mouseWheeledFired = undefined }, 5000);
                tms_track("scroll-complete", dD);
            }
        }
        $('body').on('DOMMouseScroll mousewheel', function(e) {
            if ((e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) && window.mouseWheeledFired == undefined) {
                lanzaScroll();
            }
        });
        var clickedOnScrollbar = function(mouseX) {
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
    } catch (err) {
        _satellite.notify("fired " + tms_O.fnLaunch + " error: lanzaHuella() - " + err.stack);
    }
}
_satellite.getVar("setTMSFunctions");
