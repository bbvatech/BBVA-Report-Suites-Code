function canal () {
	 var channel = _satellite.readCookie("Canal");
	 if(channel == "banca-personal"){
	 	channel = "personal";
	 }
	 return channel;
}

function getTarjeta () {
	var tarjeta = s.getQueryParam("product");
	switch (tarjeta) {
		case "001":
			// Mastercard Platinum.
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " mastercard platinum", 0);
			break;
		case "002":
			// Mastercard Standard
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " mastercard standard", 0);
			break;
		case "003":
			// Visa Platinum
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " visa platinum", 0);
			break;
		case "004":
			// Visa Clásica
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " visa clasica", 0);
			break;
		case "005":
			// Mastercard Gold
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " mastercard gold", 0);
			break;
		case "006":
			// Visa Oro
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " visa oro", 0);
			break;
		case "007":
			// Mastercard Black
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " mastercard black", 0);
			break;
		case "008":
			// Mastercard Heroes
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " mastercard heroes", 0);
			break;
		case "009":
			// Visa Avianca LifeMiles Gold
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " visa avianca lifemiles gold", 0);
			break;
		case "010":
			// Visa Avianca LifeMiles Platinum
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " visa avianca lifemiles platinum", 0);
			break;
		case "011":
			// Visa Avianca LifeMiles Platinum Elite
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " visa avianca lifemiles platinum elite", 0);
			break;
		case "012":
			// Visa Mujer Clásica
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " visa clasica mujer", 0);
			break;
		case "013":
			// Visa Mujer Oro
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " visa oro mujer", 0);
			break;
		case "014":
			// Visa Mujer Platinum
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " visa platinum mujer", 0);
			break;
		case "015":
			// Mastercard World Vision Gold
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " mastercard gold vision mundial", 0);
			break;
		case "016":
			// Mastercard World Vision Standard
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " mastercard standard vision mundial", 0);
			break;
		case "017":
			// Mastercard Standard Euro
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " mastercard standard euro", 0);
			break;
		case "018":
			// Visa Congelada
				_satellite.setCookie("tarjetaAgendamiento", "tarjeta " + canal() + " visa congelada", 0);
			break;
		default:
			// statements_def
			break;
	}
}

function isNumber(valor) {
	var reg = /^\d+$/;
	if(valor.length > 0 && reg.test(valor)){
		return true;
	}else{
		return false;
	}
}

function campoRelleno(valor) {
    if (valor.length > 0) {
        return true;
    } else {
        return false;
    }
}

function validarFecha(tipoFecha, valor) {
    var res = false;
    if(!isNumber(valor)){
        return false;
    }
    switch (tipoFecha) {
        case "day":
            if (parseInt(valor) <= 31) {
                res = true;
            }
            break;
        case "month":
            if (parseInt(valor) <= 12) {
                res = true;
            }
            break;
        case "year":
            var d = new Date();
            var actualYear = d.getFullYear();
            if (valor.length == 4 && parseInt(valor) <= actualYear) {
                res = true;
            }
            break;
        default:

            break;
    }
    return res;
}

function validarEmail(valor) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(valor);
}

function validarTel(valor) {
    var res = false;
    if(!isNumber(valor)){
      return false;
    }
    if (valor.length == 10 && valor.charAt(0) == "3") {
        for (var i = 2; i < valor.length; i++) {
            if (valor.charAt(i) != valor.charAt(1)) {
                res = true;
                break;
            }
        }
        return res;
    } else {
        return res;
    }
}

function validarIngresos(cedula, valor) {
    if (valor.length > 0 && cedula.length > 0) {
        var valorNum = "";
        for (var i = 1; i < valor.length; i++) {
            if (valor.charAt(i) != ",") {
                valorNum += valor.charAt(i);
            }
        }
        if (cedula == "Cédula Ciudadanía" && parseInt(valorNum) < 1000000) {
            return false;
        } else if (cedula == "Cédula Extranjería" && parseInt(valorNum) < 10000000){
          	return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function arreglarDocumento(documento) {
    var res = documento.toLowerCase();
    var aux = "";
    for (var i = 0; i < res.length; i++) {
        switch (res.charAt(i)) {
            case "á":
                aux += "a";
                break;
            case "é":
                aux += "e";
                break;
            case "í":
                aux += "i";
                break;
            case "ó":
                aux += "o";
                break;
            case "ú":
                aux += "u";
                break;
            default:
                aux += res.charAt(i);
                break;
        }
    }
    res = aux;
    return res;
}

function prepararFecha (day, month, year) {
	 if(day.length < 2){
		 day = "0" + day;
	 }
	 if(month.length < 2){
		 month = "0" + month;
	 }
	 var res = "" + month + "/" + day + "/" + year;
     return res;
}

function validarAnyos(fecha1, fecha2) {
  var res = false;
	
	var date = new Date(fecha1);
	
	var date1 = new Date(fecha2);
	
	var timeDiff = date.getTime() - date1.getTime();
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	var diffYears = diffDays / 365;
	
	if(diffYears < 18){
	}else{
		res = true;
	}
    return res;
}

//MAIN

//return true;

var tipoDoc = document.getElementById("lb_typeid").value;
var numDoc = document.getElementById("lb_id").value;
var day1 = document.getElementById("id_day").value;
var month1 = document.getElementById("id_month").value;
var year1 = document.getElementById("id_year").value;
var email = document.getElementById("lb_email").value;
var celphone = document.getElementById("lb_celphone").value;
var ingresos = document.getElementById("lb_principalearn").value;

var nombre = document.getElementById("lb_name").value;
var apellido = document.getElementById("lb_lastname").value;
var day2 = document.getElementById("born_day").value;
var month2 = document.getElementById("born_month").value;
var year2 = document.getElementById("born_year").value;
var departamento = document.getElementById("lb_department").value;
var ciudad = document.getElementById("lb_city").value;

var valNombre = campoRelleno(nombre);
var valApellido = campoRelleno(apellido);
var valDay1 = validarFecha("day", day1) && day1.length == 2;
var valMonth1 = validarFecha("month", month1) && month1.length == 2;
var valYear1 = validarFecha("year", year1);
var valDepartamento = campoRelleno(departamento);
var valCiudad = campoRelleno(ciudad);

var valTipoDoc = campoRelleno(tipoDoc);
var valNumDoc = campoRelleno(numDoc) && isNumber(numDoc);
var valDay2 = validarFecha("day", day2);
var valMonth2 = validarFecha("month", month2);
var valYear2 = validarFecha("year", year2);
var valEmail = validarEmail(email);
var valCelphone = validarTel(celphone);
var valIngresos = validarIngresos(tipoDoc, ingresos);

var valFechaMayor = validarAnyos(prepararFecha(day1, month1, year1), prepararFecha(day2, month2, year2));

var val = valTipoDoc && valNumDoc && valDay1 && valMonth1 && valYear1 && valNombre && valApellido && valDay2 && valMonth2 && valYear2 && valDepartamento && valCiudad && valEmail && valCelphone && valIngresos && valFechaMayor;
//var val = valTipoDoc && valNumDoc && valDay1 && valMonth1 && valYear1 && valNombre && valApellido && valDay2 && valMonth2 && valYear2 && valDepartamento && valCiudad && valEmail && valCelphone && valIngresos;

if (val) {
  	getTarjeta();
    //console.log("NUMERO: " + numero);
    _satellite.setCookie("dni", numDoc, 1);
    _satellite.setCookie("tipoDocumento", arreglarDocumento(tipoDoc), 1);
    //_satellite.setVar("pev2", "contratacion:tarjeta " + _satellite.readCookie("tarjetaAgendamiento") + ":paso 1:click datos identificacion");
    //_satellite.setVar("click46", "true");
    return true;
} else {
    return false;
}

//return true;
