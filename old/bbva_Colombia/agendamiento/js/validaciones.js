/**
 * Compara dos email y ve si son identicos
 * @param  {[String]} oEmail  [primer email]
 * @param  {[String]} oEmail2 [segundo email]
 * @return {[boolean]}, true si los dos email coinciden, false si no coinciden
 */
function validaComparacionEmail(oEmail, oEmail2) {
    var resultado = true;
    if (oEmail != oEmail2) {
        resultado = false;
    }
    return resultado;
}


function validacionMail(sMail) {
    bResultado = true;
    if (!sMail.match(PATTERN_MAIL)) {
        bResultado = false;
    }
    return bResultado;
}

/**
 * Valida el formato del dni, su numeración y letra
 * @param  {[String]} dni, que queremos comprobar
 * @return {[type]}, true si el dni es valido, false si no lo es
 */
function validaDNI(dni) {
    var valido = false;
    if (dni.length == 9) {
        var suma = 0;
        var letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
        for (var i = 0; i < 8; i++) {
            suma = parseInt(dni.substr(0, 8));
        }
        var resto = suma % 23;
        var letraBuena = letrasValidas.charAt(resto);
        if (dni.charAt(8) == letraBuena) {
            valido = true;
        } else {
            valido = false;
        }
    } else {
        valido = false;
    }
    return valido;
}

/**
 * Fuente de la informacion:
http://bulma.net/impresion.phtml?nIdNoticia=2248
http://www.trucomania.org/trucomania/truco.cgi?337&esp
http://es.wikipedia.org/wiki/N%C3%BAmero_de_identificaci%C3%B3n_fiscal#C.C3.A1lculo_de_la_letra_del_NIF

A - Sociedades Anónimas
B - Sociedades de responsabilidad limitada
C - Sociedades colectivas
D - Sociedades comanditarias
E - Comunidades de bienes
F - Sociedades cooperativas
G - Asociaciones y otros tipos no definidos
H - Comunidades de propietarios
J - Sociedades civiles, con o sin personalidad jurídica
K - Españoles menores de 14 años
L - Españoles residentes en el extranjero sin DNI
M - NIF que otorga la Agencia Tributaria a extranjeros que no tienen NIE
N - Entidades extranjeras
P - Corporaciones locales
Q - Organismos autónomos
R - Congregaciones e instituciones religiosas
S - Organos de la administración
U - Uniones Temporales de Empresas
V - Otros tipos no definidos en el resto de claves
W - Establecimientos permanentes de entidades no residentes en España
X - Extranjeros identificados por la Policía con un número de identidad de extranjero, NIE, asignado hasta el 15 de julio de 2008
Y - Extranjeros identificados por la Policía con un NIE, asignado desde el 16 de julio de 2008 (Orden INT/2058/2008, BOE del 15 de julio )
Z - Letra reservada para cuando se agoten los 'Y' para Extranjeros identificados por la Policía con un NIE

La ultima cifra es el dígito de control, que puede ser o bien un número o bien
una letra, en función del tipo de sociedad.
A las categorias P (Ayuntamientos) y X (Extranjeros) les corresponde una letra
en lugar de un número.

El dígito de control se calcula con las 7 cifras restantes del CIF (quitando la
primera y la ultima), con el siguiente algoritmo:

- CIF: A58818501
- Quitamos la primera y la ultima cifra:
    5881850
- Sumamos las cifras pares:
    Suma = 8 + 1 + 5 = 14
- Ahora sumamos cada cifra impar multiplicada por dos, y sumamos las cifras del
  resultado:
    5 * 2 = 10 ==> 1 + 0 = 1
    8 * 2 = 16 ==> 1 + 6 = 7
    8 * 2 = 16 ==> 1 + 6 = 7
    0 * 2 = 0 ==> 0
- y volvemos a sumar esos resultados a la suma anterior:
    Suma=Suma+1+7+7+0;
- Al final de este proceso, tenemos que Suma=29, pues bien, nos quedamos con la
  cifra de las unidades (9)
- Restamos esta cifra de las unidades de 10, dándonos un 1, que es el código de
  control para todos los tipos de sociedades exceptuando la X que se verifica
  como un DNI.
- Para las sociedades K, P, Q y S habria que sumar un 64 al digito de control que
  hemos calculado para hallar el ASCII de la letra de control:
    Chr(64+(10-(Suma mod 10)))
 * @param  {[String]} cif, cadena a validar
 * @return {[boolean]}     true si es valido y false en caso contrario.
 */
function esCif(cif) {
    //Quitamos el primer caracter y el ultimo digito
    var valueCif = cif.substr(1, cif.length - 2);
    var suma = 0;
    //Sumamos las cifras pares de la cadena
    for (i = 1; i < valueCif.length; i = i + 2) {
        suma = suma + parseInt(valueCif.substr(i, 1));
    }
    var suma2 = 0;
    //Sumamos las cifras impares de la cadena
    for (i = 0; i < valueCif.length; i = i + 2) {
        result = parseInt(valueCif.substr(i, 1)) * 2;
        if (String(result).length == 1) {
            // Un solo caracter
            suma2 = suma2 + parseInt(result);
        } else {
            // Dos caracteres. Los sumamos...
            suma2 = suma2 + parseInt(String(result).substr(0, 1)) + parseInt(String(result).substr(1, 1));
        }
    }
    // Sumamos las dos sumas que hemos realizado
    suma = suma + suma2;
    var unidad = String(suma).substr(1, 1);
    unidad = 10 - parseInt(unidad);
    var primerCaracter=cif.substr(0,1).toUpperCase(); 
    var lastchar = cif.substr(cif.length - 1, 1);
    var lastcharchar = lastchar;
    if (Number.isInteger(parseInt(lastchar))) {
        lastcharchar = String.fromCharCode(64 + parseInt(lastchar));
    }
    if (primerCaracter.match(/^[FJKNPQRSUVW]$/)) {
        //Empieza por .... Comparamos la ultima letra
        if (String.fromCharCode(64 + unidad).toUpperCase() == lastcharchar) {
            return true;
        }
    } else if (primerCaracter.match(/^[XYZ]$/)) {
        //Se valida como un dni
        var newcif;
        if (primerCaracter == "X")
            newcif = cif.substr(1);
        else if (primerCaracter == "Y")
            newcif = "1" + cif.substr(1);
        else if (primerCaracter == "Z")
            newcif = "2" + cif.substr(1);
        return validaDNI(newcif);
    } else if (primerCaracter.match(/^[ABCDEFGHLM]$/)) {
        //Se revisa que el ultimo valor coincida con el calculo
        if (unidad == 10)
            unidad = 0;
        if (cif.substr(cif.length - 1, 1) == String(unidad))
            return true;
    } else {
        //Se valida como un dni
        return validaDNI(cif);
    }
    return false;
}
/**
 * Método para validar NIF o NIE
 * @param nif Número de NIF o NIE a validar
 * @return true si es correcto, false si no lo es
 */
function esNifNie(nif) {
    var validado = false;
    var oNif = nif;
    if (oNif.startsWith("x") || oNif.startsWith("X") || oNif.startsWith("y") || oNif.startsWith("Y") || oNif.startsWith("z") || oNif.startsWith("Z")) {

        if (oNif.startsWith("x") || oNif.startsWith("X")) {
            oNif = "0" + oNif.substring(1);
        } else if (oNif.startsWith("y") || oNif.startsWith("Y")) {
            oNif = "1" + oNif.substring(1);
        } else if (oNif.startsWith("z") || oNif.startsWith("Z")) {
            oNif = "2" + oNif.substring(1);
        }

        var nifPattern = "\\d{1,8}[TRWAGMYFPDXBNJZSQVHLCKEtrwagmyfpdxbnjzsqvhlcke]";
        // var nifPattern = Pattern.compile("(\\d{1,8})([TRWAGMYFPDXBNJZSQVHLCKEtrwagmyfpdxbnjzsqvhlcke])");
        if (nif.match(nifPattern)) {
            var letra = oNif.substr(7, 1);
            //Extraer letra del NIF
            var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
            var dni = parseInt(oNif.substr(0, 8));
            dni = dni % 23;
            var reference = letras.substring(dni, dni + 1);
            if (reference.equalsIgnoreCase(letra)) {
                validado = true;
            }
        }
    }
    return validado;
}

/**
 * Valida la cadena con una expresión regular preestablecida. Las expresiones regulares están definidas en pattern.js
 * que se pueden utilizar con esta función son:
 * ALFANUMERICO,LETRASNUMEROS,PATTERN_DOCS
 * @param  {[String]} expReg  , expresión regular para validar cadena.
 * @param  {[String]} sCadena, a validar con expReg.
 * @return {[boolean]}  true si la validación es correcta o false en caso contrario.
 */
function validaConExprReg (expReg, sCadena) {
    var bResultado = true;
      if (!sCadena.match(expReg)) {
        bResultado= false;
      }
      return bResultado;
}
