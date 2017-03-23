var txtNombre = $('#txtNombre').children('input').val();
var txtEmail = $('#txtEmail').children('input').val();

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validaNombre(nombre) {

    return nombre.length >= 4 ? true : false;
}

if (validaNombre(txtNombre) && validateEmail(txtEmail)){
  return true
}

return false;

$('div.twoptiongroup:eq(0) div div div div input:checked').siblings("label").html();
$('div.twoptiongroup:eq(1) div div div div input:checked').siblings("label").html();

valor1 = "label[for="+ $('input[name="iccw55"]:checked').attr('id') + "]";
valor2 = "label[for="+ $('input[name="iccw70"]:checked').attr('id') + "]";

$(valor1).text()!=undefined?$(valor1).text():"" +"|" +  $(valor2).text()!=undefined?$(valor1).text():"";