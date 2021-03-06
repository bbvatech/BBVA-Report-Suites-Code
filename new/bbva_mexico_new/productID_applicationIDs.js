var sessionID = _satellite.readCookie("sessionID");
var productName = _satellite.getVar("productName");
var productSubtype = _satellite.getVar("productSubtype");
var productCategory = _satellite.getVar("productCategory");

if(productCategory.length > 0){
  var products = productCategory;
  products += productSubtype.length > 0? ":" + productSubtype:"";
  products += productName.length > 0? ":" + productName:"";
  console.log('productIDs["' + products+'"] = "@@@";');
  console.log('applicationIDs["' + _satellite.getVar("applicationFlowName")+'"] = "@@@";');
}

// Establecemos los valores para la serialización de eventos
//Codigos bancomer
window.productIDs = [];
window.productIDs["inversiones:planes de pensiones"] = "ipp";
window.productIDs["prestamos:credito de nomina"] = "pcn";
window.productIDs["tarjetas:tarjetas credito"] = "ptc";
window.productIDs["inversiones:ahorro"] = "iai";
window.productIDs["prestamos:credito auto"] = "sca";
window.productIDs["prestamos:prestamo automotriz"] = "ppa";
window.productIDs["prestamos:credito hipotecario"] = "pch";
window.productIDs["cuentas:cuenta nomina"] = "ccn";
window.productIDs["tarjetas:tarjetas credito:tarjeta UNAM"] = "ttu";
window.productIDs["prestamos:prestamo personal"] = "ppp";
window.productIDs["cuentas:cuentas sin chequera:cuenta nomina bancomer"] = "csc";
window.productIDs["tarjetas:tarjetas credito:tarjeta platinum bancomer"] = "ttp";
window.productIDs["inversiones:fondos"] = "inf";
window.productIDs["inversiones:plazo"] = "inp";
window.productIDs["seguros:seguro conductor responsable"] = "scr";
window.productIDs["seguros:seguro contenidos del hogar"] = "sch";
window.productIDs["prestamos:adelanto sueldo"] = "pas";
window.applicationIDs = [];
window.applicationIDs["simulador:simulador pensiones"] = "000";
window.applicationIDs["simulador:simulador credito nomina"] = "001";
window.applicationIDs["simulador:simulador tarjeta de credito"] = "002";
window.applicationIDs["simulador:simulador ahorro e inversion"] = "003";
window.applicationIDs["simulador:simulador credito auto"] = "004";
window.applicationIDs["contratacion:contratacion credito auto"] = "005";
window.applicationIDs["simulador:simulador prestamo automotriz"] = "006";
window.applicationIDs["simulador:simulador credito hipotecario"] = "007";
window.applicationIDs["contratacion:incremento de linea one click"] = "008";
window.applicationIDs["simulador:simulador credito de nomina"] = "009";
window.applicationIDs["simulador:simulador incremento linea credito"] = "010"
window.applicationIDs["contratacion:efectivo inmediato one click"] = "011";
window.applicationIDs["contratacion:portabilidad nomina one click"] = "012";
window.applicationIDs["contratacion:tarjeta de credito one click"] = "013";
window.applicationIDs["contratacion:prestamo personal one click"] = "014";
window.applicationIDs["simulador:simulador prestamo personal"] = "015";
window.applicationIDs["contratacion:fondos de inversion one click"] = "016";
window.applicationIDs["contratacion:inversion a plazo one click"] = "017";
window.applicationIDs["contratacion:seguro conductor responsable one click"] = "018";
window.applicationIDs["contratacion:seguro contenidos del hogar one click"] = "019";
window.applicationIDs["contratacion:recolocacion consumo one click"] = "020";
window.applicationIDs["contratacion:precalificador hipoteca"] = "021";
window.applicationIDs["simulador:simulador hipotecario"] = "022";
window.applicationIDs["contratacion:adelanto sueldo"] = "023";
window.applicationIDs["contratacion:compra fondos de inversion one click"] = "024";

return true;


