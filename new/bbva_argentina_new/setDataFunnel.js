// EVENTOS APP ON CLICK START
/**
 * Estructura para manejar los eventos "App On Click Start" en la SPA de Argentina Privada.
 * @type {Object} dataFunnel, con toda la estructura para lanzar los eventos App On Click Start
 */
window.dataFunnel = {
    tipoTarjeta: { TC: "tarjetas credito", TD: "tarjetas debito", TR: "tarjetas recargables" },
    tipoCuenta: { CA: "caja de ahorro", CC: "cuenta corriente", cuentaCustodia: "cuentas custodia", CO: "cuenta comunicacion" },
    tipoMoneda: { EUR: "euros", ARP: "pesos", USD: "dolares" },
    tipoPrestamo: { personal: "prestamos personal", hipotecario: "prestamos hipotecario", prendarios: "prestamos prendarios", leasing: "prestamos leasing" },
    tipoSeguro: { auto: "seguros auto", vida: "seguros vida", accidente: "seguros accidente", cajero: "seguros cajero", hogar: "seguros hogar" },
    primaryCategory: { cuentas: "cuentas", tarjetas: "tarjetas", inversiones: "inversiones", prestamos: "prestamos", seguros: "seguros" },
    appType: { contratacion: "contratacion", consulta: "consulta", operativa: "operativa" },
    fulfillmentModel: { online: "online" },
    e: { fulfillmentModel: "online", appName: "", appType: "", appStep: "app on click start", primaryCategory: "", productSubtype: "", productName: "" },
    doClear: function() {
        dataFunnel.e = { fulfillmentModel: "online", appName: "", appType: "", appStep: "app on click start", primaryCategory: "", productSubtype: "", productName: "" };
    },
    setTipoEvento: function(string) {
        var tipoEvento = string.split("_")[1];
        for (evento in dataFunnel.tipoEvento.lista) {
            if (evento == tipoEvento) {
                // dataFunnel.e.fulfillmentModel = dataFunnel.tipoEvento[evento].fulfillmentModel; 
                dataFunnel.e.appName = dataFunnel.tipoEvento[evento].appName;
                dataFunnel.e.appType = dataFunnel.tipoEvento[evento].appType;
                switch (evento) {
                    case dataFunnel.tipoEvento.lista.ultimosMovimientos:
                    case dataFunnel.tipoEvento.lista.resumenes:
                    case dataFunnel.tipoEvento.lista.comprarUS:
                    case dataFunnel.tipoEvento.lista.venderUS:
                    case dataFunnel.tipoEvento.lista.comprarEUR:
                    case dataFunnel.tipoEvento.lista.venderEUR:
                    case dataFunnel.tipoEvento.lista.tarAdicional:
                    case dataFunnel.tipoEvento.lista.transferencias:
                    case dataFunnel.tipoEvento.lista.pagarTarjetas:
                        if (string.split("_")[2].indexOf("C") == 0) {
                            dataFunnel.setProductNameCuentas(string);
                        } else if (string.split("_")[2].search(/(Visa|Mastercard|debito)/gi) > -1) {
                            dataFunnel.setProductNameTarjetas(string);
                        } else if (string.split("_")[2].indexOf("Custodia") > -1) {
                            //dataFunnel.e.primaryCategory = dataFunnel.primaryCategory.inversiones;
                            //dataFunnel.e.productSubtype = dataFunnel.tipoCuenta.cuentaCustodia;
                            return false
                        } else if (string.split("_")[2].search(/prestamo/gi) > -1) {
                            dataFunnel.setProductNamePrestamos(string);
                        } else if (string.split("_")[2].search(/seguros/gi) > -1) {
                            dataFunnel.setProductNameSeguros(string);
                        }
                        break;
                    case dataFunnel.tipoEvento.lista.comprarAcciones:
                    case dataFunnel.tipoEvento.lista.venderAcciones:
                    case dataFunnel.tipoEvento.lista.rFCI:
                    case dataFunnel.tipoEvento.lista.sFCI:
                        dataFunnel.e.primaryCategory = dataFunnel.primaryCategory.inversiones;
                        if (evento == dataFunnel.tipoEvento.lista.comprarAcciones ||
                            evento == dataFunnel.tipoEvento.lista.venderAcciones ||
                            evento == dataFunnel.tipoEvento.lista.rFCI ||
                            evento == dataFunnel.tipoEvento.lista.sFCI)
                            dataFunnel.e.productSubtype = dataFunnel.tipoCuenta.cuentaCustodia;
                        else
                            dataFunnel.e.productSubtype = dataFunnel.getNombreID(string);
                        break;
                    case dataFunnel.tipoEvento.lista.plazoFijo:
                        dataFunnel.e.primaryCategory = dataFunnel.primaryCategory.inversiones;
                        dataFunnel.e.productSubtype = "plazos fijos";
                        dataFunnel.e.productName = "plazo fijo" + " clasico";
                        break;
                    case dataFunnel.tipoEvento.lista.comprobantes:
                        //dataFunnel.e.primaryCategory = dataFunnel.primaryCategory.cuentas;
                        break;
                    default:
                        if (string.split("_").length == 4) {
                            dataFunnel.e.primaryCategory = "undefined";
                            dataFunnel.e.productSubtype = string.split("_")[2].substring(0, 2) + " ";
                            dataFunnel.e.productName = productSubtype + string.split("_")[2].substring(2, 5);
                        }
                        break;
                }
                return true;
            }
        }
        return false;
    },
    ini: function() {
        dataFunnel.tipoEvento = {
            lista: { resumenes: "resumenes", ultimosMovimientos: "ultimosMovimientos", comprarAcciones: "comprarAcciones", venderAcciones: "venderAcciones", comprarUS: "comprarUS", comprarEUR: "comprarEUR", plazoFijo: "plazoFijo", rFCI: "rFCI", sFCI: "sFCI", tarAdicional: "tarAdicional", transferencias: "transferencias", venderUS: "venderUS", venderEUR: "venderEUR", pagarTarjetas: "pagarTarjetas", comprobantes: "comprobantes" },
            resumenes: {
                appName: "ver resumenes",
                appType: dataFunnel.appType.consulta
            },
            ultimosMovimientos: {
                appName: "ultimos movimientos",
                appType: dataFunnel.appType.consulta
            },
            comprarAcciones: {
                appName: "compra acciones y bonos",
                appType: dataFunnel.appType.contratacion
            },
            venderAcciones: {
                appName: "venta acciones y bonos",
                appType: dataFunnel.appType.contratacion
            },
            comprarUS: {
                appName: "comprar moneda",
                appType: dataFunnel.appType.operativa
            },
            venderUS: {
                appName: "vender moneda",
                appType: dataFunnel.appType.operativa
            },
            comprarEUR: {
                appName: "comprar moneda",
                appType: dataFunnel.appType.operativa
            },
            venderEUR: {
                appName: "vender moneda",
                appType: dataFunnel.appType.operativa
            },
            plazoFijo: {
                appName: "hacer plazo fijo clasico",
                appType: dataFunnel.appType.contratacion
            },
            rFCI: {
                appName: "rescatar fci",
                appType: dataFunnel.appType.contratacion
            },
            sFCI: {
                appName: "suscribir fci",
                appType: dataFunnel.appType.contratacion
            },
            tarAdicional: {
                appName: "tarjeta de credito adicional",
                appType: dataFunnel.appType.contratacion
            },
            pagarTarjetas: {
                appName: "pagar tarjeta",
                appType: dataFunnel.appType.operativa
            },
            transferencias: {
                appName: "transferencias",
                appType: dataFunnel.appType.operativa
            },
            comprobantes: {
                appName: "mis comprobantes",
                appType: dataFunnel.appType.consulta
            }
        }
    },
    getNombreID: function(string) {
        var oPartes = [];
        if (string.split("_").length == 4) {
            string = string.split("_")[2];
            string = string.substring(0, string.search(/\d{1,}/gi))
            if (string != undefined && string.length > 0) {
                while (string.length != 0) {
                    oPartes.push(string.substring(string.search(/(?![A-Z].*[A-Z])([A-Z])/g)));
                    string = string.substring(0, string.search(/(?![A-Z].*[A-Z])([A-Z])/g));
                }
                for (var i = oPartes.length - 1; i >= 0; i--) {
                    string += oPartes[i] + " ";
                }
                return formatearTexto(string.trim());
            }
        }
        return "undefined_sn";
    },
    setProductNameSeguros: function(string) {
        dataFunnel.e.primaryCategory = dataFunnel.primaryCategory.seguros;
        dataFunnel.e.productSubtype = string.search(/segurosauto/gi) > -1 ? dataFunnel.tipoSeguro.auto : string.search(/segurosvida/gi) > -1 ? dataFunnel.tipoSeguro.vida : string.search(/accidente/gi) > -1 ? dataFunnel.tipoSeguro.accidente : string.search(/cajero/gi) > -1 ? dataFunnel.tipoSeguro.cajero : string.search(/hogar/gi) > -1 ? dataFunnel.tipoSeguro.hogar : "";
        dataFunnel.e.productName = "";

    },
    setProductNamePrestamos: function(string) {
        dataFunnel.e.primaryCategory = dataFunnel.primaryCategory.prestamos;
        dataFunnel.e.productSubtype = string.search(/personal/gi) > -1 ? dataFunnel.tipoPrestamo.personal : string.search(/hipotecario/gi) ? dataFunnel.tipoPrestamo.hipotecario : string.search(/prendarios/gi) > -1 ? dataFunnel.tipoPrestamo.prendarios : string.search(/leasing/gi) > -1 ? dataFunnel.tipoPrestamo.leasing : "";
        dataFunnel.e.productName = "";
    },
    setProductNameTarjetas: function(string) {
        dataFunnel.e.primaryCategory = dataFunnel.primaryCategory.tarjetas;
        dataFunnel.e.productSubtype = string.search(/(recargable)/gi) > -1 ? dataFunnel.tipoTarjeta.TR : string.search(/(Visa|Mastercard)/gi) > -1 ? dataFunnel.tipoTarjeta.TC : string.search(/(debito.+tradicional)/gi) > -1 ? dataFunnel.tipoTarjeta.TD : "";
        dataFunnel.e.productName = dataFunnel.getNombreID(string);
    },
    setProductNameCuentas: function(string) {
        dataFunnel.e.primaryCategory = dataFunnel.primaryCategory.cuentas;
        string = string.split("_")[2];
        string = string.substring(0, string.search(/\d{1,}/g));
        var tipoCuenta, moneda;
        if (string.length == 5) {
            var tipoCuenta = string.substring(0, 2);
            var moneda = string.substring(2, 5);
        } else if (string.length == 6) {
            var tipoCuenta = string.substring(0, 2);
            var moneda = string.substring(3, 6);
        }
        var resultado = [];
        for (tipo in dataFunnel.tipoCuenta) {
            if (tipoCuenta == tipo) {
                dataFunnel.e.productSubtype = dataFunnel.tipoCuenta[tipo];
            }
        }
        for (tipo in dataFunnel.tipoMoneda) {
            if (moneda == tipo) {
                dataFunnel.e.productName = dataFunnel.e.productSubtype + " " + dataFunnel.tipoMoneda[tipo];
            }
        }
    },
};
window.dataFunnel.ini();
