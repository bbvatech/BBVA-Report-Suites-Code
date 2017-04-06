/**
 * Pasamos de las funciones de dtm para las cookies y creamos la nuestra para registrar bien el dominio.
 * el punto clave es el uso del cookie domain para establecer todas las cookies
 * @param {string} nombre nombre de la cookie
 * @param {string} dato     dato a guardar
 * @param {string} duracion cuanto va a durar la cookie en el navegador del usuario. Sin duración dura la sesion
 *
 * Datos para traducción si existen errores.
 * a = s
 * b = dato
 * c = nombre
 * f = dominio
 * d = duracion
 * g = year
 */
window.TMS_CookieWrite = function(nombre, dato, duracion) {
    var dominio = window.s.cookieDomain,
        cooLifeTime = window.s.cookieLifetime,
        year;
    dato = "" + dato;
    cooLifeTime = cooLifeTime ? ("" + cooLifeTime).toUpperCase() : "";
    duracion && "SESSION" != cooLifeTime && "NONE" != cooLifeTime && ((year = "" != dato ? parseInt(cooLifeTime ? cooLifeTime : 0) : -60) ? (duracion = new Date,
        duracion.setTime(duracion.getTime() + 1E3 * year)) : 1 == duracion && (duracion = new Date,
        year = duracion.getYear(),
        duracion.setYear(year + 5 + (1900 > year ? 1900 : 0))));
    return nombre && "NONE" != cooLifeTime ? (window.s.d.cookie = window.s.escape(nombre) + "=" + window.s.escape("" != dato ? dato : "[[B]]") + "; path=/;" + (duracion && "SESSION" != cooLifeTime ? " expires=" + duracion.toGMTString() + ";" : "") + (dominio ? " domain=" + dominio + ";" : ""),
        window.s.cookieRead(nombre) == dato) : 0
}
