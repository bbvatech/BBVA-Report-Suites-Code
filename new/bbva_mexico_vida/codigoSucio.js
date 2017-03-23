/**
 * Objeto para el manejor de los eventos
 * @type {Object}
 */
window.tms_O = {
    clase: { huella: "huella", clickEsp: "clickEsp", clickFun: "clickFun", compuesto: "compuesto" },
    tipo: "",
    nombre: "",
    compuesto: {
        qualifiedVisit: "qualifiedVisit",
        "App Page Visit": "App Page Visit",
        "App Completed": "App Completed",
        "App Step 1": "App Step 1",
        "App Step 2": "App Step 2",
        "App Step 3": "App Step 3",
        "App Step 4": "App Step 4",
        "App Step 5": "App Step 5",
        "App Step 6": "App Step 6",
        "App Step 7": "App Step 7",
        "App Step 8": "App Step 8",
        "App Step 9": "App Step 9",
        "App Step 10": "App Step 10"
    },
    huella: {
        "huellaAvanzadaPartePrivada": "huellaAvanzadaPartePrivada",
        "huellaAvanzadaPartePublica": "huellaAvanzadaPartePublica"
    },
    clickEsp: {
        "login": "login",
        "logout": "logout",
        "scroll-complete": "scroll-complete",
        "errorPage": "errorPage",
        "enlaceExterno": "enlaceExterno",
        "enlaceDescarga": "enlaceDescarga",
        "internalCampaignClick": "internalCampaignClick",
        "envio buscador": "envio buscador"
    },
    clickFun: {
        "App On Click Start": "App On Click Start",
        "App Started": "App Started"
    },
    /**
     * Establece en tipo y nombre del evento en el objeto
     * @param {string} evento, evento lanzado
     */
    setTipoEvento: function(evento) {
        //Inicializamos el tipo de evento
        tms_O.tipo = tms_O.nombre = "";
        //Seleccionamos el tipo de evento
        for (eV in tms_O.compuesto) {
            if (evento == eV) {
                tms_O.tipo = tms_O.clase.compuesto;
                tms_O.nombre = evento;
                break;
            }
        }
        if (tms_O.tipo == "") {
            for (eV in tms_O.clickEsp) {
                if (evento == eV) {
                    tms_O.tipo = tms_O.clase.clickEsp;
                    tms_O.nombre = evento;
                    break;
                }
            }
        }
        if (tms_O.tipo == "") {
            for (eV in tms_O.clickFun) {
                if (evento == eV) {
                    tms_O.tipo = tms_O.clase.clickFun;
                    tms_O.nombre = evento;
                    break;
                }
            }
        }
        if (tms_O.tipo == "") {
            for (eV in tms_O.huella) {
                if (evento == eV) {
                    tms_O.tipo = tms_O.clase.huella;
                    tms_O.nombre = evento;
                    break;
                }
            }
        }
        if (tms_O.nombre == "") _satellite.notify("fired felix: El evento no está registrado");
    },
    /**
     * Esta función retorna la serialización del producto para el evento App Page Visit
     * Previamente se tienen que haber definido el product.
     * @param  {object} dD, el dataLayer actualizado
     * @return {string} con el producto serializado.
     */
    serializacion_application: function(dD) {
        var appFN = ((dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.type + ":" + dD.application.application.name);
        if (appFN.length > 0) {
            var appID = "" + applicationIDs[appFN] + _satellite.readCookie("sessionID");
            return appID;
        }
    },
    /**
     * Esta función retorna la serialización del producto para el evento App Page Visit
     * Previamente se tienen que haber definido el product.
     * @param  {object} dD, el dataLayer actualizado
     * @return {string} con el producto serializado.
     */
    serializacion_product: function(dD) {
        if (dD.product.primaryCategory.length > 0) {
            var products = dD.product.primaryCategory;
            products += dD.product.productSubtype.length > 0 ? ":" + dD.product.productSubtype : "";
            products += dD.product.productName.length > 0 ? ":" + dD.product.productName : "";
            return (productIDs[products] + "" + _satellite.readCookie("sessionID"));
        }
    }

}

/**
 * Esta función redondea el numero y eliminando los decimales
 * @param  {string} valor, el número que queremos transformar
 * @return {string} con el número redondeado
 */
window.quitarPuntoCero = function(valor) {
    if (valor.length > 0)
        valor = "" + parseInt(valor);
    return valor
}

/**
 * Devuelve la lista 1 de elementos informados en el dataLayer, en formato ingles y eliminando la ,
 * @param {Object} dD, el objeto dataLayer.
 */
window.AppFlowSelectionList1 = function(dD) {
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
}

/**
 * Establece todas las variables para la huella Avanzada en la variable "s" de DTM
 * @param  {object} dD, el data Layer
 */
window.variablesHuellaTMS = function(dD) {
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
    _satellite.notify("fired felix: huella Avanzada");
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

}

/**
 * Esta función se encagar de lanzar todos los eventos de carga de página cuando estamos en un funnel 
 * y los eventos de click que dan acceso al funnel y la primera interacion del usuario en el paso 1 del funnel.
 * Como estos eventos van asociados a un paso, solo hace falta indicar el paso que se quiere lanzar. El caso
 * especial es cuando también se pretende lanzar un "Qualified Visit", por ello hay que incluir un "true" 
 * como tercer parámetro. Cuando este parámetro no lo ponemos se supone que no se lanza el "Qualified Visit".
 * @param  {string} evento, nombre del evento a lanzar. 
 * @param  {object} dD, el dataLayer
 * @param  {boolean} qV, [parametro opcional], puede ir a true, false o omitirse. true para incluir 
 * los parametros de "Qualified Visit", en el resto de situaciones no se van a incluir estos datos
 */
window.tms_funnel = function(evento, dD, qV) {
    variablesHuellaTMS(dD);
    //Vemos si el evento tiene que lanzar la huella o por el contrario es un evento asincrono registrado
    tms_O.setTipoEvento(evento);
    //Añadimos los datos a la huella si son necesarios 
    if ((qV || evento == "qualifiedVisit") && tms_O.clase.compuesto == tms_O.tipo) {
        s.linkTrackVars = "events,products";
        s.events = "event60,event39:" + tms_O.serializacion_product(dD);
        s.linkTrackEvents = "event60,event39";
        _satellite.notify("fired felix: Qualified Visit")

    }
    //Eventos de carga de página en funnel
    if (tms_O.clase.compuesto == tms_O.tipo) {
        if ("App Page Visit" == evento) {
            s.eVar45 = s.prop45 = "" + dD.application.application.name + ":app page visit:" + dD.application.step;
            s.eVar46 = s.prop46 = (dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.name + ":" + digitalData.application.application.type;
            s.eVar48 = dD.application.currency;
            s.eVar49 = dD.application.fulfillmentModel;
            s.eVar53 = dD.user.segment.profile;
            s.linkTrackVars += ",events,products,eVar45,prop45,eVar46,prop46,eVar48,eVar49,eVar53,list1";
            s.linkTrackEvents += ",event62,event41";
            s.events += ",event62,event41:" + tms_O.serializacion_application(dD);
            s.list1 = AppFlowSelectionList1(dD);
            _satellite.notify("fired felix: App Page Visit");
            //App Flow Competion Time - Start
            window.getTimeToComplete('start', 'afct', 0);

        } else if (evento.search(/App Step/gi) > -1) {
            var step = evento.substr(evento.length - 2).trim(); //;
            if (step != undefined && Number(step) != NaN) {
                s.linkTrackVars += ",events,products,eVar45,prop45,eVar46,prop46,eVar48,eVar49,eVar53,eVar56,list1";
                s.linkTrackEvents = "event" + (Number(step) + 62) + ",event" + (Number(step) + 41);
                s.events = "event" + (Number(step) + 62) + ",event" + (Number(step) + 41) + ":" + tms_O.serializacion_application(dD);
                s.eVar45 = s.prop45 = "" + dD.application.application.name + ":app step " + step + ":" + dD.application.step;
                s.eVar46 = s.prop46 = (dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.name + ":" + digitalData.application.application.type;
                s.eVar48 = dD.application.currency;
                s.eVar49 = dD.application.fulfillmentModel;
                s.eVar53 = dD.user.segment.profile;
                s.eVar56 = dD.application.programTypeHired;
                s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                s.linkTrackVars += ",products";
                s.list1 = AppFlowSelectionList1(dD);
                _satellite.notify("fired felix: App Step " + step);

            }
        } else if ("App Completed" == evento) {
            //App Completed
            //Funciones necesarias
            s.events = "";
            s.eVar50 = window.getTimeToComplete('stop', 'afct', 0);
            s.linkTrackVars = "eVar50,";
            if (_satellite.readCookie('sttc') != undefined && _satellite.readCookie('sttc').length > 0) {
                var cookieSttc = _satellite.readCookie('sttc');
                s.eVar51 = window.getTimeToComplete('stop', 'sttc', 0);
                s.linkTrackVars += "eVar51,";
                _satellite.setCookie('sttc', cookieSttc, 0);
            }
            if (s.events == undefined)
                s.events = "";
            var appState = dD.application.state;
            if (appState == "contratado" || appState == "aprobado") {
                s.linkTrackEvents += "event57:" + tms_O.serializacion_application(dD) + ",";
                s.events += "event57:" + tms_O.serializacion_application(dD) + ",";
                if (appState == "contratado") {
                    s.linkTrackEvents += "event58:" + tms_O.serializacion_application(dD) + ",";
                    s.events += "event58:" + tms_O.serializacion_application(dD) + ",";
                }
            }
            if (appState == "rechazado") {
                s.linkTrackEvents += "event56" + tms_O.serializacion_application(dD) + ",";
                s.events += "event56:" + tms_O.serializacion_application(dD) + ",";
            }
            if (appState == "en revision") {
                s.linkTrackEvents += "event151:" + tms_O.serializacion_application(dD) + ",";
                s.events += "event151:" + tms_O.serializacion_application(dD) + ",";
            }

            s.linkTrackVars += "events,products,eVar33,eVar45,prop45,eVar46,prop46,eVar47,eVar48,eVar49,eVar53,eVar54,eVar56,list1";
            s.linkTrackEvents += "event76,event55:" + tms_O.serializacion_application(dD);
            s.events += "event76,event55:" + tms_O.serializacion_product(dD);
            s.eVar45 = s.prop45 = "" + dD.application.application.name + ":app completed:" + dD.application.step;
            s.eVar46 = s.prop46 = (dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.name + ":" + digitalData.application.application.type;
            s.eVar48 = dD.application.currency;
            s.eVar49 = dD.application.fulfillmentModel;
            s.eVar53 = dD.user.segment.profile;
            s.eVar54 = dD.application.operationNumber;
            s.eVar56 = dD.application.programTypeHired;

            if (dD.product.primaryCategory.length > 0) {
                s.products = ";" + dD.product.primaryCategory.length + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                s.linkTrackVars += ",products";
            }
            if (dD.application.amount != "") {
                s.products += "event91=" + dD.application.amount;
                s.events += ",event91";
                if (dD.application.paymentAmount != "")
                    s.products += "|";
            }
            if (dD.application.paymentAmount != "") {
                s.products += "event92=" + dD.application.paymentAmount;
                s.events += ",event92";
            }
            s.products += ";";
            s.list1 = AppFlowSelectionList1(dD);
            _satellite.notify("fired felix: App Completed")
        }
        window.lanzaHuella(dD);
    }
    if (tms_O.clase.clickFun == tms_O.tipo) {
        //Eventos de botón en el funnel
        if (evento == "App On Click Start") {
            s.eVar1 = _satellite.getVar("pageNameAppStart");
            s.eVar45 = s.prop45 = (dD.application.application.name + ":" + dD.application.step);
            s.eVar46 = s.prop46 = ((dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.type + ":" + dD.application.application.name);
            s.eVar49 = dD.application.fulfillmentModel;
            s.events = "event61,event40:" + tms_O.serializacion_application(dD);
            s.linkTrackEvents = "event61,event40";
            s.linkTrackVars += ",eVar45,eVar46,prop45,prop46,eVar49,events,products,list1";
            s.list1 = AppFlowSelectionList1(dD);
            s.tl(this, "o", s.eVar45);
            _satellite.notify("fired felix: App On Click Start");
            s.clearVars();
        } else if (evento == "App Started") {
            s.eVar1 = _satellite.getVar("pageNameAppStart");
            s.eVar45 = s.prop45 = (dD.application.application.name + ":" + dD.application.step);
            s.eVar46 = s.prop46 = ((dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.type + ":" + dD.application.application.name);
            s.eVar48 = dD.application.currency;
            s.eVar49 = dD.application.fulfillmentModel;
            s.eVar53 = dD.user.segment.profile;
            s.events = "event63,event42:" + tms_O.serializacion_application(dD);
            s.linkTrackEvents = ",event63,event42";
            s.linkTrackVars += ",eVar45,eVar46,prop45,prop46,eVar49,eVar53,events,products,list1";
            s.list1 = AppFlowSelectionList1(dD);
            s.tl(this, "o", s.eVar45);
            _satellite.notify("fired felix: App Started");
            s.clearVars();
        }
    }
}

/**
 * Función para lanzar eventos de etiquetado especifico y las huellas que no pertenecen a ningún funnel.
 * @param  {[type]} evento, el evento que se pretende lanzar. Estan registrados los siguientes eventos:
 * login - logout - errorPage - enlaceExterno - enlaceDescarga - internalCampaignClick - envio buscador
 * scroll-complete 
 * @param  {object} dD, el dataLayer
 */
window.tms_track = function(evento, dD) {
    //Vemos si el evento tiene que lanzar la huella o por el contrario es un evento asincrono registrado
    tms_O.setTipoEvento(evento);
    if (tms_O.clase.huella == tms_O.tipo) {
        window.lanzaHuella(dD);
    } else if (tms_O.clase.clickEsp == tms_O.tipo) {
        var nombreEnlace;
        switch (evento) {
            case "login":
                s.events = s.linkTrackEvents = "event12";
                nombreEnlace = "login";
                window.getTimeToComplete('start', 'sttc', 0);
                break;
            case "logout":
                s.events = s.linkTrackEvents = "event8";
                nombreEnlace = "sign out";
                break;
            case "errorPage":
                s.events = s.linkTrackEvents = "";
                nombreEnlace = "";
                break;

                //Falta por definir de donde se cogen los datos de url y name
                // case "enlaceExterno":
                //     s.events = s.linkTrackEvents = "event6";
                //     s.eVar6 = "enlace externo;" + dD.page.pageActivity.download.name + ";" + dD.page.download.pageName + ";";
                //     nombreEnlace = dD.page.pageActivity.extLink.url;
                //     break;
                // case "enlaceDescarga":
                //     s.events = s.linkTrackEvents = "event6";
                //     s.eVar6 = "enlace descarga;" + dD.page.pageActivity.extLink.name + ";" + dD.page.pageInfo.pageName + ";";
                //     nombreEnlace = dD.page.pageActivity.extLink.url;
                //     break;
            case "internalCampaignClick":
                s.list2 = dD.internalCampaign.event.eventInfo.siteActionName;
                s.eVar35 = dD.internalCampaign.event.eventInfo.siteActionName;
                s.events = s.linkTrackEvents = "event36";
                s.linkTrackVars += ",eVar35,list2"
                nombreEnlace = "internal campaign click-throughs";
                break;
            case "envio buscador":
                s.eVar10 = "+1";
                s.eVar11 = s.prop11 = dD.page.pageActivity.search.onSiteSearchTerm;
                s.eVar65 = dD.page.pageActivity.search.onSiteSearchResults;
                s.linkTrackEvents = (parseInt(s.eVar65) > 0 ? "event11" : "event10") + ",event9"
                s.events = (parseInt(s.eVar65) > 0 ? "event11" : "event10") + ",event9=" + (parseInt(s.eVar65) > 0 ? s.eVar65 : "0");
                nombreEnlace = (parseInt(s.eVar65) > 0 ? "buscador:" : "buscador nule:") + s.eVar11;
                break;
            case "scroll-complete":
                s.events = "event14";
                s.linkTrackEvents = "event14";
                nombreEnlace = "scroll completo";
                break;
        }
        variablesHuellaTMS(dD);
        s.tl(this, evento == "enlaceDescarga" ? "d" : evento == "enlaceExterno" ? "e" : "o", nombreEnlace);
        s.clearVars();
    }
}
