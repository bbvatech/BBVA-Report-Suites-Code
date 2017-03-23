// pageName. Si aparece el literal "home:" lo eliminamos del page name
if (digitalData.page.info.pageName.indexOf('home:') >= 0) {
    return digitalData.page.info.pageName.substr(0, digitalData.page.info.pageName.indexOf('home:')) +
        digitalData.page.info.pageName.substr(digitalData.page.info.pageName.indexOf('home:') + 5);
}
return digitalData.page.info.pageName;

//hier
s.hier1 = _satellite.getVar('pageName');

//Prop's
var cadena = _satellite.getVar('area') + ":" + _satellite.getVar('DigitalData PageSegment');
var props = digitalData.page.info.pageName.split(':');
s.prop1 = cadena;
var level = 0;
if (digitalData.page.info.pageName.indexOf('home:') >= 0) {
    for (var i = 1; i + 2 < props.length; i++) {
        s["prop" + (i + 1)] = cadena + ":" + _satellite.getVar('level' + (i + 1));
        cadena = s["prop" + i];
    }
} else {
    s.prop2 = cadena + ":home";
}

// Prop3
prop3 = % area % +":" + % DigitalData PageSegment % +":" + % level2 % +":" + % level3 %
