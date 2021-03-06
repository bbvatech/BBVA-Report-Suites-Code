//Desde este programa se obtienen la serialización para los productos.
//Se pasa un array con productos y se va calculando la serialización para cada uno.
//Cuando no existe esa serialización para ese producto en el array final, se añade 
//y se empieza a buscar uno nuevo para el siguiente.

//Codigos Argentina
//Codigos Argentina
window.applicationIDs = {
    "contratacion:tarjeta de credito adicional": "001",
    "operativa:comprar moneda": "002",
    "operativa:vender moneda": "003",
    "contratacion:hacer plazo fijo clasico": "004",
    "operativa:transferencias": "005",
    "contratacion:suscribir fci": "006",
    "contratacion:rescatar fci": "007",
    "contratacion:compra acciones y bonos": "008",
    "contratacion:venta acciones y bonos": "009",
    "consulta:ultimos movimientos": "010",
    "consulta:ver resumenes": "011",
    "consulta:comprobantes": "012",
    "operativa:pagar tarjeta": "013",
    "contratacion:prestamo personal one click": "014",
    "contratacion:prestamo personal renovador one click": "015",
    "contratacion:motor on line":"016",
    "contratacion:referidos":"017"
}

window.productIDs = {
    "tarjetas::":"bkj",
    "tarjetas:tarjetas credito:visa internacional": "tvi",
    "tarjetas:tarjetas credito:mastercard internacional": "tmi",
    "tarjetas:tarjetas credito:mastercard platinum": "tmp",
    "tarjetas:tarjetas credito:visa platinum": "tpl",
    "tarjetas:tarjetas credito:frances latam pass": "tfl",
    "tarjetas:tarjetas credito:bbva frances peugout": "tfp",
    "tarjetas:tarjetas credito:frances talleres": "tft",
    "tarjetas:tarjetas credito:tarjeta river": "ttr",
    "tarjetas:tarjetas credito:xeneize": "txe",
    "tarjetas:tarjetas credito:visa signature": "tvs",
    "tarjetas:tarjetas credito:mastercard black": "tmb",
    "tarjetas:tarjetas credito:mastercard black platinium": "mbp",
    "tarjetas:tarjetas credito:visa premium": "tvp",
    "tarjetas:tarjetas credito:visa gold": "tvg",
    "tarjetas:tarjetas credito:mastercard gold": "tmg",
    "tarjetas:tarjetas credito:visa classic": "tvc",
    "tarjetas:tarjetas credito:mastercard": "tma",
    "tarjetas:tarjetas credito:universidad de moron": "tum",
    "tarjetas:tarjetas de debito:tradicional": "tdt",
    "tarjetas:tarjeta regalo:tarjeta visa regalo": "rtv",
    "tarjetas:tarjeta recargable:tarjeta visa recargable": "tvr",
    "cuentas:caja de ahorro:caja de ahorro pesos": "cap",
    "cuentas:caja de ahorro:caja de ahorro dolares": "cad",
    "inversiones:plazos fijos:plazo fijo clasico": "ipc",
    "cuentas:cuenta corriente:cuenta corriente pesos": "ccp",
    "inversiones:cuenta custodia": "icc",
    "cuentas::el libreton": "vgs",
    "cuentas::libreton express": "gsd",
    "cuentas::libreton plus gold": "rnv",
    "cuentas::libreton full": "uhc",
    "cuentas::cuenta premium": "ybq",
    "cuentas::cuenta premium world": "pkn",
    "tarjetas:tarjetas credito:tarjetas de credito LATAM pass": "owq",
    "tarjetas:tarjetas credito:tarjeta bbva frances peugeot": "mqz",
    "tarjetas:tarjetas credito:tarjetas de credito bbva frances talleres": "qai",
    "tarjetas:tarjetas credito:tarjeta xeneize": "egc",
    "tarjetas:tarjetas credito:tarjeta visa signature latam pass": "llc",
    "tarjetas:tarjetas credito:tarjeta mastercard black": "lcx",
    "tarjetas:tarjetas credito:tarjeta visa platinum": "cwj",
    "tarjetas:tarjetas credito:tarjeta mastercard platinum": "sae",
    "tarjetas:tarjetas credito:tarjeta visa gold": "gwu",
    "tarjetas:tarjetas credito:tarjeta visa classic": "cwk",
    "tarjetas:tarjetas credito:tarjeta mastercard gold": "kdc",
    "tarjetas:tarjetas credito:tarjeta mastercard": "zpp",
    "tarjetas:tarjetas credito:visa universidad de moron": "vtn",
    "tarjetas:tarjetas debito:tarjeta visa debito": "vqf",
    "tarjetas::tarjeta regalo": "rln",
    "tarjetas:tarjeta recargable:visa recargable": "bqa",
    "prestamos::prestamo personal": "zom",
    "prestamos::prestamo personal renovador": "sor",
    "prestamos:prestamos hipotecarios:adquisicion": "ewg",
    "prestamos:prestamos hipotecarios:prestamos uvas": "mmn",
    "prestamos:prestamos hipotecarios:construccion": "fat",
    "prestamos:prestamos hipotecarios:adquisicion segunda vivienda": "ezr",
    "prestamos:prestamos hipotecarios:refaccion": "gkj",
    "prestamos::prestamo prendario": "gnd",
    "prestamos::leasing": "nql",
    "inversiones:plazos fijos:plazo fijo uva´s": "fdq",
    "inversiones:plazos fijos:plazo fijo adelantado latam": "qmt",
    "inversiones:plazos fijos:plazo fijo badlar": "zop",
    "inversiones:plazos fijos:plazo fijo ajustable cer": "mwz",
    "inversiones:plazos fijos:plazo fijo clasico renta mensual": "sqw",
    "inversiones:plazos fijos:plazo fijo interes variable": "cib",
    "inversiones:plazos fijos:renta asegurada": "mou",
    "inversiones:plazos fijos:plazo fijo inmediato": "pqk",
    "inversiones:fondos:fba renta pesos": "nzm",
    "inversiones:fondos:fba ahorro pesos": "mnm",
    "inversiones:fondos:fba bonos argentina": "mzr",
    "inversiones:fondos:fba horizonte": "tfc",
    "inversiones:fondos:fba renta mixta": "fbv",
    "inversiones:fondos:fba calificado": "him",
    "inversiones:fondos:fba acciones argentina": "kpx",
    "inversiones:fondos:fba acciones latinoamericanas": "euv",
    "inversiones::cuenta inversor": "ofb",
    "inversiones::american express travelers cheques": "xgk",
    "seguros:seguros hogar:seguro de hogar": "xgy",
    "seguros:seguros hogar:seguro de hogar premier": "nzn",
    "seguros:seguros hogar:seguro hogar oro": "jor",
    "seguros:seguros vida:seguro de vida": "prw",
    "seguros:seguros vida:seguro de vida oro": "ray",
    "seguros:seguros autos:seguros de auto": "yxh",
    "seguros:seguros accidentes:accidentes personales": "suc",
    "seguros:seguros robos:seguro contra robos en cajeros": "dgs",
    "seguros:seguros robos:seguro de bolso protegido": "tym",
    "seguros:seguros robos:seguro de compra protegida": "jme",
    "seguros::seguro de consumo garantizado": "lgo",
    "seguros:seguros robos:seguro de proteccion de portatiles": "bpd",
    "seguros:seguros robos:seguro de notebook protegida": "rjw",
    "seguros::seguro de golfistas": "iki",
    "seguros::seguro de desempleo": "afy",
    "seguros:seguros accidentes:seguro personal domestico": "crs",
    "cuentas:cuenta comunicación a5526 :cuenta comunicación a5526  dolares": "zqt",
    "cuentas:caja de ahorro:caja de ahorro euros": "qud",
    "cuentas:cuenta comunicación a6022 depósito en efectivo:cuenta comunicación a6022 depósito en efe": "rfp",
    "cuentas:cuenta comunicación a5526 :cuenta comunicación a5526  euros": "som",
    "cuentas:cuenta comunicación a6022 suscripción de bonos:cuenta comunicación a6022 suscripción de": "vtc",
    "cuentas:cuenta comunicacion:cuenta comunicacion dolares": "yqk",
    "cuentas:cuenta corriente:cuenta corriente dolares": "uxx",
    "cuentas:cuenta comunicación a6022 suscripción de fondos:cuenta comunicación a6022 suscripción de": "sso",
    "tarjetas:tarjeta credito:visa internacional": "mqo",
    "tarjetas:tarjeta credito:visa gold": "xap",
    "tarjetas:tarjetas debito:tarjeta de debito tradicional": "mec",
    "tarjetas:tarjeta credito:visa platinum": "tuj",
    "tarjetas:tarjeta credito:mastercard internacional": "nur",
    "tarjetas:tarjeta credito:visa signature": "kkc",
    "tarjetas:tarjeta credito:mastercard gold": "bqv",
    "tarjetas:tarjeta credito:mastercard platinum": "cfu",
    "tarjetas:tarjetas credito:visa nacional": "ccu",
    "tarjetas::tarjetadedebito tradicional": "zte",
    "tarjetas:tarjeta credito:master card black": "dkq",
    "tarjetas:tarjeta credito:visa nacional": "sdf",
    "tarjetas:tarjetas credito:mastercard regional": "ihf",
    "tarjetas:tarjeta visa recargable:tarjeta visa recargable": "xys",
    "tarjetas:tarjetas credito:visa business": "svg",
    "tarjetas:tarjeta credito:tarjeta visa recargable": "qoq",
    "tarjetas:tarjeta credito:mastercard regional": "rtb",
    "tarjetas:tarjetas credito:visa corporate": "xtk",
    "tarjetas:tarjetas credito:visa agro": "mxk",
    "tarjetas:tarjetas credito:visa signature corporate": "nsq",
    "tarjetas:tarjetas credito:visa purchasing": "gks",
    "tarjetas:tarjeta credito:visa signature corporate": "dky",
    "tarjetas:tarjeta mastercard recargable:tarjeta mastercard recargable": "vcz",
    "tarjetas:tarjetas credito:bbva frances peugeot": "rjk",
    "tarjetas:tarjeta credito:tarjeta mastercard recargable": "cns",
    "inversiones:plazos fijos:plazo fijo clásico": "igv",
    "inversiones:cuentas custodia:": "afz",
    "inversiones:cuentas custodia:FBA BonAA": "ywz",
    "inversiones:cuentas custodia:FBA AhorPA": "gux",
    "inversiones:cuentas custodia:FBA RenPeA": "eiq",
    "inversiones:cuentas custodia:FBA AccArA": "hsc",
    "inversiones:cuentas custodia:FBA AccLA": "ixb",
    "inversiones:cuentas custodia:FBA CalifA": "dug",
    "inversiones:cuentas custodia:FBA RMixtA": "ird",
    "inversiones:cuentas custodia:FBA HORIZ": "are",
    "inversiones:cuentas custodia:f la pampa": "fbs",
    "inversiones:cuentas custodia:bonar xxiv": "lhf",
    "inversiones:cuentas custodia:ypf": "sew",
    "inversiones:cuentas custodia:siderar": "pix",
    "inversiones:cuentas custodia:apbr": "hjy",
    "inversiones:cuentas custodia:fran": "tjm",
    "inversiones:cuentas custodia:bonar x": "tpa",
    "inversiones:cuentas custodia:transener": "abl",
    "inversiones:cuentas custodia:edenor": "xiz",
    "inversiones:cuentas custodia:alua": "aeo",
    "inversiones:cuentas custodia:mirgor": "rtt",
    "inversiones:cuentas custodia:gf galicia": "vpt",
    "inversiones:cuentas custodia:tgsu2": "rbd",
    "inversiones:cuentas custodia:bonar 2020": "ald",
    "inversiones:cuentas custodia:bcosud": "onb",
    "inversiones:cuentas custodia:disdra": "lbz",
    "inversiones:cuentas custodia:tenaris": "qft",
    "inversiones:cuentas custodia:c. plata": "qpm",
    "inversiones:cuentas custodia:dycasa": "fua",
    "inversiones:cuentas custodia:cepu": "uaw",
    "inversiones:cuentas custodia:telecom": "qmi",
    "inversiones:cuentas custodia:bhip": "acx",
    "inversiones:cuentas custodia:molinos": "jtn",
    "inversiones:cuentas custodia:ledesma": "zes",
    "inversiones:cuentas custodia:disdny": "duf",
    "inversiones:cuentas custodia:bcopatag b": "pxp",
    "inversiones:cuentas custodia:cedi": "jnc",
    "inversiones:cuentas custodia:dis$": "ziw",
    "inversiones:cuentas custodia:boldtsa": "ask",
    "inversiones:cuentas custodia:pardra": "sgm",
    "inversiones:cuentas custodia:par$": "gqm",
    "inversiones:cuentas custodia:metrogas": "bku",
    "inversiones:cuentas custodia:andes erg": "dgm",
    "inversiones:cuentas custodia:bonad 17": "dab",
    "inversiones:cuentas custodia:iyelapatag": "wlq",
    "inversiones:cuentas custodia:vn pbi $": "gzu",
    "inversiones:cuentas custodia:j.minetti": "rnp",
    "inversiones:cuentas custodia:garovaglio": "ypd",
    "inversiones:cuentas custodia:domec": "wrm",
    "inversiones:cuentas custodia:g ban": "hby",
    "inversiones:cuentas custodia:vnpbiu$sny": "mgk",
    "inversiones:cuentas custodia:pardny": "ycj",
    "inversiones:cuentas custodia:bonad 17j": "kjp",
    "inversiones:cuentas custodia:consultati": "kzb",
    "inversiones:cuentas custodia:cresud": "svz",
    "inversiones:cuentas custodia:inv jurame": "txj",
    "inversiones:cuentas custodia:banco rio": "qsp",
    "inversiones:cuentas custodia:a palermo": "zjn",
    "inversiones:cuentas custodia:ccostanera": "jta",
    "inversiones:cuentas custodia:bonad 18": "eys",
    "inversiones:cuentas custodia:fiplasto": "gok",
    "inversiones:cuentas custodia:celulosa": "zjw",
    "inversiones:cuentas custodia:g clarin": "ukq",
    "inversiones:cuentas custodia:carboclor": "nbp",
    "inversiones:cuentas custodia:gj17 2010": "wnh",
    "inversiones:cuentas custodia:agrometal": "sko",
    "inversiones:cuentas custodia:pet energ": "cbz",
    "inversiones:plazos fijos:plazo fijo cer plus": "zuh",
    "inversiones:cuentas custodia:grimoldi": "kew",
    "inversiones:cuentas custodia:bonar 20b": "dka",
    "inversiones:cuentas custodia:caputo": "rvm",
    "inversiones:cuentas custodia:san miguel": "adg",
    "inversiones:cuentas custodia:tgn cl c": "ega",
    "inversiones:cuentas custodia:rigolleau": "uvf",
    "inversiones:cuentas custodia:ausol": "hzd",
    "inversiones:cuenta custodia:caja de ahorro pesos": "oby",
    "inversiones:cuentas custodia:m. semino": "ejx",
    "inversiones:cuentas custodia:boncer2021": "mqh",
    "inversiones:cuentas custodia:paty": "urj",
    "inversiones:cuentas custodia:tglt": "uri",
    "inversiones:cuentas custodia:bonarxviii": "hdb",
    "inversiones:cuentas custodia:esmeralda": "zst",
    "inversiones:cuentas custodia:repsol ar": "igk",
    "inversiones:cuentas custodia:c casado": "vmu",
    "inversiones:cuentas custodia:bpld 2035": "jzy",
    "inversiones:cuentas custodia:irsa": "dcl",
    "inversiones:cuentas custodia:cedear bbv": "myd",
    "inversiones:cuentas custodia:tef": "uvz",
    "inversiones:cuentas custodia:bonad 2017": "uwy",
    "prestamos:prestamos personal:prestamos personal": "ywn",
    "prestamos:prestamos prendario:prestamos prendario": "luv",
    "prestamos:prestamos hipotecario:": "rdb",
    "prestamos:prestamos :prestamos": "pry",
    "prestamos:prestamos leasing:prestamos leasing": "ewr",
    "prestamos:prestamos financiero:prestamos financiero": "rcw",
    "seguros:seguros cajero:cajero automatico": "njb",
    "seguros:seguros vida:vida vinculado prestamo": "xut",
    "seguros:seguros hogar:hogar": "zhk",
    "seguros:seguros vida:vida directo": "vrn",
    "seguros:seguros accidente:accidentes personales": "qtd",
    "seguros:seguros hogar:hogar premier": "bjv",
    "seguros::compra protegida": "ifo",
    "seguros:tarjetas credito:compra protegida": "ndi",
    "seguros::bolso protegido": "lnj",
    "seguros::protec. portatiles": "ltz",
    "seguros::celulares": "abo",
    "seguros:caja de ahorro:compra protegida": "lrs",
    "seguros:tarjetas credito:bolso protegido": "voz",
    "seguros:tarjetas credito:protec. portatiles": "alf",
    "seguros:caja de ahorro:bolso protegido": "ijm",
    "seguros:caja de ahorro:protec. portatiles": "izx",
    "seguros:tarjetas credito:celulares": "fau",
    "seguros:cuenta corriente:compra protegida": "bwz",
    "seguros:seguros cajero:compra protegida": "bio",
    "seguros:tarjetas credito:consumo garantizado": "dek",
    "seguros:caja de ahorro:celulares": "nuh",
    "seguros::consumo garantizado": "nju",
    "seguros:seguros vida:compra protegida": "dsy",
    "seguros:seguros cajero:protec. portatiles": "gal",
    "seguros:seguros accidente:accidente personal domestico": "asr",
    "seguros:seguros accidente:compra protegida": "mba",
    "seguros:seguros cajero:bolso protegido": "mrm",
    "seguros:seguros vida:protec. portatiles": "zpu",
    "seguros:plazos fijos:protec. portatiles": "wfd",
    "seguros:seguros accidente:protec. portatiles": "ifu",
    "seguros:seguros vida:bolso protegido": "xdv",
    "seguros:seguros hogar:protec. portatiles": "ibl",
    "seguros:prestamos personal:compra protegida": "jvz",
    "seguros:cuenta corriente:bolso protegido": "mtg",
    "seguros:tarjetas debito:compra protegida": "dzv",
    "seguros:plazos fijos:compra protegida": "eav",
    "seguros:tarjetas debito:bolso protegido": "qxv",
    "seguros:caja de ahorro:consumo garantizado": "jck",
    "seguros:seguros hogar:bolso protegido": "gjp",
    "seguros:seguros accidente:consumo garantizado": "hel",
    "seguros:cuenta corriente:celulares": "nmx",
    "seguros:tarjetas debito:protec. portatiles": "sre",
    "seguros:seguros accidente:bolso protegido": "tpv",
    "seguros:caja de ahorro:incendio hipotecario": "nqx",
    "seguros:seguros vida:incendio hipotecario": "hyg",
    "seguros:seguros cajero:consumo garantizado": "aup",
    "seguros:prestamos personal:protec. portatiles": "zpo",
    "seguros:seguros vida:consumo garantizado": "pow",
    "seguros:prestamos personal:celulares": "bix",
    "seguros:seguros cajero:celulares": "mdm",
    "seguros:plazos fijos:celulares": "mpl",
    "seguros::incendio hipotecario": "jvd",
    "seguros:seguros notebook:proteccion notebook": "psw",
    "seguros:seguros hogar:compra protegida": "ekk",
    "seguros:prestamos personal:consumo garantizado": "bwu",
    "seguros:tarjetas credito:incendio hipotecario": "mkr",
    "seguros:prestamos hipotecario:incendio hipotecario": "ujw",
    "seguros:seguros accidente:celulares": "lyh",
    "seguros:prestamos personal:bolso protegido": "dkh",
    "seguros:plazos fijos:bolso protegido": "nzo",
    "seguros:plazos fijos:consumo garantizado": "mmo",
    "seguros:cuentas custodia:bolso protegido": "zce",
    "seguros::golfista": "gom",
    "seguros:seguros vida:celulares": "fjy",
    "seguros:tarjetas credito:golfista": "bde",
    "seguros:tarjetas debito:celulares": "jxx",
    "seguros:cuentas custodia:celulares": "npb",
    "seguros:cuentas custodia:incendio hipotecario": "opu",
    "seguros:cuenta comunicación a5526 :bolso protegido": "mox",
    "seguros:seguros hogar:golfista": "waw",
    "seguros:cuenta corriente:protec. portatiles": "pmy",
    "seguros:cuentas custodia:compra protegida": "lbr",
    "seguros::cajero automatico": "hiu",
    "seguros:cuentas custodia:protec. portatiles": "rdk",
    "seguros:seguros hogar:consumo garantizado": "ajn",
    "seguros:seguros cajero:incendio hipotecario": "xjb",
    "seguros:prestamos personal:incendio hipotecario": "hqg",
    "seguros:caja de ahorro:golfista": "eoh",
    "tarjetas:tarjetas credito:":"efz"
}




/**
 * Comprueba si existe un id serializado en un array
 * @param  {string} id, con tres letras
 * @param  {array} pS array no anonimo
 * @return {boolean}    verdadero si existe en el array, falso si no existe en el array
 */
function existeID(id, oPS) {
    for (producto in oPS) {
        if (oPS[producto] == id) {
            return true;
        }
    }
    return false;
}

/**
 * Devuelve una cadena aleatoria de 3 letras
 * @return {string} con una cadena aleatoria de longitud 3
 */
function getIdSerializacion() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

//Ejecutamos el bucle hasta que no existan productos no oSerializados
function serializarProductos(oSerializados, oNoSerializados) {
    for (productoNS in oNoSerializados) {
        var Id = getIdSerializacion();
        if (!existeID(Id, oSerializados) && oSerializados[productoNS] == undefined) {
            oSerializados[productoNS] = Id;
            delete oNoSerializados[productoNS];
        }
    }
    return JSON.stringify(oSerializados);
}

var productsNoSerializados = { "tarjetas::": "" }

console.log("Productos Serializados: " + serializarProductos(window.productIDs, productsNoSerializados));
console.log("Productos no serializados: " + JSON.stringify(productsNoSerializados));
