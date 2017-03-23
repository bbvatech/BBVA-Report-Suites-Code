

	/**
	 * Enumeration para caracteres especiales
	 * SI SE AÑADE ALGUNA EXPRESION EN ALFANUMERICO CON CARACTERES ESPECIALES
	 * HAY QUE AÑADIRLA AQUI TAMBIEN
	 */
	// public enum validarCaracteresEspeciales{
	// /**Caracteres Especiales*/
	// ALFANUMERICO_ESPECLS("[A-Za-z0-9\\-\\/\\.\\s\\t\\[\\{\\]\\}\\^\\*\\+\\x5C\\<\\>\\u20AC:,;_'=\"ºª#$¬~%&|·`´¿\\?¡!()@ÑñÇçáàÀÁäÄéèÈÉëËíìÌÍïÏòóÒÓöÖùúÙÚüÜ]");
	// /**Codigo */
	// String codigo;
	// /**Constructor del enum
	// * @param codigo*/
	// validarCaracteresEspeciales(final String codigo){
	// this.codigo = codigo;
	// }
	// /**obtener codigo*/
	// public String getCodigo() {
	// return codigo;
	// }
	// }
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PATRONES DE VALIDACION
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ALFANUMERICO = "^.";
	var LETRASNUMEROS = "[a-zA-Z_0-9]";
	var PATTERN_MAIL = "^[\\w\\-\\_]+(\\.[\\w\\-\\_]+)*@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$";
	var PATTERN_DOCS = "^([\\w_.-\\]).(txt|gif|png|jpg|pdf|doc|docx|xls|xlsx)$";

	var IS_ALFANUMERICO = "[-áéíóúÁÉÍÓÚÜüa,()-zñÑ A-Z_0-9]";
	var ALFANUMERICO_ESPECLS = "[\\-\\/\\.\\s\\t\\[\\{\\]\\}\\^\\*\\+\\x5C\\<\\>\\u20AC\\¨\\(\\)\\·:,;'=\"ºª#$¬~%&|·`´¿\\?¡!@ÑñÇçáàÀÁäÄéèÈÉëËíìÌÍïÏòóÒÓöÖùúÙÚüÜ]";
	var NUMERICO = "[0-9]{0,}";
	var NUMEROS_Y_LETRAS = "[A-Z_0-9]{0,}";
	var NUMERICO_NO_VACIO = "[0-9]{1,}";
	/**
	 * Valida que el formato pueda contener "," o no ,tambien es opcional el
	 * negativo y el formato number 4,2 ejemplo 11,52
	 */
	var FORMATO_4_2 = "([-]?([0-9]{1,2}(,[0-9]([0-9]){0,1}){0,1})?)";
	
	var FORMATO_10_2 = "([-]?([0-10]{1,2}(,[0-9]([0-9]){0,1}){0,1})?)";
	/**
	 * Valida que el formato pueda contener "," o no,tambien es opcional el
	 * negativo y el formato number 4,1 ejemplo 125,9
	 */
	var FORMATO_4_1 = "([-]?([0-9]{1,3}(,[0-9]{0,1}){0,1})?)";

	// GENERALES-----------------------------------------------------------------------------

	/**
	 * Valida que el formato pueda contener "," o no ,tambien es opcional el
	 * negativo y el formato number 4,2 ejemplo 11,52
	 */
	var FORMATO_4_2_FIJO = "([0-9]{1,2}(,[0-9]([0-9]){0,1}){0,1})?";
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Numéricos (longitud variable)
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	var PATTERN_N_0_2 = "\\d{0,2}";
	var PATTERN_N_0_3 = "\\d{0,3}";
	var PATTERN_N_0_4 = "\\d{0,4}";
	var PATTERN_N_0_5 = "\\d{0,5}";
	var PATTERN_N_0_6 = "\\d{0,6}";
	var PATTERN_N_0_7 = "\\d{0,7}";
	var PATTERN_N_0_8 = "^\\d{0,8}$";
	var PATTERN_N_0_9 = "\\d{0,9}";
	var PATTERN_N_0_10 = "\\d{0,10}";
	var PATTERN_N_0_15 = "\\d{0,15}";

	var PATTERN_N18 = "\\d{0,18}";
	var PATTERN_N5_6 = "\\d{5,6}";
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Numéricos (longitud fija)
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	// var PATTERN_N1 = "\\d{1}";
	// var PATTERN_N2 = "\\d{2}";
	// var PATTERN_N3 = "\\d{3}";
	// var PATTERN_N4 = "\\d{4}";
	// var PATTERN_N5 = "\\d{5}";
	// var PATTERN_N6 = "\\d{6}";
	// var PATTERN_N7 = "\\d{7}";
	// var PATTERN_N8 = "\\d{8}";
	// var PATTERN_N9 = "\\d{9}";
	// var PATTERN_N10 = "\\d{10}";
	// var PATTERN_N11 = "\\d{11}";
	// var PATTERN_N12 = "\\d{12}";
	// var PATTERN_N13 = "\\d{13}";
	// var PATTERN_N14 = "\\d{14}";
	// var PATTERN_N15 = "\\d{15}";

	// var PATTERN_N31 = "\\d{31}";
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Alfanuméricos (longitud variable)
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	var PATTERN_A_0_2 = ALFANUMERICO + "{0,2}$";
	var PATTERN_A_0_3 = ALFANUMERICO + "{0,3}$";
	var PATTERN_A_0_4 = ALFANUMERICO + "{0,4}$";
	var PATTERN_A_0_5 = ALFANUMERICO + "{1,5}$";
	var PATTERN_A_0_6 = ALFANUMERICO + "{1,6}$";
	var PATTERN_A_0_7 = ALFANUMERICO + "{1,7}$";
	var PATTERN_A_0_8 = ALFANUMERICO + "{1,8}$";
	var PATTERN_A_0_9 = ALFANUMERICO + "{1,9}$";
	var PATTERN_A_0_10 = ALFANUMERICO + "{1,10}$";
	var PATTERN_A_0_11 = ALFANUMERICO + "{1,11}$";
	var PATTERN_A_0_12 = ALFANUMERICO + "{1,12}$";
	var PATTERN_A_0_13 = ALFANUMERICO + "{1,13}$";
	var PATTERN_A_0_14 = ALFANUMERICO + "{1,14}$";
	var PATTERN_A_0_40 = ALFANUMERICO + "{1,40}$";
	var PATTERN_A_0_80 = ALFANUMERICO + "{1,80}$";

	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Alfanuméricos (longitud fija)
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	var PATTERN_AF1 = ALFANUMERICO + "{1}";
	var PATTERN_AF2 = ALFANUMERICO + "{2}";
	var PATTERN_AF3 = ALFANUMERICO + "{3}";
	var PATTERN_AF4 = ALFANUMERICO + "{4}";
	var PATTERN_AF5 = ALFANUMERICO + "{5}";
	var PATTERN_AF6 = ALFANUMERICO + "{6}";
	var PATTERN_AF7 = ALFANUMERICO + "{7}";
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Letras y numeros exclusivamente (longitud variable)
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	var PATTERN_LN2 = LETRASNUMEROS + "{1,2}";
	var PATTERN_LN3 = LETRASNUMEROS + "{1,3}";
	var PATTERN_LN4 = LETRASNUMEROS + "{1,4}";
	var PATTERN_LN5 = LETRASNUMEROS + "{1,5}";
	var PATTERN_LN6 = LETRASNUMEROS + "{1,6}";
	var PATTERN_LN7 = LETRASNUMEROS + "{1,7}";
	var PATTERN_LN8 = LETRASNUMEROS + "{1,8}";
	var PATTERN_LN9 = LETRASNUMEROS + "{1,9}";

	var PATTERN_LN10 = LETRASNUMEROS + "{1,10}";
	var PATTERN_LN50 = LETRASNUMEROS + "{1,50}";
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Letras y numeros exclusivamente (longitud fija)
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////
	var PATTERN_LN1_FIJO = LETRASNUMEROS + "{1}";
	var PATTERN_LN2_FIJO = LETRASNUMEROS + "{2}";
	var PATTERN_LN3_FIJO = LETRASNUMEROS + "{3}";
	var PATTERN_LN4_FIJO = LETRASNUMEROS + "{4}";
	var PATTERN_LN5_FIJO = LETRASNUMEROS + "{5}";
	var PATTERN_LN6_FIJO = LETRASNUMEROS + "{6}";
	var PATTERN_LN7_FIJO = LETRASNUMEROS + "{7}";
	var PATTERN_LN8_FIJO = LETRASNUMEROS + "{8}";

	var PATTERN_LN9_FIJO = LETRASNUMEROS + "{9}";
	// ////////////////////////////////
	// GENERALES
	// ////////////////////////////////
	/** alfanumerico con un tamaño de 20 y espacios en blancos */
	var PATTERN_ALF20 = IS_ALFANUMERICO + "{1,20}";
	/** alfanumerico con un tamaño de 30 y espacios en blancos */
	var PATTERN_ALF30 = IS_ALFANUMERICO + "{1,30}";
	/** alfanumerico con un tamaño de 36 y espacios en blancos */
	var PATTERN_ALF36 = IS_ALFANUMERICO + "{1,36}";
	/** alfanumerico con un tamaño de 40 y espacios en blancos */
	var PATTERN_ALF40 = IS_ALFANUMERICO + "{1,40}";
	/** alfanumerico con un tamaño de 50 y espacios en blancos */
	var PATTERN_ALF50 = IS_ALFANUMERICO + "{1,50}";
	/** alfanumerico con un tamaño de 55 y espacios en blancos */
	var PATTERN_ALF55 = IS_ALFANUMERICO + "{1,55}";
	/** alfanumerico con un tamaño de 60 y espacios en blancos */
	var PATTERN_ALF60 = IS_ALFANUMERICO + "{1,60}";
	/** alfanumerico con un tamaño de 100 y espacios en blancos */
	var PATTERN_ALF100 = IS_ALFANUMERICO + "{1,100}";
	/** alfanumerico con un tamaño de 256  y espacios en blancos */
	var PATTERN_ALF256 = IS_ALFANUMERICO + "{1,256}";
	/**
	 * 'Circunstancias 1ª, 2ª, 3ª y/o 4ª del artículo 118.1'. Obligatorio si
	 * selecciona el primer o el tercer supuesto. A20.
	 */
	var PATTERN_CIRCUNSTANCIAS_ALF20 = IS_ALFANUMERICO + "{1,20}";
	// ////////////////////////////////////////////////////
	// Alfanumerico con caracteres especiales y tamaño///
	// //////////////////////////////////////////////////
	var PATTERN_A2_ESP = ALFANUMERICO_ESPECLS.concat("{1,2}");
	var PATTERN_A3_ESP = ALFANUMERICO_ESPECLS.concat("{1,3}");
	var PATTERN_A4_ESP = ALFANUMERICO_ESPECLS.concat("{1,4}");
	var PATTERN_A5_ESP = ALFANUMERICO_ESPECLS.concat("{1,5}");
	var PATTERN_A6_ESP = ALFANUMERICO_ESPECLS.concat("{1,6}");
	var PATTERN_A7_ESP = ALFANUMERICO_ESPECLS.concat("{1,7}");
	var PATTERN_A8_ESP = ALFANUMERICO_ESPECLS.concat("{1,8}");
	var PATTERN_A9_ESP = ALFANUMERICO_ESPECLS.concat("{1,9}");
	var PATTERN_A10_ESP = ALFANUMERICO_ESPECLS.concat("{1,10}");
	var PATTERN_A15_ESP = ALFANUMERICO_ESPECLS.concat("{1,15}");
	var PATTERN_A20_ESP = ALFANUMERICO_ESPECLS.concat("{1,20}");
	var PATTERN_A25_ESP = ALFANUMERICO_ESPECLS.concat("{1,25}");
	var PATTERN_A30_ESP = ALFANUMERICO_ESPECLS.concat("{1,30}");
	var PATTERN_A32_ESP = ALFANUMERICO_ESPECLS.concat("{1,32}");
	var PATTERN_A33_ESP = ALFANUMERICO_ESPECLS.concat("{1,33}");
	var PATTERN_A36_ESP = ALFANUMERICO_ESPECLS.concat("{1,36}");
	var PATTERN_A40_ESP = ALFANUMERICO_ESPECLS.concat("{1,40}");
	var PATTERN_A50_ESP = ALFANUMERICO_ESPECLS.concat("{1,50}");
	var PATTERN_A55_ESP = ALFANUMERICO_ESPECLS.concat("{1,55}");
	var PATTERN_A60_ESP = ALFANUMERICO_ESPECLS.concat("{1,60}");
	var PATTERN_A70_ESP = ALFANUMERICO_ESPECLS.concat("{1,70}");
	var PATTERN_A80_ESP = ALFANUMERICO_ESPECLS.concat("{1,80}");
	var PATTERN_A100_ESP = ALFANUMERICO_ESPECLS.concat("{1,100}");
	var PATTERN_A200_ESP = ALFANUMERICO_ESPECLS.concat("{1,200}");
	var PATTERN_A250_ESP = ALFANUMERICO_ESPECLS.concat("{1,250}");
	var PATTERN_A500_ESP = ALFANUMERICO_ESPECLS.concat("{1,500}");
	var PATTERN_A1000_ESP = ALFANUMERICO_ESPECLS.concat("{1,1000}");
	var PATTERN_A2000_ESP = ALFANUMERICO_ESPECLS.concat("{1,2000}");

	var PATTERN_FIX_A15_A16_ESP = ALFANUMERICO_ESPECLS.concat("{15,16}");

	// ////////////////////////////////
	// ESPECIFICOS
	// ////////////////////////////////

	/**
	 * DD/MM/YYYY
	 */
	var PATTERN_FECHA_DD_MM_YYYY = "\\d{2}[/]\\d{2}[/]\\d{4}";
	/**
	 * DD/MM/YYYY
	 */
	var PATTERN_FECHA_YYYYMMDD = "(20\\d{2}|2100)(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])";
	
	/**
	 * DD/MM/YYYY COMPLETA
	 */
	var PATTERN_FECHA_DD_MM_YYYY_COMPLETA = "(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/((19|20)\\d\\d)";
	
	var PATTERN_FECHA_PERIODO	= "\\d{2}[/]\\d{4}";
	
	/**
	 * HH:MM, HH:MM:SS
	 */
	var PATTERN_FECHA_HH_MM_SS = "\\d{2}[:]\\d{2}([:]\\d{2})?";
	var PATTERN_FECHA_HH_MM = "\\d{2}[:]\\d{2}";

	/** Formato del DNI según el Proxy de Seguridad de Prosa. */
	var PATTERN_DNI = "[0-9]{9}[a-zA-Z]";

	/** Formato del NIE según el Proxy de Seguridad de Prosa. */
	var PATTERN_NIE = "(([x-zX-Z][0-9]{8})|(0[x-zX-Z][0-9]{7}))[a-zA-Z]";
	/**
	 * CIF ANNNNNNNNN (Una letra inicial y de 1 a 9 dígitos)
	 */
	var PATTERN_CIF = "[A-Z]\\d{1,9}";
	/**NIF NNNNNNNNNA (De 1 a 9 dígitos y una letra final)*/
	var PATTERN_NIF = "\\d{1,9}[A-Z]";



	
	/**
	 * Teléfono
	 * @type {String}
	 */
	var PATTERN_TELEFONO = "[9,8,7,6]\\d{8}";
	/**
	 * Constante con el pattern que representa la validación para real de tres
	 * enteros y dos decimales, con separador de puntos o de comas.
	 */
	var PATTERN_NUMERICO_5_3E_2D = "\\d{1,3}([,.]\\d{1,2})?";

	/**
	 * Constante con el pattern que representa la validación para real de cinco
	 * enteros y dos decimales, con separador de puntos o de comas.
	 */
	var PATTERN_NUMERICO_7_5E_2D = "\\d{1,5}([,.]\\d{1,2})?";

	/**
	 * Constante con el pattern que representa la validación para real de siete
	 * enteros y dos decimales, con separador de puntos o de comas.
	 */
	var PATTERN_NUMERICO_9_7E_2D = "\\d{1,7}([,.]\\d{1,2})?";

	/**
	 * Constante con el pattern que representa la validación para real de nueve
	 * enteros y dos decimales, con separador de puntos o de comas.
	 */
	var PATTERN_NUMERICO_11_9E_2D = "\\d{1,9}([,.]\\d{1,2})?";
	
	var PATTERN_NUMERICO_8E_2D = "\\d{1,8}([,.]\\d{1,2})?";
	
	/**
	 * Constante con el pattern que representa la validación para real de diez
	 * enteros y dos decimales, con separador de puntos o de comas.
	 */
	var PATTERN_NUMERICO_11_10E_2D = "\\d{1,10}([,.]\\d{1,2})?";
	
	/**	Opciones de la tabla GTB Sexo 1-Varon, 2-Mujer */
	var PATTERN_TIPO_SEXO_GTB = "[1,2]";
	
	/**	S-Si, N-No */
	var PATTERN_SI_NO = "[S,N]";
	
	var PATTERN_ALFABETICO = "[-áéíóúÁÉÍÓÚÜüa,.()-zñÑ A-Z_]+";

	/** NN-NNNNNNNNN (Codigo de provincia - Número de envío) */
	var PATTERN_PROVINCIA_ENVIO = "\\d{2}[-]\\d{9}";
	
	/** DD/MM/YYYY-NNNNNNNNN (fecha - Número de envío) */
	var PATTERN_FECHA_ENVIO = "\\d{2}[/]\\d{2}[/]\\d{4}[-]\\d{9}";