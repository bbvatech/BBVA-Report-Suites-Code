//Condición para la ejecución
var pre1 = $('div input[name="pregunta1"]:checked');
var pre2 = $('div input[name="pregunta2"]:checked');
var sub1="";
var sub2="";
if (pre1.html() == ""){
	var sub1 = pre1.attr("id").substr(pre1.attr("id").length-1,pre1.attr("id").length);
	if (sub1=="0")
		sub1 = "1"+sub1;
}
if (pre2.html() == "") {
	var sub2 = pre2.attr("id").substr(pre2.attr("id").length-1,pre2.attr("id").length);
	if (sub2 == "0")
		sub2 = "1"+sub2;
}
_satellite.setVar("valoracionChat", sub1 + "|" +sub2);
return true
