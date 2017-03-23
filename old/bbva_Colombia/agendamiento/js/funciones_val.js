$(document).ready(function() {
    /**
     * Rellena ceros a la izquierda dos digitos
     * @param  {[type]} elemento [description]
     * @return {[type]}          [description]
     */
    function rellenaCeros(elemento) {
        if (elemento.toString().length == 1)
            return "0" + elemento;
        return elemento.toString();
    }
    /**
     * Valida la fecha pasada por parametro en formato ddmmYYYY
     * @param  {[String]} sFecha, fecha
     * @return {[boolean]}        true si la validación es correcta, false en caso contrario.
     */
    function validaFNac(sFecha) {
        var iError = 0;
        var dia = "18"; //sFecha.substr(0,2); 
        var mes = "a1"; //sFecha.substr(2,2);
        var year = "1985"; //sFecha.substr(4);

        //fecha Date
        var d18 = new Date(parseInt(year) + 18, mes - 1, dia);
        var d80 = new Date(parseInt(year) + 80, mes - 1, dia);
        iError = validaFecha(d18);
        iError = validaFecha(d80);
        if (iError > 0) {
            //Es menor de 18 años
            if (d18 > new Date())
                iError++;
            //Es mayor de 80 años
            if (d80 < new Date())
                iError++;
        }
        if (iError > 0)
            return false;
        return true;
    }

    // Validación de fecha
    $('#next_three').click(function(event) {
        // var fecha = rellenaCeros($("#born_day").val()) + rellenaCeros($("#born_month").val()) + $("#born_year").val();
        var fecha = rellenaCeros("1") + rellenaCeros("12") + 2012;
        if (!isNaN(fecha) && validaFNac(fecha)) {
            //Lanzar evento de etiquetado
            console.log("fecha OKKKKKK");
        }

    });




    // -------------------------------------------------
    // validacion de campos boton 4
    // -------------------------------------------------
    // Validación de:
    // Al seleccionar "Autónomo", valida que el ingreso mínimo sea de $2.000.000, o sea distinto de selecciona
    // Inicio Actividad Debe ser numérico
    // Actividad económica No permite avanzar si no se selecciona ninguna opción
    // Profesión   No permite avanzar si no se selecciona ninguna opción
    // Tipo Vivienda   "Al seleccionar ""Familiar"": Debe inhabilitar el campo siguiente denominado
    //      ""Valor vivienda/arriendo/cuotas hipotecarias"""
    // Tipo Vivienda   Al seleccionar "Alquiler", "Propiedad hipotecada", "Propiedad libre", "Otros"; 
    //     deberá ingresar un valor diferente de $0 en el siguiente campo  denominado "Valor vivienda/arriendo/cuotas 
    //     hipotecarias"
    // Ingresos fijos mensuales (paso # 3 del formulario)  "Este campo debe aparecer bloqueado y con el monto
    //      ingresado en el primer paso del formulario"
    // 
    // Ningun campo puede estar vacio
    // 
    function validaVacios(oElementos) {
        $.each(oElementos, function(index, val) {
            if ($(this) === "")
                return 1;
        });
        return 0;
    }

    /**
     * Al seleccionar "Autónomo", valida que el ingreso mínimo sea de $2.000.000, o sea distinto de selecciona
     * @param  {[Array]} oElementos, los valores seleccionados en el formulario
     * @return {[int]} 1 si la validación NOOK, 0 si es OK
     */
    function validaSituacion(oElementos) {
        if (oElementos.situacion === "Independiente") {
            if (parseInt(oElementos.ingresosFijos.substr(1)) < 2000000)
                return 1;
        }
        return 0;
    }

    /**
     * Valida que la fecha pasada tenga el formato y sea correcta
     * @param  {[Date]} fecha a validar
     * @return {[int]}  1 si hay error , 0 si todo está bien.
     */
    function validaFecha(fecha) {
        // var fecha = new Date(oElementos.ano, parseInt(oElementos.mes) - 1, oElementos.dia);
        if (Object.prototype.toString.call(fecha) === "[object Date]") {
            if (isNaN(fecha.getTime())) {
                return 1;
            }
        } else {
            return 1;
        }
        return 0;
    }

    function validaVivienda(oElementos) {
        if (oElementos.tipoVivienda === "Familia") {
            delete oElementos.valorVivienda;
        } else {
            if (parseFloat(oElementos.valorVivienda.substr(1)) < 0) {
                return 1;
            }
        }
    }
    $('#next_four').click(function(event) {
        var valores = {};
        var iError = 0;
        valores.push('situacion', $('#lb_workstatus').val()); //Situación laboral
        valores.push('dia', $('#work_day').val()); //Dia
        valores.push('mes', $('#work_month').val()); //Mes
        valores.push('ano', $('#work_year').val()); //año
        valores.push('actividad', $('#lb_economicactitivy').val()); //Actiividad economica
        valores.push('tipoVivienda', $('#lb_home-button').val()); //Tipo de vivienda
        valores.push('valorVivienda', $('#lb_costhousing').val()); //Valor vivienda/arriendo....
        // valores.push('valorPatrimonio', $('#lb_heritage').val()); //Valor del patrimonio
        // valores.push('ingresosFijos', $('#lb_principalearn_cp').val()); //Ingresos fijos
        // valores.push('otrosIngresos', $('#lb_otherearn').val()); //Otros ingresos
        // valores.push('deduccionesNomina', $('#lb_nomina').val()); //Valor deducciones de nomina
        // valores.push('personasCargo', $('#lb_childrens').val()); //Numero de personas a cargo
        // valores.push('nivelEstudios', $('#lb_studylevel').val()); //Nievel de estudios

        // validación de algun elemento vacio
        iError += validaSituacion(valores);
        iError += validaFecha(new Date(valores.ano, valores.mes - 1, valores.dia));
        iError += validaVivienda(valores);
        iError += validaVacios(valores);


        if (iError > 0)
            console.log("Validación NOOK");
        console.log("Validación NOOK");

    });



});
