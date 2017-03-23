/****************************** PLUGINS INI **********************************/

// copy and paste implementation plug-ins here - See "Implementation Plug-ins" @
// https://marketing.adobe.com/resources/help/en_US/sc/implement/#Implementation_Plugins
// Plug-ins can then be used in the s_doPlugins(s) function above 
/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split = function(n, r) {
    for (var t, e = 0, s = new Array; n;) t = n.indexOf(r), t = t > -1 ? t : n.length, s[e++] = n.substring(0, t), n = n.substring(t + r.length);
    return s;
}

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue = function(v, c, el) {
    var s = this,
        t = new Date,
        i, j, r = '';
    t.setTime(t.getTime() + 1800000);
    if (el) {
        if (s.events) {
            i = s.split(el, ',');
            j = s.split(s.events, ',');
            for (x in i) {
                for (y in j) {
                    if (i[x] == j[y]) {
                        if (_satellite.readCookie(c)) r = _satellite.readCookie(c);
                        v ? _satellite.setCookie(c, v, t) : _satellite.setCookie(c, 'no value', t);
                        return r
                    }
                }
            }
        }
    } else {
        if (_satellite.readCookie(c)) r = _satellite.readCookie(c);
        v ? _satellite.setCookie(c, v, t) : _satellite.setCookie(c, 'no value', t);
        return r
    }
}

/*
//  getLoadTime v2.1
s.getLoadTime=new Function("opt","e1","e2",""
+"var s=this;try{if(s.alreadySetLoadTime){var remover=s.split(s.event"
+"s,',');var newEvents='';for(i=0;i<remover.length;i++){if(remover[i]"
+".indexOf(e1+'=')==-1&&remover[i]!=e2)newEvents=newEvents+remover[i]"
+"+',';}s.events=newEvents.substring(0,newEvents.length-1);return;}if"
+"(opt=='header'&&!(typeof s_preLoad==='undefined'))var loadTime=((ne"
+"w Date()).getTime()-s_preLoad);else if(opt=='browserapi'&&!(typeof "
+"performance==='undefined')){try{var loadTime=((new Date()).getTime("
+")-performance.timing.requestStart);}catch(err){return;}}else return"
+";if(loadTime/1000>500)return;if(loadTime<0)return;}catch(err){retur"
+"n;}s.events=s.apl(s.events,e1+'='+Math.round(loadTime/1000)+','+e2,"
+"',',2);var nVer=navigator.appVersion;var nAgt=navigator.userAgent;v"
+"ar browserName=navigator.appName;var fullVersion=''+parseFloat(navi"
+"gator.appVersion);var majorVersion=parseInt(navigator.appVersion,10"
+");var nameOffset,verOffset,ix;if((verOffset=nAgt.indexOf('Opera'))!"
+"=-1){browserName='Opera';fullVersion=nAgt.substring(verOffset+6);if"
+"((verOffset=nAgt.indexOf('Version'))!=-1)fullVersion=nAgt.substring"
+"(verOffset+8);}else if((verOffset=nAgt.indexOf('MSIE'))!=-1){browse"
+"rName='Microsoft Internet Explorer';fullVersion=nAgt.substring(verO"
+"ffset+5);}else if((verOffset=nAgt.indexOf('Chrome'))!=-1){browserNa"
+"me='Chrome';fullVersion=nAgt.substring(verOffset+7);}else if((verOf"
+"fset=nAgt.indexOf('Safari'))!=-1){browserName='Safari';fullVersion="
+"nAgt.substring(verOffset+7);if((verOffset=nAgt.indexOf('Version'))!"
+"=-1)fullVersion=nAgt.substring(verOffset+8);}else if((verOffset=nAg"
+"t.indexOf('Firefox'))!=-1){browserName='Firefox';fullVersion=nAgt.s"
+"ubstring(verOffset+8);}else if((nameOffset=nAgt.lastIndexOf(' ')+1)"
+"<(verOffset=nAgt.lastIndexOf('/'))){browserName=nAgt.substring(name"
+"Offset,verOffset);fullVersion=nAgt.substring(verOffset+1);if(browse"
+"rName.toLowerCase()==browserName.toUpperCase())browserName=navigato"
+"r.appName;}else{browserName='Other Unknown Browser';fullVersion='';"
+"}if((ix=fullVersion.indexOf(';'))!=-1)fullVersion=fullVersion.subst"
+"ring(0,ix);if((ix=fullVersion.indexOf(' '))!=-1)fullVersion=fullVer"
+"sion.substring(0,ix);majorVersion=parseInt(''+fullVersion,10);if(is"
+"NaN(majorVersion)){fullVersion=''+parseFloat(navigator.appVersion);"
+"majorVersion=parseInt(navigator.appVersion,10);}s.alreadySetLoadTim"
+"e=true;return browserName+' '+majorVersion;");
*/

function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''}return s_loadT}

/*
 * Plugin: getTrackingCode 2.0 (by Carlos Pliego)
 */
function getTrackingCode(){var e="",r=s.Util.getQueryParam("cid");return r.length>0&&(e=r),e}

/*
 * Plugin: getNewRepeat 1.3 (revised by Carlos Pliego) - Returns whether user is new or repeat
 */
s.getNewRepeat = function(d, cn) {
    var s = this,
        e = new Date(),
        cval, sval, ct = e.getTime();
    d = d ? d : 30;
    cn = cn ? cn : 's_nr';
    e.setTime(ct + d * 24 * 60 * 60 * 1000);
    cval = _satellite.readCookie(cn);
    if (cval == undefined || cval.length == 0) {
        _satellite.setCookie(cn, ct + '-New', e);
        return 'New';
    }
    sval = cval.split(cval, '-');
    if (ct - sval[0] < 30 * 60 * 1000 && sval[1] == 'New') {
        _satellite.setCookie(cn, ct + '-New', e);
        return 'New';
    } else {
        _satellite.setCookie(cn, ct + '-Repeat', e);
        return 'Repeat';
    }
}

/*
* Plugin: getVisitNum - version 3.0
*/
s.getVisitNum = function(tp, c, c2) {
    var s = this,
        e = new Date,
        cval, cvisit, ct = e.getTime(),
        d;
    if (!tp) { tp = 'm'; }
    if (tp == 'm' || tp == 'w' || tp == 'd') {
        eo = s.endof(tp), y = eo.getTime();
        e.setTime(y);
    } else {
        d = tp * 86400000;
        e.setTime(ct + d);
    }
    if (!c) { c = 's_vnum'; }
    if (!c2) { c2 = 's_invisit'; }
    cval = s.c_r(c);
    if (cval) {
        var i = cval.indexOf('&vn='),
            str = cval.substring(i + 4, cval.length),
            k;
    }
    cvisit = s.c_r(c2);
    if (cvisit) {
        if (str) {
            e.setTime(ct + 1800000);
            s.c_w(c2, 'true', e);
            return str;
        } else {
            return 'unknown visit number';
        }
    } else {
        if (str) {
            str++;
            k = cval.substring(0, i);
            e.setTime(k);
            s.c_w(c, k + '&vn=' + str, e);
            e.setTime(ct + 1800000);
            s.c_w(c2, 'true', e);
            return str;
        } else {
            s.c_w(c, e.getTime() + '&vn=1', e);
            e.setTime(ct + 1800000);
            s.c_w(c2, 'true', e);
            return 1;
        }
    }
}
s.dimo=function(e,t){var n=new Date(t,e+1,0);return n.getDate()};
s.endof=function(e){var t=new Date;return t.setHours(0),t.setMinutes(0),t.setSeconds(0),"m"==e?d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1:"w"==e?d=7-t.getDay():d=1,t.setDate(t.getDate()+d),t};
/* 
 * Plugin: getQueryParam 2.3 (required for getTrackingCode())
 */
/*s.getQueryParam = new Function("p", "d", "u", "" + "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati" + "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p" + ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-" + "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i=" + "=p.length?i:i+1)}return v");
s.p_gpv = new Function("k", "u", "" + "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v" + "=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf = new Function("t", "k", "" + "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T" + "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s." + "epa(v)}return ''");
*/


/***** Plugin: getTimeToComplete 1.1 (revised by Carlos Pliego) *******
s.getTimeToComplete( v, cn, e )
v is the Value - 'start' or 'stop'
cn is the Cookie Name - example: 'ttc'
e is the Expiration - days to expiration of the cookie, 0 for session
This function will return an empty string " or a value in days, hours, minutes or second
Use example:
if(s.events.indexOf('event1')>-1) s.ttc='start';
if(s.events.indexOf('event2')>-1) s.ttc='stop';
s.prop1=s.getTimeToComplete(s.ttc,'ttc',0);
*/
window.getTimeToComplete = function(v, cn, e) {
    var s = this,
        d = new Date,
        x = d,
        k;
    if (true) {
        e = e ? e : 0;
        if (v == 'start' || v == 'stop') s.ttcr = 1;
        x.setTime(x.getTime() + e * 86400000);
        if (v == 'start') {
            _satellite.setCookie(cn, d.getTime(), e ? x : 0);
            return '';
        }
        if (v == 'stop') {
            k = _satellite.readCookie(cn);
            if (!_satellite.setCookie(cn, '', d) && !k) return '';
            v = (d.getTime() - k) / 1000;
            var td = 86400,
                th = 3600,
                tm = 60,
                r = 5,
                u, un;
            if (v > td) {
                u = td;
                un = 'days';
            } else if (v > th) {
                u = th;
                un = 'hours';
            } else if (v > tm) {
                r = 2;
                u = tm;
                un = 'minutes';
            } else {
                r = .2;
                u = 1;
                un = 'seconds';
            }
            v = v * r / u;
            return (Math.round(v) / r) + ' ' + un;
        }
    }
    return '';
}
/*
* Plugin Utility: apl (Append to List) v2.5  - Uses s.inList Plugin Utility
*/
s.apl = function(l,v,d,u){var s=this;d=d?d:",";if(!s.inList(l,v,d,u))l=l?l+d+v:v;return l};
s.inList=function(l,v,d,u){if(typeof v!="string")return false;var s=this,ar=Array();if(typeof l=="string"){d=d?d:",";ar=l.split(d)}else if(typeof l=="object")ar=l;else return false;for(var i=0,arlength=ar.length;i<arlength;i++)if(typeof u!="undefined"&&u==1&&v==ar[i])return true;else if(v.toLowerCase()==ar[i].toLowerCase())return true;return false};

/*
 * Plugin: Days since last Visit 1.1 - capture time from last visit
 */
s.getDaysSinceLastVisit = function(c) {
    var s = this,
        e = new Date(),
        es = new Date(),
        cval, cval_s, cval_ss, ct = e.getTime(),
        day = 24 * 60 * 60 * 1000,
        f1, f2, f3, f4, f5;
    e.setTime(ct + 3 * 365 * day);
    es.setTime(ct + 30 * 60 * 1000);
    f0 = 'Cookies Not Supported';
    f1 = 'First Visit';
    f2 = 'More than 30 days';
    f3 = 'More than 7 days';
    f4 = 'Less than 7 days';
    f5 = 'Less than 1 day';
    cval = _satellite.readCookie(c);
    if (cval == undefined || cval.length == 0) {
        _satellite.setCookie(c, ct, e);
        _satellite.setCookie(c + '_s', f1, es);
    } else {
        var d = ct - cval;
        if (d > 30 * 60 * 1000) {
            if (d > 30 * day) {
                _satellite.setCookie(c, ct, e);
                _satellite.setCookie(c + '_s', f2, es);
            } else if (d < 30 * day + 1 && d > 7 * day) {
                _satellite.setCookie(c, ct, e);
                _satellite.setCookie(c + '_s', f3, es);
            } else if (d < 7 * day + 1 && d > day) {
                s.c_w(c, ct, e);
                _satellite.setCookie(c + '_s', f4, es);
            } else if (d < day + 1) {
                _satellite.setCookie(c, ct, e);
                s.c_w(c + '_s', f5, es);
            }
        } else {
            _satellite.setCookie(c, ct, e);
            cval_ss = _satellite.readCookie(c + '_s');
            _satellite.setCookie(c + '_s', cval_ss, es);
        }
    }
    cval_s = _satellite.readCookie(c + '_s');
    if (cval_s.length == 0) return f0;
    else if (cval_s != f1 && cval_s != f2 && cval_s != f3 && cval_s != f4 && cval_s != f5) return '';
    else return cval_s;
}

/*************************************************************************************************************

    Adobe Analytics Plug-in/Solution:
        getPercentPageViewed
        Copyright 2009-2015 Adobe Systems, Inc.

    Version:
        2.0

    Date:
        December 15, 2015

    Authors: 
        Matt Thomas, Michael Bhalla, Ken McKell

    Description: 
        Records the percent of the previous page viewed upon its initial load
        Records the highest percent of the previous page viewed as visitors scrolled through the page
        Records the highest number of vertical pixels viewed of the previous page

    Function Parameters:
        pid (optional) - current page identifier. Defaults to s.pageName OR, if s.pageName is not set, the URL
        change (optional) - set equal to '0' if you do not want to track dynamic changes to the page length

    Returns:
        array[0] contains the identifier (e.g. the previous s.pageName value)
        array[1] contains the highest percent viewed of the previous page
        array[2] contains the percent of the previous page viewed on its initial load
        array[3] contains the highest number of vertical pixels viewed of the previous page
    
        If pid is equal to "-", will return only the highest percent viewed of the previous page in a non-Array JavaScript variable (not recommended)

    Example Plugin Call (set within doPlugins function):
    
        if(s.pageName)
            //var ppvArray = s.getPercentPageViewed('','0'); will do no recalculations if the page dynamically changes its vertical height in pixels
            var ppvArray = s.getPercentPageViewed();
        if(typeof ppvArray != 'undefined' && typeof ppvArray[1] != 'undefined')
        {
            //set prop8 equal to the initial percent of the previous page viewed and the highest percent of the previous page viewed, delimited by a pipe character
            s.prop8 = 'initialpercent=' + ppvArray[2] + ' | highestpercent=' + ppvArray[1];
            //set prop9 equal to the previous page viewed
            s.prop9 = ppvArray[0];
        }
        else
            //blank out both prop8/prop9 if the plugin did not return a proper array
            s.prop8 = s.prop9 = "";
    
*************************************************************************************************************/

/*
 * Plugin: getPercentPageViewed 2.0 
 */
/*
 * Plugin: getPercentPageViewed v1.71
 */
s.getPercentPageViewed = function(n) {
    var s = this,
        W = window,
        EL = W.addEventListener,
        AE = W.attachEvent,
        E = ['load', 'unload', 'scroll', 'resize', 'zoom', 'keyup', 'mouseup', 'touchend', 'orientationchange', 'pan'];
    W.s_Obj = s;
    s_PPVid = (n == '-' ? s.pageName : n) || s.pageName || location.href;
    if (!W.s_PPVevent) {
        s.s_PPVg = function(n, r) {
            var k = 's_ppv',
                p = k + 'l',
                c = _satellite.readCookie(n || r ? k : p),
                a = _satellite.readCookie(n || r ? k : p) != undefined && c.indexOf(',') > -1 ? c.split(',', 10) : [''],
                l = a.length,
                i;
            a[0] = unescape(a[0]);
            r = r || (n && n != a[0]) || 0;
            a.length = 10;
            if (typeof a[0] != 'string') a[0] = '';
            for (i = 1; i < 10; i++) a[i] = !r && i < l ? parseInt(a[i]) || 0 : 0;
            if (l < 10 || typeof a[9] != 'string') a[9] = '';
            if (r) {
                _satellite.setCookie(p, c);
                _satellite.setCookie(k, '?')
            }
            return a
        };
        W.s_PPVevent = function(e) {
            var W = window,
                D = document,
                B = D.body,
                E = D.documentElement,
                S = window.screen || 0,
                Ho = 'offsetHeight',
                Hs = 'scrollHeight',
                Ts = 'scrollTop',
                Wc = 'clientWidth',
                Hc = 'clientHeight',
                C = 100,
                M = Math,
                J = 'object',
                N = 'number',
                s = W.s_Obj || W.s || 0;
            e = e && typeof e == J ? e.type || '' : '';
            if (!e.indexOf('on')) e = e.substring(2);
            s_PPVi = W.s_PPVi || 0;
            if (W.s_PPVt && !e) {
                clearTimeout(s_PPVt);
                s_PPVt = 0;
                if (s_PPVi < 2) s_PPVi++
            }
            if (typeof s == J) {
                var h = M.max(B[Hs] || E[Hs], B[Ho] || E[Ho], B[Hc] || E[Hc]),
                    X = W.innerWidth || E[Wc] || B[Wc] || 0,
                    Y = W.innerHeight || E[Hc] || B[Hc] || 0,
                    x = S ? S.width : 0,
                    y = S ? S.height : 0,
                    r = M.round(C * (W.devicePixelRatio || 1)) / C,
                    b = (D.pageYOffset || E[Ts] || B[Ts] || 0) + Y,
                    p = h > 0 && b > 0 ? M.round(C * b / h) : 0,
                    O = W.orientation,
                    o = !isNaN(O) ? M.abs(o) % 180 : Y > X ? 0 : 90,
                    L = e == 'load' || s_PPVi < 1,
                    a = s.s_PPVg(s_PPVid, L),
                    V = function(i, v, f, n) {
                        i = parseInt(typeof a == J && a.length > i ? a[i] : '0') || 0;
                        v = typeof v != N ? i : v;
                        v = f || v > i ? v : i;
                        return n ? v : v > C ? C : v < 0 ? 0 : v
                    };
                if (new RegExp('(iPod|iPad|iPhone)').exec(navigator.userAgent || '') && o) {
                    o = x;
                    x = y;
                    y = o
                }
                o = o ? 'P' : 'L';
                a[9] = L ? '' : a[9].substring(0, 1);
                _satellite.setCookie('s_ppv', escape(W.s_PPVid) + ',' + V(1, p, L) + ',' + (L || !V(2) ? p : V(2)) + ',' + V(3, b, L, 1) + ',' + X + ',' + Y + ',' + x + ',' + y + ',' + r + ',' + a[9] + (a[9] == o ? '' : o))
            }
            if (!W.s_PPVt && e != 'unload') W.s_PPVt = setTimeout(W.s_PPVevent, 333)
        };
        for (var f = W.s_PPVevent, i = 0; i < E.length; i++)
            if (EL) EL(E[i], f, false);
            else if (AE) AE('on' + E[i], f);
        f()
    };
    var a = s.s_PPVg();
    return !n || n == '-' ? a[1] : a
}



/*
 * Plugin: getTimeParting 3.4
 */
s.getTimeParting=function(e,t){var a,n=this;if(a=new Date("1/1/2000"),6!=a.getDay()||0!=a.getMonth())return"Data Not Available";var r,g,i,u,s,l,D,y=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d=new Date;if(t=t?t:0,t=parseFloat(t),n._tpDST){var o=n._tpDST[d.getFullYear()].split(/,/);s=new Date(o[0]+"/"+d.getFullYear()),l=new Date(o[1]+"/"+d.getFullYear()),"n"==e&&d>s&&d<l?t+=1:"s"==e&&(d>l||d<s)&&(t+=1)}return d=d.getTime()+6e4*d.getTimezoneOffset(),d=new Date(d+36e5*t),r=d.getHours(),g=d.getMinutes(),g=g<10?"0"+g:g,i=d.getDay(),u=" AM",r>=12&&(u=" PM",r-=12),0==r&&(r=12),i=y[i],D=r+":"+g+u,D+"|"+i};

/*
 * Plugin: Form Analysis 2.2 (Success, Error, Abandonment)
 */
//s.setupFormAnalysis=function(){var e=this;if(!e.fa){e.fa=new Object;var n=e.fa;n.ol=e.wd.onload,e.wd.onload=e.faol,n.uc=e.useCommerce,n.vu=e.varUsed,n.vl=n.uc?e.eventList:"",n.tfl=e.trackFormList,n.fl=e.formList,n.va=new Array("","","","")}},s.sendFormEvent=new function(e,n,o,a){var t=this,s=t.fa;e="s"==e?e:"e",s.va[0]=n,s.va[1]=o,s.va[3]="s"==e?"Success":a,t.fasl(e),s.va[1]="",s.va[3]=""},s.faol=new function(e){var n,o,a,t,s,f,r=s_c_il[r._in],l=r.fa,d=!0;if(e||(e=r.wd.event),l.os=new Array,l.ol&&(d=l.ol(e)),r.d.forms&&r.d.forms.length>0){for(a=r.d.forms.length-1;a>=0;a--)if(n=r.d.forms[a],o=n.name,f=l.tfl&&r.pt(l.fl,",","ee",o)||!l.tfl&&!r.pt(l.fl,",","ee",o))for(l.os[o]=n.onsubmit,n.onsubmit=r.faos,l.va[1]=o,l.va[3]="No Data Entered",t=0;t<n.elements.length;t++)if(el=n.elements[t],s=el.type,s&&s.toUpperCase&&(s=s.toUpperCase(),s.indexOf("FIELDSET")<0)){var i=el.onmousedown,m=el.onkeydown,u=i?i.toString():"",v=m?m.toString():"";u.indexOf(".fam(")<0&&v.indexOf(".fam(")<0&&(el.s_famd=i,el.s_fakd=m,el.onmousedown=r.fam,el.onkeydown=r.fam)}l.ul=r.wd.onunload,r.wd.onunload=r.fasl}return d},s.ee=new function(e,n){return!(!n||!n.toLowerCase)&&e.toLowerCase()==n.toLowerCase()},s.fage=new function(e,n){var o=this,a=o.fa,t=a.cnt;return t=t?t+1:1,a.cnt=t,t==n?e:""};

/*
 * Utility: AppMeasurement Compatibility v1.1
 * Define deprecated H-code s properties and methods used by legacy plugins
 */
s.wd=window;
s.fl=function(n,s){return n?(""+n).substring(0,s):n};
s.pt=function(n,r,t,i){for(var s,u,e=this,f=n,g=0,b="length";f;){if(s=f.indexOf(r),s=s<0?f[b]:s,f=f.substring(0,s),u=e[t](f,i))return u;g+=s+r[b],f=n.substring(g,n[b]),f=g<n[b]?f:""}return""};
s.rep=function(e,n,i){var t,l=new Array,r=0;if(e)if(e.split)l=e.split(n);else if(n)for(;r>=0;)t=e.indexOf(n,r),l[l.length]=e.substring(r,t<0?e.length:t),r=t,r>=0&&(r+=n.length);else for(r=0;r<e.length;r++)l[l.length]=e.substring(r,r+1);if(e="",t=l.length,l&&t>0&&(e=l[0],t>1))if(l.join)e=l.join(i);else for(r=1;r<t;r++)e+=i+l[r];return e};
s.ape=function(e){var r,s,n,t,i=this,f="0123456789ABCDEF",o="+~!*()\\",u=i.charSet,p="";if(u=u?u.toUpperCase():"",e){if(e=""+e,3==i.em)for(e=encodeURIComponent(e),r=0;r<o.length;r++)s=o.substring(r,r+1),e.indexOf(s)>=0&&(e=i.rep(e,s,"%"+s.charCodeAt(0).toString(16).toUpperCase()));else if("AUTO"==u&&"".charCodeAt){for(r=0;r<e.length;r++)if(u=e.substring(r,r+1),s=e.charCodeAt(r),s>127){for(n=0,t="";s||n<4;)t=f.substring(s%16,s%16+1)+t,s=(s-s%16)/16,n++;p+="%u"+t}else p+="+"==u?"%2B":escape(u);e=p}else e=i.rep(escape(""+e),"+","%2B");if(u&&"AUTO"!=u&&1==i.em&&e.indexOf("%u")<0&&e.indexOf("%U")<0)for(r=e.indexOf("%");r>=0;){if(r++,f.substring(8).indexOf(e.substring(r,r+1).toUpperCase())>=0)return e.substring(0,r)+"u00"+e.substring(r);r=e.indexOf("%",r)}}return e};
s.epa=function(e){var n,r,t=this;return e?(e=t.rep(""+e,"+"," "),3==t.em?(r=function(e){var n;try{n=decodeURIComponent(e)}catch(r){n=unescape(e)}return n})(e):unescape(e)):n};
s.parseUri=function(e){e&&(e+="",e=e.indexOf(":")<0&&0!=e.indexOf("//")?(0==e.indexOf("/")?"/":"//")+e:e),e=e?e+"":window.location.href;var t,n,r=document.createElement("a"),h=["href","protocol","host","hostname","port","pathname","search","hash"],a={href:e,toString:function(){return this.href}};for(r.setAttribute("href",e),t=1;t<h.length;t++)n=h[t],a[n]=r[n]||"";return delete r,n=a.pathname||"",0!=n.indexOf("/")&&(a.pathname="/"+n),a};
s.gtfs=function(){var o,r=window,n=r.location,t=document;return n.origin||(n.origin=n.protocol+"//"+n.hostname+(n.port?":"+n.port:"")),o=n!=r.parent.location?t.referrer:t.location,{location:s.parseUri(o)}};

_doFunctions(); //Ejecutamos las funciones dependientes.
/****************************** PLUGINS END **********************************/