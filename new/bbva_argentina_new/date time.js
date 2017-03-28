function rellenoCeros(cadena) {

    if ((cadena) < 10) {
        return "0" + cadena;
    }
    return cadena;
}

function momentoDelDia(hora, minuto, segundo) {

    if (hora >= 0 && hora < 6) {
        return "Late Night"
    } else if (hora >= 6 && hora < 12) {
        return "Morning";
    } else if (hora >= 12 && hora < 19) {
        return "Afternoon";
    } else {
        return "Evening";
    }
}

function getWeekNr() {
    var now = new Date(),
        i = 0,
        f, sem = (new Date(now.getFullYear(), 0, 1).getDay() > 0) ? 1 : 0;
    while ((f = new Date(now.getFullYear(), 0, ++i)) < now) {
        if (!f.getDay()) {
            sem++;
        }
    }
    return sem;
}

var oFecha = new Date();

// RESULTADO: 2015-02-08|01|4|02|08:34:12|Morning|34|2015
// result += fecha;
var result = "";
// var sFecha = oFecha.toString();
var year = oFecha.getYear() + 1900;
var mes = rellenoCeros(oFecha.getMonth() + 1);
var dia = rellenoCeros(Number(oFecha.toString().split(" ")[2]));
var diaSemana = Number(oFecha.getDay()) + 1;
var hora = rellenoCeros(Number(oFecha.getHours()));
var min = rellenoCeros(Number(oFecha.getMinutes()));
var seg = rellenoCeros(Number(oFecha.getSeconds()));
var semanaAnno = rellenoCeros(getWeekNr());

result = year + "-" + mes + "-" + dia;
result += "|" + dia;
result += "|" + diaSemana;
result += "|" + mes;
result += "|" + hora + ":" + min;
result += "|" + momentoDelDia(Number(hora), Number(min), Number(seg));
result += "|" + semanaAnno;
result += "|" + year;

return result;