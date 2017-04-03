//Incluir en el evento s.tl() esta llamada para tener todas las
//variables de la huella en los eventos s.tl()
//      _satellite.getVar("setVariablesHuella");
//Variables a establecer en la huella
s.pageName = _satellite.getVar("sysEnv")+":"+_satellite.getVar("pageName");
s.channel = _satellite.getVar("pageChannel");
s.server = _satellite.getVar("server");
s.campaign = window.s.Util.getQueryParam("cid");
s.hier1 = _satellite.getVar("userAgent");
s.eVar1 = _satellite.getVar("sysEnv")+":"+_satellite.getVar("pageName");
s.eVar4 = _satellite.getVar("Date Format");
s.eVar12 = _satellite.getVar("userState");
s.eVar13 = _satellite.getVar("urlFull");
s.eVar14 = _satellite.getVar("pageIntent");
s.eVar15 = _satellite.getVar("siteEnvironment");
s.eVar16 = _satellite.getVar("area");
s.eVar17 = _satellite.getVar("language");
s.eVar25 = window.s.getNewRepeat(730, "s_nr");
s.eVar26 = _satellite.getVar("geoRegion");
s.eVar29 = _satellite.getVar("bussinessUnit");
s.eVar31 = _satellite.getVar("siteName");
s.eVar34 = "+1";
s.eVar37 = _satellite.getVar("customerID");
s.eVar38 = _satellite.getVar("segmentGlobal");
s.eVar39 = _satellite.getVar("age");
s.eVar40 = _satellite.getVar("gender");
s.eVar41 = _satellite.getVar("userCountryState");
s.eVar47 = _satellite.getVar("typology");
s.prop1 = _satellite.getVar("level1");
s.prop2 = _satellite.getVar("level2");
s.prop3 = _satellite.getVar("level3");
s.prop4 = _satellite.getVar("level4");
s.prop5 = _satellite.getVar("level5");
s.prop6 = _satellite.getVar("level6");
s.prop7 = _satellite.getVar("level7");
s.prop8 = _satellite.getVar("level8");
s.prop9 = _satellite.getVar("level9");
s.prop10 = _satellite.getVar("level10");
s.prop12 = s.eVar12;
s.prop13 = s.eVar13;
s.prop14 = s.eVar14;
s.prop15 = s.eVar15;
s.prop16 = s.eVar16;
s.prop17 = s.eVar17;
var ppvArray = window.s.getPercentPageViewed(_satellite.getVar('pageName'));
if (ppvArray != undefined) {
    //s.prop21 = ppvArray[0] //contains the previous page name
    s.prop18 = ppvArray[1] //contains the highest percent viewed of the previous page
    s.prop19 = ppvArray[2] //contains the percent of the previous page viewed on its initial load
    s.prop20 = ppvArray[3] //contains the highest number of vertical pixels viewed of the previous page
}
//Comprobamos que existen los prevPage
if (_satellite.getVar("pageNamePrevPage1") == undefined) {
    _satellite.setVar("pageNamePrevPage1", window.s.cookieWrite("pageNamePrevPage"));
    _satellite.setVar("pageURLPrevPage1", window.s.cookieWrite("pageURLPrevPage"));
    _satellite.setVar('pageIntentPrevPage1', window.s.cookieWrite("pageIntentPrevPage"));
    _satellite.setVar('siteSectionPrevPage1', window.s.cookieWrite("siteSectionPrevPage"));
}
s.prop21 = _satellite.getVar("pageNamePrevPage1");
s.prop22 = window.s_getLoadTime();
s.prop23 = _satellite.getVar("pageURLPrevPage1");
s.prop24 = _satellite.getVar("pageIntentPrevPage1");
s.prop25 = _satellite.getVar("siteSectionPrevPage1");
s.prop26 = s.eVar26;
s.prop31 = s.eVar31;
s.prop67 = _satellite.getVar("contentVersion");
s.prop68 = s.visitor.getMarketingCloudVisitorID();

for (var i = 1; i < 100; i++) {
  if (s["eVar"+i] != undefined && s["eVar"+i] !=""){s.linkTrackVars += ",eVar"+i;}
  if (s["prop"+i] != undefined && s["prop"+i] !=""){s.linkTrackVars += ",prop"+i;}
}
s.linkTrackVars += ",hier1";


//Establecemos los datos iniciales
var cadena = "";
var props = digitalData.page.pageInfo.pageName.split(':');
var level = 0;
if (digitalData.page.pageInfo.pageName.indexOf('home') > -1) {
  s.prop1 = "home";
} else {
  for (var i = 1; i + 1 < props.length; i++) {
    s["prop" + i] = cadena == "" ? digitalData.page.pageInfo['level' + i] : cadena + ":" + digitalData.page.pageInfo['level' + i];
    cadena = s["prop" + i];
  }
}

//_satellite.notify("fired setVariablesHuella: END");