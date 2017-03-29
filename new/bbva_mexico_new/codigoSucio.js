//s.clearVars();
s.events ="";
s.eVar50 = window.getTimeToComplete('stop', 'afct', 0);
s.linkTrackVars = "eVar50,";
if (window.s.cookieRead('sttc')!= undefined && window.s.cookieRead('sttc').length > 0) {
    var cookieSttc = window.s.cookieRead ('sttc');
    s.eVar51 = window.getTimeToComplete('stop', 'sttc', 0);
    s.linkTrackVars += "eVar51,";
    window.s.cookieWrite('sttc',cookieSttc,0);
}
if (s.events == undefined)
    s.events = "";
var appState = _satellite.getVar('applicationState');
if (appState == "contratado" || appState == "aprobado") {
    s.linkTrackEvents += "event57:" + _satellite.getVar("serializacion_application") + ",";
    s.events += "event57:" + _satellite.getVar("serializacion_application") + ",";
    if (appState == "contratado") {
        s.linkTrackEvents += "event58:" + _satellite.getVar("serializacion_application") + ",";
        s.events += "event58:" + _satellite.getVar("serializacion_application") + ",";
    }
}
if (appState == "rechazado") {
    s.linkTrackEvents += "event56:" + _satellite.getVar("serializacion_application") + ",";
    s.events += "event56:" + _satellite.getVar("serializacion_application") + ",";
}
if (appState == "en revision") {
    s.linkTrackEvents += "event151:" + _satellite.getVar("serializacion_application") + ",";
    s.events += "event151:" + _satellite.getVar("serializacion_application") + ",";
}

s.linkTrackVars += "events,products,eVar33,eVar45,prop45,eVar46,prop46,eVar47,eVar48,eVar49,eVar53,eVar54,eVar56,list1";
s.linkTrackEvents += "event76,event55:" + _satellite.getVar("serializacion_application");
s.events += "event76,event55:" + _satellite.getVar("serializacion_application");
s.eVar45 = s.prop45 = "" + _satellite.getVar("applicationName") + ":app completed:" + _satellite.getVar('step');
s.eVar46 = s.prop46 = _satellite.getVar('applicationFlowName');
s.eVar48 = _satellite.getVar('currency');
s.eVar49 = _satellite.getVar('fulfilmentModel');
s.eVar53 = _satellite.getVar('segmentProfile');
s.eVar54 = _satellite.getVar('operationNumber');
s.eVar56 = _satellite.getVar('programTypeHired');
s.products = ";" + _satellite.getVar("productCategory") + ":" + _satellite.getVar("productSubtype") + ":" + _satellite.getVar("productName") + ";;;";
if (_satellite.getVar('amount') != "") {
    s.products += "event91=" + _satellite.getVar('amount');
  	s.events += ",event91";
    if (_satellite.getVar('paymentAmount') != "")
        s.products += "|";
}
if (_satellite.getVar('paymentAmount') != "") {
    s.products += "event92=" + _satellite.getVar('paymentAmount');
  	s.events += ",event92";
}
s.products += ";";
s.list1 = _satellite.getVar("applicationFlowSelections (list1)");