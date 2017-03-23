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
        "qualifiedVisit": "qualifiedVisit",
        "App Page Visit": "App Page Visit",
        "App Completed": "App Completed",
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
        "HuellaAvanzadaPartePrivada": "huellaAvanzadaPartePrivada",
        "huellaAvanzadaPartePublica": "huellaAvanzadaPartePublica"
    },
    clickEsp: {
        "LogIn": "LogIn",
        "LogOut": "LogOut",
        "ScrollComplete": "ScrollComplete",
        "ErrorPage": "ErrorPage",
        "EnlaceExterno": "EnlaceExterno",
        "EnlaceDescaga": "EnlaceDescaga",
        "InternalCampaignClick": "InternalCampaignClick",
        "EnvioBuscador": "EnvioBuscador"
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
            if (tms_O.nombre == "") _satellite.notify("fired TMS: El evento no está registrado");
        } catch (err) {
            _satellite.notify("fired " + tms_O.fnLaunch + " error: setTipoEvento() - " + err.stack);
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
                var appID = "" + applicationIDs[appFN] + _satellite.readCookie("sessionID");
                return appID;
            }
        } catch (err) {
            _satellite.notify("fired " + tms_O.fnLaunch + " error: serializacion_application() - " + err.stack);
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
                products += dD.product.productSubtype.length > 0 ? ":" + dD.product.productSubtype : "";
                products += dD.product.productName.length > 0 ? ":" + dD.product.productName : "";
                return (productIDs[products] + "" + _satellite.readCookie("sessionID"));
            }
        } catch (err) {
            _satellite.notify("fired " + tms_O.fnLaunch + " error: serializacion_product() - " + err.stack);
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
        var dD = window.fnClone(aux);
        variablesHuellaTMS(dD);
        //Vemos si el evento tiene que lanzar la huella o por el contrario es un evento asincrono registrado
        tms_O.setTipoEvento(evento);
        //Añadimos los datos a la huella si son necesarios
        if ((qV || evento == "qualifiedVisit") && tms_O.clase.compuesto == tms_O.tipo) {
            if (dD.product.primaryCategory.length > 0) {
                s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
            }
            s.linkTrackVars = "events,products";
            s.events = "event60,event39:" + tms_O.serializacion_product(dD);
            s.linkTrackEvents = "event60,event39";
            _satellite.notify("fired " + tms_O.fnLaunch + ": Qualified Visit");
        }
        //Eventos de carga de página en funnel
        if (tms_O.clase.compuesto == tms_O.tipo) {
            if ("App Page Visit" == evento) {
                s.eVar45 = s.prop45 = "" + dD.application.application.name + ":app page visit:" + dD.application.step;
                s.eVar46 = s.prop46 = (dD.application.application.name.length == 0 || dD.application.application.type.length == 0) ? "" : dD.application.application.name + ":" + digitalData.application.application.type;
                s.eVar48 = dD.application.currency;
                s.eVar49 = dD.application.fulfillmentModel;
                s.eVar53 = dD.user.segment.profile;
                if (dD.product.primaryCategory.length > 0) {
                    s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                }
                s.linkTrackVars += ",events,products,eVar45,prop45,eVar46,prop46,eVar48,eVar49,eVar53,list1";
                s.linkTrackEvents += ",event62,event41";
                s.events += ",event62,event41:" + tms_O.serializacion_application(dD);
                s.list1 = AppFlowSelectionList1(dD);
                _satellite.notify("fired " + tms_O.fnLaunch + ": App Page Visit");
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
                    _satellite.notify("fired " + tms_O.fnLaunch + ": App Step " + step);

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
                    s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                    s.linkTrackVars += ",products";
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
                s.list1 = AppFlowSelectionList1(dD);
                _satellite.notify("fired " + tms_O.fnLaunch + ": App Completed")
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
                if (dD.product.primaryCategory.length > 0) {
                    s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                }
                s.list1 = AppFlowSelectionList1(dD);
                s.tl(this, "o", s.eVar45);
                _satellite.notify("fired " + tms_O.fnLaunch + ": App On Click Start");
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
                if (dD.product.primaryCategory.length > 0) {
                    s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
                }
                s.linkTrackVars += ",eVar45,eVar46,prop45,prop46,eVar49,eVar53,events,products,list1";
                s.list1 = AppFlowSelectionList1(dD);
                s.tl(this, "o", s.eVar45);
                _satellite.notify("fired " + tms_O.fnLaunch + ": App Started");
                s.clearVars();
            }
        }
        dD = undefined;
    } catch (err) {
        _satellite.notify("fired " + tms_O.fnLaunch + " error: tms_funnel() - " + err.stack);
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
        var dD = window.fnClone(aux);
        //Vemos si el evento tiene que lanzar la huella o por el contrario es un evento asincrono registrado
        tms_O.setTipoEvento(evento);
        if (tms_O.clase.huella == tms_O.tipo) {
            if (dD.product.primaryCategory.length > 0) {
                s.products = ";" + dD.product.primaryCategory + ":" + dD.product.productSubtype + ":" + dD.product.productName + ";;;";
            }
            s.linkTrackVars += ",products";
            window.lanzaHuella(dD);
        } else if (tms_O.clase.clickEsp == tms_O.tipo) {
            var nombreEnlace;
            switch (evento) {
                case "LogIn":
                    s.events = s.linkTrackEvents = "event12";
                    nombreEnlace = "login";
                    window.getTimeToComplete('start', 'sttc', 0);
                    break;
                case "LogOut":
                    s.events = s.linkTrackEvents = "event8";
                    nombreEnlace = "sign out";
                    break;
                case "ErrorPage":
                    s.events = s.linkTrackEvents = "";
                    nombreEnlace = "";
                    break;

                    //Falta por definir de donde se cogen los datos de url y name
                    // case "enlaceExterno":
                    //     s.events = s.linkTrackEvents = "event6";
                    //     s.eVar6 = "enlace externo;" + auxDD.page.pageActivity.download.name + ";" + auxDD.page.download.pageName + ";";
                    //     nombreEnlace = auxDD.page.pageActivity.extLink.url;
                    //     break;
                case "EnlaceDescaga":
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
                    s.eVar6 = "enlace descarga;" + dD.page.pageActivity.download.name + ";" + dD.page.pageInfo.pageName + ";";
                    nombreEnlace = dD.page.pageActivity.download.url;
                    break;
                case "InternalCampaignClick":
                    s.list2 = dD.internalCampaign.event.eventInfo.siteActionName;
                    s.eVar35 = dD.internalCampaign.event.eventInfo.siteActionName;
                    s.events = s.linkTrackEvents = "event36";
                    s.linkTrackVars += ",eVar35,list2"
                    nombreEnlace = "internal campaign click-throughs";
                    break;
                case "EnvioBuscador":
                    s.eVar10 = "+1";
                    s.eVar11 = s.prop11 = dD.page.pageActivity.search.onSiteSearchTerm;
                    s.eVar65 = dD.page.pageActivity.search.onSiteSearchResults;
                    s.linkTrackEvents = (parseInt(s.eVar65) > 0 ? "event11" : "event10") + ",event9"
                    s.events = (parseInt(s.eVar65) > 0 ? "event11" : "event10") + ",event9=" + (parseInt(s.eVar65) > 0 ? s.eVar65 : "0");
                    nombreEnlace = (parseInt(s.eVar65) > 0 ? "buscador:" : "buscador nule:") + s.eVar11;
                    break;
                case "ScrollComplete":
                    s.events = "event14";
                    s.linkTrackEvents = "event14";
                    nombreEnlace = "scroll completo";
                    break;
            }
            variablesHuellaTMS(dD);
            s.tl(this, evento == "EnlaceDescaga" ? "d" : evento == "EnlaceExterno" ? "e" : "o", nombreEnlace);
            _satellite.notify("fired " + tms_O.fnLaunch + ": evento s.tl() " + evento);
            //Eliminamos la variable clonada
            dD = undefined;
            s.clearVars();
        }
    } catch (err) {
        _satellite.notify("fired " + tms_O.fnLaunch + " error: tms_track() - " + err.stack);
    }
}
