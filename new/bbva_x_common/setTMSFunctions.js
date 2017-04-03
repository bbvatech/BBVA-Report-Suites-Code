/**
 * Objeto para el manejor de los eventos
 * @type {Object}
 */
window.tms_O = {
    clase: { huella: "huella", clickEsp: "clickEsp", clickFun: "clickFun", compuesto: "compuesto" },
    funcion: { tms_track: "TMS Track", tms_funnel: "TMS Funnel" },
    fnLaunch: "",
    tipo: "",
    nombre: "",
    compuesto: {
        "qualifiedvisit": "qualifiedvisit",
        "app page visit": "app page visit",
        "app completed": "app completed",
        "app step 2": "app step 2",
        "app step 3": "app step 3",
        "app step 4": "app step 4",
        "app step 5": "app step 5",
        "app step 6": "app step 6",
        "app step 7": "app step 7",
        "app step 8": "app step 8",
        "app step 9": "app step 9",
        "app step 10": "app step 10"
    },
    huella: {
        "huellaavanzadaparteprivada": "huellaavanzadaparteprivada",
        "huellaavanzadapartepublica": "huellaavanzadapartepublica"
    },
    clickEsp: {
        "login": "login",
        "logout": "logout",
        "scrollcomplete": "scrollcomplete",
        "errorpage": "errorpage",
        "enlaceexterno": "enlaceexterno",
        "interno": "interno",
        "enlacedescaga": "enlacedescaga",
        "enlacedescarga": "enlacedescarga",
        "internalcampaignclick": "internalcampaignclick",
        "enviobuscador": "enviobuscador"
    },
    clickFun: {
        "app on click start": "app on click start",
        "app started": "app started"
    },
    ActualizaPrevPageDD: false,
    AppOnClickStart: false,
    AppPageVisit: false,
    /**
     * Establece en tipo y nombre del evento en el objeto
     * @param {string} evento, evento lanzado
     */
    setTipoEvento: function(evento) {
        try {
            //Inicializamos el tipo de evento
            tms_O.tipo = tms_O.nombre = tms_O.fnLaunch = "";
            //Seleccionamos el tipo de evento
            for (eV in tms_O.compuesto) {
                if (evento == eV) {
                    tms_O.tipo = tms_O.clase.compuesto;
                    tms_O.nombre = evento;
                    tms_O.fnLaunch = tms_O.funcion.tms_funnel;
                    break;
                }
            }
            if (tms_O.tipo == "") {
                for (eV in tms_O.clickEsp) {
                    if (evento == eV) {
                        tms_O.tipo = tms_O.clase.clickEsp;
                        tms_O.nombre = evento;
                        tms_O.fnLaunch = tms_O.funcion.tms_track;
                        break;
                    }
                }
            }
            if (tms_O.tipo == "") {
                for (eV in tms_O.clickFun) {
                    if (evento == eV) {
                        tms_O.tipo = tms_O.clase.clickFun;
                        tms_O.nombre = evento;
                        tms_O.fnLaunch = tms_O.funcion.tms_funnel;
                        break;
                    }
                }
            }
            if (tms_O.tipo == "") {
                for (eV in tms_O.huella) {
                    if (evento == eV) {
                        tms_O.tipo = tms_O.clase.huella;
                        tms_O.nombre = evento;
                        tms_O.fnLaunch = tms_O.funcion.tms_track;
                        break;
                    }
                }
            }
            if (tms_O.nombre == "") {
                window.localStorage.getItem("sdsat_debug") == "true" ? console.log("fired TMS: El evento no está registrado - " + evento) : "";
            }
        } catch (err) {
            window.localStorage.getItem("sdsat_debug") == "true" ? console.log("fired " + tms_O.fnLaunch + " error: setTipoEvento() - " + err.stack) : "";
        }
    },
    /**
     * Esta función retorna la serialización del producto para el evento App Page Visit
     * Previamente se tienen que haber definido el product.
     * @param  {object} dD, el dataLayer actualizado
     * @return {string} con el producto serializado.
     */
    serializacion_application: function(dD) {
        try {
            var appFN = ((dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.type + ":" + dD.application.application.name);
            if (appFN.length > 0) {
                var appID = "" + applicationIDs[appFN] + window.s.c_r("sessionID");
                return appID;
            }
        } catch (err) {
            window.localStorage.getItem("sdsat_debug") == "true" ? console.log("fired " + tms_O.fnLaunch + " error: serializacion_application() - " + err.stack) : "";
        }
    },
    /**
     * Esta función retorna la serialización del producto para el evento App Page Visit
     * Previamente se tienen que haber definido el product.
     * @param  {object} dD, el dataLayer actualizado
     * @return {string} con el producto serializado.
     */
    serializacion_product: function(dD) {
        try {
            if (dD.product.primaryCategory.length > 0) {
                var products = dD.product.primaryCategory;
                products += dD.product.productSubtype.length > 0 ? ":" + dD.product.productSubtype : ":";
                products += dD.product.productName.length > 0 ? ":" + dD.product.productName : ":";
                return (productIDs[products] + "" + window.s.c_r("sessionID"));
            }
        } catch (err) {
            window.localStorage.getItem("sdsat_debug") == "true" ? console.log("fired " + tms_O.fnLaunch + " error: serializacion_product() - " + err.stack) : "";
        }
    }

}

/**
 * Esta función se encagar de lanzar todos los eventos de carga de página cuando estamos en un funnel 
 * y los eventos de click que dan acceso al funnel y la primera interacion del usuario en el paso 1 del funnel.
 * Como estos eventos van asociados a un paso, solo hace falta indicar el paso que se quiere lanzar. El caso
 * especial es cuando también se pretende lanzar un "Qualified Visit", por ello hay que incluir un "true" 
 * como tercer parámetro. Cuando este parámetro no lo ponemos se supone que no se lanza el "Qualified Visit".
 * @param  {string} evento, nombre del evento a lanzar. 
 * @param  {object} aux, el dataLayer
 * @param  {boolean} qV, [parametro opcional], puede ir a true, false o omitirse. true para incluir 
 * los parametros de "Qualified Visit", en el resto de situaciones no se van a incluir estos datos
 */
window.tms_funnel = function(evento, aux, qV) {
    try {
        evento = evento.toLowerCase();
        var dD = window.fnClone(aux);
        //Establecemos las variables generales de huella Avanzada. Posteriormente se irán añadiendo más según
        //el tipo de evento que se lance.
        tms_O.setTipoEvento(evento);
        //Añadimos los datos a la huella si son necesarios
        variablesHuellaTMS(dD);
        //Vemos si el evento tiene que lanzar la huella o por el contrario es un evento asincrono registrado
        if ((qV || evento == tms_O.compuesto.qualifiedVisit) && tms_O.clase.compuesto == tms_O.tipo) {
            if (dD.product.primaryCategory.length > 0) {
                s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
            }
            s.linkTrackVars += "events,products";
            s.events = "event60,event39:" + tms_O.serializacion_product(dD);
            s.linkTrackEvents = "event60,event39";
            window.localStorage.getItem("sdsat_debug") == "true" ? console.log("SATELLITE fired %c" + tms_O.fnLaunch + ": Qualified Visit vars - " + s.products, "color:blue;background:#e5e5e5;", dD) : "";

        }
        //Eventos de carga de página en funnel
        if (tms_O.clase.compuesto == tms_O.tipo) {
            if (tms_O.compuesto["app page visit"] == evento) {
                // //====================================================================
                // //===================   PRIVADA  ==========================
                // //Creación de una copia del digitalData en memoria para el evento "App On Click Start".
                // //Cuando el evento se lanza por segunda vez en la misma sesión y situación, por la arquitectura de angular
                // //se empiezan a lanzar los eventos que desde local han introducido en el código y las reglas, que se ejecutan desde
                // //DTM, pasan a un segundo plano. Caso App On Click Start -> App Page Visit, se ejecuta la segunda vez
                // //App Page Visit -> App On Click Start, cogiendo los datos erroneos del dataLayer cuando el App On Click Start se lanza en
                // //segundo lugar.
                // //INI
                // dD = _satellite.getVar("digitalDataPrevPage");
                //vemos si ya se ha lanzado el evento de App Page Visit para establecer el digitalDataPrevPage
                if (tms_O.AppOnClickStart != undefined && tms_O.AppOnClickStart) {
                    tms_O.AppOnClickStart = false;
                    tms_O.ActualizaPrevPageDD = true;
                } else {
                    tms_O.AppPageVisit = true;
                }
                // //FIN
                // //====================================================================
                // //====================================================================

                s.eVar45 = s.prop45 = "" + dD.application.application.name + ":app page visit:" + dD.application.step;
                s.eVar46 = s.prop46 = (dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.type + ":" + dD.application.application.name;
                s.eVar48 = dD.application.currency;
                s.eVar49 = dD.application.fulfillmentModel;
                s.eVar52 = dD.application.offer;
                s.eVar53 = dD.user.segment.profile;
                if (dD.product.primaryCategory.length > 0) {
                    s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                }
                s.linkTrackVars += ",events,products,list1";
                if (s.events == undefined) {
                    s.linkTrackEvents = "event62,event41";
                    s.events = "event62,event41:" + tms_O.serializacion_application(dD);
                } else {
                    s.linkTrackEvents += ",event62,event41";
                    s.events += ",event62,event41:" + tms_O.serializacion_application(dD);
                }
                s.list1 = AppFlowSelectionList1(dD);
                window.localStorage.getItem("sdsat_debug") == "true" ? console.log("SATELLITE: fired %c" + tms_O.fnLaunch + ": App Page Visit vars - " + s.eVar46, "color:blue;background:#E5E5E5;", dD) : "";

                //App Flow Competion Time - Start
                window.getTimeToComplete('start', 'afct', 0);
            } else if (evento.search(/app step/gi) > -1) {
                var step = evento.substr(evento.length - 2).trim(); //;
                if (step != undefined && Number(step) != NaN) {
                    s.linkTrackVars += ",events,products,list1";
                    s.linkTrackEvents = "event" + (Number(step) + 62) + ",event" + (Number(step) + 41);
                    s.events = "event" + (Number(step) + 62) + ",event" + (Number(step) + 41) + ":" + tms_O.serializacion_application(dD);
                    s.eVar45 = s.prop45 = "" + dD.application.application.name + ":app step " + step + ":" + dD.application.step;
                    s.eVar46 = s.prop46 = (dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.type + ":" + digitalData.application.application.name;
                    s.eVar48 = dD.application.currency;
                    s.eVar49 = dD.application.fulfillmentModel;
                    s.eVar52 = dD.application.offer;
                    s.eVar53 = dD.user.segment.profile;
                    s.eVar56 = dD.application.programTypeHired;
                    s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                    s.list1 = AppFlowSelectionList1(dD);
                    window.localStorage.getItem("sdsat_debug") == "true" ? console.log("SATELLITE: fired %c" + tms_O.fnLaunch + ": App Step " + step + " vars - " + s.eVar46, "color:blue;background:#E5E5E5;", dD) : "";
                }
            } else if (tms_O.compuesto["app completed"] == evento) {
                //App Completed
                //Funciones necesarias
                s.events = "";
                s.eVar50 = window.getTimeToComplete('stop', 'afct', 0);
                if (window.s.c_r('sttc') != undefined && window.s.c_r('sttc').length > 0) {
                    var cookieSttc = window.s.c_r('sttc');
                    s.eVar51 = window.getTimeToComplete('stop', 'sttc', 0);
                    window.TMS_CookieWrite('sttc', cookieSttc, 0);
                }
                if (s.events == undefined) {
                    s.events = "";
                }
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
                s.linkTrackEvents += "event76,event55";
                s.events += "event76,event55:" + tms_O.serializacion_application(dD);
                s.eVar45 = s.prop45 = "" + dD.application.application.name + ":app completed:" + dD.application.step;
                s.eVar46 = s.prop46 = (dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.type + ":" + digitalData.application.application.name;
                s.eVar48 = dD.application.currency;
                s.eVar49 = dD.application.fulfillmentModel;
                s.eVar52 = dD.application.offer;
                s.eVar53 = dD.user.segment.profile;
                s.eVar54 = dD.application.operationNumber;
                s.eVar56 = dD.application.programTypeHired;

                if (dD.product.primaryCategory.length > 0) {
                    s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
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
                }
                s.linkTrackVars += ",events,products,list1";
                s.list1 = AppFlowSelectionList1(dD);
                window.localStorage.getItem("sdsat_debug") == "true" ? console.log("SATELLITE: fired %c" + tms_O.fnLaunch + ": App Completed vars - " + s.eVar46, "color:blue;background:#E5E5E5;", dD) : "";
            }
            window.lanzaHuella(dD);
        }
        if (tms_O.clase.clickFun == tms_O.tipo) {
            //Eventos de botón en el funnel
            if (evento == tms_O.clickFun["app on click start"]) {
                // //====================================================================
                // //===================   PRIVADA  ==========================
                // //Creación de una copia del digitalData en memoria para el evento "App On Click Start".
                // //Cuando el evento se lanza por segunda vez en la misma sesión y situación, por la arquitectura de angular
                // //se empiezan a lanzar los eventos que desde local han introducido en el código y las reglas, que se ejecutan desde
                // //DTM, pasan a un segundo plano. Caso App On Click Start -> App Page Visit, se ejecuta la segunda vez
                // //App Page Visit -> App On Click Start, cogiendo los datos erroneos del dataLayer cuando el App On Click Start se lanza en
                // //segundo lugar.
                // //INI
                // dD = _satellite.getVar("digitalDataPrevPage");
                //vemos si ya se ha lanzado el evento de App Page Visit para establecer el digitalDataPrevPage
                if (tms_O.AppPageVisit != undefined && tms_O.AppPageVisit) {
                    tms_O.AppPageVisit = false;
                    tms_O.ActualizaPrevPageDD = true;
                } else {
                    tms_O.AppOnClickStart = true;
                }
                // //FIN
                // //====================================================================
                // //====================================================================
                s.eVar45 = s.prop45 = (dD.application.application.name + ":" + dD.application.step);
                s.eVar46 = s.prop46 = ((dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.type + ":" + dD.application.application.name);
                s.eVar49 = dD.application.fulfillmentModel;
                s.eVar52 = dD.application.offer;
                s.events = "event61,event40:" + tms_O.serializacion_application(dD);
                s.linkTrackEvents = "event61,event40";
                s.linkTrackVars += ",events,products,list1";


                if (dD.product.primaryCategory.length > 0) {
                    s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                }
                s.list1 = AppFlowSelectionList1(dD);
                setLinkTrackVars();
                s.tl(this, "o", s.eVar45);
                if (tms_O.ActualizaPrevPageDD) {
                    updateDigitalDataPrevPage(dD);
                }
                window.localStorage.getItem("sdsat_debug") == "true" ? console.log("SATELLITE: fired %c" + tms_O.fnLaunch + ": App On Click Start - " + s.eVar46, "color:blue;background:#ccc;", dD) : "";
                tms_O.tipo = "";
                s.clearVars();
            } else if (evento == tms_O.clickFun["app started"] &&
                _satellite.getVar('appStarted' + tms_O.serializacion_application(dD)) == undefined) {
                s.eVar1 = _satellite.getVar("pageNameAppStart");
                s.eVar45 = s.prop45 = (dD.application.application.name + ":" + dD.application.step);
                s.eVar46 = s.prop46 = ((dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.type + ":" + dD.application.application.name);
                s.eVar48 = dD.application.currency;
                s.eVar49 = dD.application.fulfillmentModel;
                s.eVar52 = dD.application.offer;
                s.eVar53 = dD.user.segment.profile;
                s.events = "event63,event42:" + tms_O.serializacion_application(dD);
                s.linkTrackEvents = ",event63,event42";
                if (dD.product.primaryCategory.length > 0) {
                    s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                }
                s.linkTrackVars += ",events,products,list1";
                s.list1 = AppFlowSelectionList1(dD);
                setLinkTrackVars();
                _satellite.notify("APP STARTED: CHANNEL -> " + s.channel);
                _satellite.notify("APP STARTED: LINKTRACKVARS -> " + s.linkTrackVars);
                s.tl(this, "o", s.eVar45);
                window.localStorage.getItem("sdsat_debug") == "true" ? console.log("SATELLITE: fired %c" + tms_O.fnLaunch + ": App Started - " + s.eVar46, "color:blue;background:#ccc;", dD) : "";
                tms_O.tipo = "";
                s.clearVars();
                _satellite.setVar('appStarted' + tms_O.serializacion_application(dD), true)
            }
        }
        dD = undefined;
    } catch (err) {
        window.localStorage.getItem("sdsat_debug") == "true" ? console.log("fired " + tms_O.fnLaunch + " error: tms_funnel() - " + err.stack) : "";
        s.eVar99 = "fired " + tms_O.fnLaunch + " error: tms_funnel() - " + err.stack;
    }
}

/**
 * Función para lanzar eventos de etiquetado especifico y las huellas que no pertenecen a ningún funnel.
 * @param  {[type]} evento, el evento que se pretende lanzar. Estan registrados los siguientes eventos:
 * login - logout - errorPage - enlaceExterno - EnlaceDescaga - internalCampaignClick - envio buscador
 * scroll-complete 
 * @param  {object} aux, el dataLayer
 */
window.tms_track = function(evento, aux, qV) {
    try {
        //Clonamos la variable que nos pasan por parámetro, para no modificarla. Esta variable es el dataLayer y javascript lo
        //pasa por referencia en vez de por valor. Las alteraciones en el dataLayer se verán reflejadas en original. Con la clonación 
        //nos aseguramos que trabajamos con una copia.
        evento = evento.toLowerCase();
        var dD = window.fnClone(aux);
        //Vemos si el evento tiene que lanzar la huella o por el contrario es un evento asincrono registrado
        tms_O.setTipoEvento(evento);
        //Establecemos las variables generales de huella Avanzada. Posteriormente se irán añadiendo más según
        //el tipo de evento que se lance.
        variablesHuellaTMS(dD);
        if (tms_O.clase.huella == tms_O.tipo) {
            if (dD.product.primaryCategory.length > 0) {
                s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                s.linkTrackVars += ",products";
            }
            window.lanzaHuella(dD);
        } else if (tms_O.clase.clickEsp == tms_O.tipo) {
            var nombreEnlace;
            switch (evento) {
                case tms_O.clickEsp.login:
                    s.events = s.linkTrackEvents = "event12";
                    nombreEnlace = "login";
                    window.getTimeToComplete('start', 'sttc', 0);
                    break;
                case tms_O.clickEsp.logout:
                    s.events = s.linkTrackEvents = "event8";
                    nombreEnlace = "sign out";
                    break;
                case tms_O.clickEsp.errorpage:
                    s.events = s.linkTrackEvents = "event33";
                    nombreEnlace = "mensaje error:" + dD.page.pageInfo.errorPage;
                    s.eVar33 = nombreEnlace;
                    break;

                    //Falta por definir de donde se cogen los datos de url y name
                    // case "enlaceExterno":
                    //     s.events = s.linkTrackEvents = "event6";
                    //     s.eVar6 = "externo;" + auxDD.page.pageActivity.download.name + ";" + auxDD.page.download.pageName;
                    //     nombreEnlace = auxDD.page.pageActivity.extLink.url;
                    //     break;
                case tms_O.clickEsp.enlacedescaga:
                case tms_O.clickEsp.enlacedescarga:
                    s.events = s.linkTrackEvents = "event6";
                    //La estructura envidada en este evento es del tipo:
                    //var pageActivity = {
                    //     download: {
                    //         name: "nombre del archivo de descarga",
                    //         url: "http://...........nombre.pdf"
                    //     }
                    // }
                    // Por ello se incorpora a la variable clonada del digitalData para evitar errores en el funcionamiento.
                    var aux2 = fnClone(window.digitalData);
                    aux2.page.pageActivity.download = dD.download;
                    dD = aux2;
                    aux2 = undefined;
                    s.eVar6 = "descarga;" + dD.page.pageActivity.download.name + ";" + dD.page.pageInfo.sysEnv + ":" + dD.page.pageInfo.pageName;
                    nombreEnlace = dD.page.pageActivity.download.url;
                    break;
                case tms_O.clickEsp.interno:
                    s.events = s.linkTrackEvents = "event6";
                    s.eVar6 = "interno;" + dD.page.pageActivity.internalClick.name + ";" + dD.page.pageInfo.sysEnv + ":" + dD.page.pageInfo.pageName;
                    nombreEnlace = dD.page.pageActivity.internalClick.name;
                    break;
                case tms_O.clickEsp.internalcampaignclick:
                    s.list2 = dD.internalCampaign.event.eventInfo.siteActionName;
                    s.eVar35 = dD.internalCampaign.event.eventInfo.siteActionName;
                    s.events = s.linkTrackEvents = "event36";
                    s.linkTrackVars += ",list2"
                    nombreEnlace = "internal campaign click-throughs";
                    break;
                case tms_O.clickEsp.enviobuscador:
                    s.eVar10 = "+1";
                    s.eVar11 = s.prop11 = dD.page.pageActivity.search.onSiteSearchTerm;
                    s.eVar65 = dD.page.pageActivity.search.onSiteSearchResults;
                    s.linkTrackEvents = (parseInt(s.eVar65) > 0 ? "event11" : "event10") + ",event9"
                    s.events = (parseInt(s.eVar65) > 0 ? "event11" : "event10") + ",event9=" + (parseInt(s.eVar65) > 0 ? s.eVar65 : "0");
                    nombreEnlace = (parseInt(s.eVar65) > 0 ? "buscador:" : "buscador nule:") + s.eVar11;
                    break;
                case tms_O.clickEsp.scrollcomplete:
                    s.events = s.linkTrackEvents = "event14";
                    nombreEnlace = "scroll completo";
                    break;
            }
            //Establecemos las eVars y props que van a enviarse en el evento.
            setLinkTrackVars();
            s.tl(this, evento == tms_O.clickEsp.enlacedescaga ? "d" : evento == tms_O.clickEsp.enlaceexterno ? "e" : "o", formatearTexto(nombreEnlace));
            window.localStorage.getItem("sdsat_debug") == "true" ? console.log("SATELLITE: fired %c" + tms_O.fnLaunch + ": evento s.tl() " + evento.toUpperCase(), "color:#D94800;background:#ccc;", dD) : "";

            //Eliminamos la variable clonada
            dD = undefined;
            tms_O.tipo = "";
            s.clearVars();
        }
    } catch (err) {
        window.localStorage.getItem("sdsat_debug") == "true" ? console.log("fired " + tms_O.fnLaunch + " error: tms_track() - " + err.stack) : "";
        s.eVar99 = "fired " + tms_O.fnLaunch + " error: tms_funnel() - " + err.stack;
    }
}
