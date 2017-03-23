/* Analytics code version: AppMeasurement JS 1.6.4, with standard 's' object.
LAST UPDATED: 06-23-2016 */
Object.defineProperty(window,'s', {
    enumerable:true,
    configurable:false,
    writable: false,
    value: new AppMeasurement()
})
//var s = new AppMeasurement();
s.abort = true; //Impide que se lance una huella en la carga de la libreria

if(_satellite &&_satellite.settings.isStaging==true)
    r_suite='bbvaban.global.2016.dev'; //dev suite 
else
    r_suite='bbvaban.global.2016'; //production suite 

//var s=s_gi(r_suite); //comment out line if setting report suite in DTM interface
//s.account=r_suite;  //comment out line if setting report suite in DTM interface
var s_account=s.account

/******** VISITOR ID SERVICE Request, assumes visitor ID service  is configured in DTM ********/
s.visitor=Visitor.getInstance("968E179156DF0B907F000101@AdobeOrg",{
    trackingServer: "bbvabancomer.d3.sc.omtrdc.net"
});

/************************** CONFIG SECTION **************************/
if(_satellite.readCookie("sessionID") === undefined || _satellite.readCookie("sessionID") == "" || _satellite.readCookie("sessionID").length == 0)
  _satellite.track('cookie sessionID');
_satellite.getVar("setSerializacion");

/* You may add or alter any code config here. */
s.debugTracking=false;
//Configuración de cookies
s.cookieDomainPeriods = "2";
if (window.location.hostname.indexOf(".com.mx") > 0) {
  s.visitor.cookieDomain = "bbvanet.com.mex"
  s.cookieDomain = "bbvanet.com.mex"
  s.cookieDomainPeriods = "5";
}

/* Link Tracking Config */
s.trackDownloadLinks=false;
s.trackExternalLinks=false;
s.forcedLinkTrackingTimeout = 1000; //Tiempo de espera para lanzar tl
s.useForcedLinkTracking = true; //Forzamos si hay una regla tl a lanzar el evento antes de redirigir al href del link
s.trackInlineStats=true;
//s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx" //optional: add your download file types here if not setting in DTM interface
//s.linkInternalFilters="javascript:,stg-www.optum.com,www.optum.com" //optional: add your internal domains here if not setting in DTM interface
s.linkLeaveQueryString=false;
s.linkTrackVars="eVar24,prop22,eVar25,eVar34,prop18,prop19,prop20";
s.linkTrackEvents="";
s.events = "";

//Europe Daylight Savings Dates for timeparting plugin
s._tpDST = {
2014:'3/30,10/26',
2015:'3/29,10/25',
2016:'3/27,10/30',
2017:'3/26,10/29',
2018:'3/25,10/28',
2019:'3/31,10/27'}

/* Form Analysis Config (should be above doPlugins section) */
s.formList = "";
s.trackFormList = true;
s.trackPageName = true;
s.useCommerce = true;
s.varUsed = "eVar2";
s.eventList = "event3,event1,event2"; //Abandon,Success,Error

/* uncomment below to use doPlugins */
s.usePlugins=true;
function s_doPlugins(s) {
    // use implementation plug-ins that are defined below
    // in this section. For example, if you copied the append
    // list plug-in code below, you could call:
    // s.events=s.apl(s.events,"event1",",",1);
    // s.setupFormAnalysis();
    // s.eVar99 = s.getLoadTime("browserapi","event220","event221");
    // The getLoadTime plugin will use the browser api method.
    // eVar99 will be set to the browser and version
    // event220 will be set to the seconds it took to load the page
    // event221 will be set to the number of pages loaded
    s.prop22 = s_getLoadTime();
    //s.eVar24 = s.getDaysSinceLastVisit("s_lv"); //Se elimina por decisión de negocio
    s.eVar25 =  s.getNewRepeat(30, "s_nr");
    s.campaign = s.Util.getQueryParam("cid");
    s.eVar34 =  s.getVisitNum();

    var ppvArray = s.getPercentPageViewed(_satellite.getVar('pageName'));
    if (ppvArray != undefined) {
        //s.prop21 = ppvArray[0] //contains the previous page name
        s.prop18 = ppvArray[1] //contains the highest percent viewed of the previous page
        s.prop19 = ppvArray[2] //contains the percent of the previous page viewed on its initial load
        s.prop20 = ppvArray[3] //contains the highest number of vertical pixels viewed of the previous page
    }
    if (typeof(mboxCurrent)!="undefined" && s.visitor != undefined && s.visitor._supplementalDataIDCurrent == "" && s.visitor._supplementalDataIDLast != "") {
        s.visitor._supplementalDataIDCurrent = s.visitor._supplementalDataIDLast;
        s.visitor._supplementalDataIDLast = "";
        // s.visitor._supplementalDataIDCurrentConsumed = s.visitor._supplementalDataIDLastConsumed;
        s.visitor._supplementalDataIDLastConsumed = {};
    }

}
s.doPlugins = s_doPlugins;
s.loadModule("Media");
/**********************MEDIA CONFIG INI*********************/
var video_obj = null;
var video_length = 0;
var video_name = 'Movie name ' + new Date().getTime();


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player = [];
//onYouTubeIframeAPIReadyDTM();

function getNumVideos(event) {
    var idActive = event.target.a.id;
    for (var i = 0; i < player.length; i++) {
        if (player[i].a.id == idActive)
            return i;
    }
}

function onYouTubeIframeAPIReadyDTM() {
    // var num_videos = 0;
    // console.log('*** iFrame embed onYouTubeIframeAPIReadyDTM');
    var videoFrames = $('iframe[id*="player"');
    for (var i = videoFrames.length - 1; i >= 0; i--) {
        player[i] = new YT.Player(videoFrames[i].id, {
            events: {
                'onReady': onPlayerReadyDTM,
                'onStateChange': onPlayerStateChangeDTM
            }
        });
    }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReadyDTM(event) {
    var num = getNumVideos(event);
    // console.log('*** iFrame embed onPlayerReadyDTM ', player[num]);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChangeDTM(event) {
    var idActive = event.target.a.id;
    var num = getNumVideos(event);
    // console.log('*** iFrame embed onPlayerStateChangeDTM ' + event.data);//+ ' --- YT Player state ' + YT.PlayerState.PLAYING, player[num].getCurrentTime(), player[num]);

    video_name = s.eVar9 = _satellite.getVar('nameOfVideoDisplayed');
    s.eVar1 = _satellite.getVar('pageName');
    //video_length = player[num].getDuration();
    //var obj=$(event.target).attr('a');
    var srcVideo = event.target.a.src;
    if(srcVideo.indexOf("youtube.com") != -1){
    srcVideo = srcVideo.substring(srcVideo.indexOf("/embed/")+7);
    srcVideo = srcVideo.substring(0, srcVideo.indexOf("?"));
    }
    digitalData.page.pageActivity.nameOfVideoDisplayed = srcVideo;
    //console.log('video visualizado');
    // event.data == YT.PlayerState.ENDED;

    // if(event.data === YT.PlayerState.PLAYING && (event.data === 1 || event.data < 0)){
    if ((event.data === 1 || event.data < 0) && YT.PlayerState.PLAYING === 1) {
        //*-* PLAY
        // console.log("*-* Player is on play mode " + event.data + ' ' + player[num].getCurrentTime(), s);
        if (player[num].getCurrentTime() === 0) {
            s.Media.open(video_name, video_length, 'Youtube Object Embed');
            s.event160 = player[num].getCurrentTime();
            s.Media.play(video_name, player[num].getCurrentTime());
        } else {
            s.event160 = player[num].getCurrentTime();
            s.Media.play(video_name, player[num].getCurrentTime());
        }
    } else if (event.data === 2) {
        //*-* PAUSE --- CAN USE THIS FOR ENDING TOO =-- check on time -5 sec!!
        // console.log("*-* Player is on pause mode " + event.data + ' ' + player[num].getCurrentTime());
        s.event160 = player[num].getCurrentTime();
        s.Media.stop(video_name, player[num].getCurrentTime()); //this will cause the monitor to have media.event='STOP'
    } else if (event.data === 3) {
        //*-* SKIPPING
        // console.log("*-* Player is on skipping mode " + event.data);
        s.event160 = player[num].getCurrentTime();
        s.Media.stop(video_name, player[num].getCurrentTime()); //this will cause the monitor to have media.event='STOP'
    } else if (event.data === 0) {
        //*-* Completed
        // console.log("*-* Player has been completed " + event.data);
        s.event160 = player[num].getCurrentTime();
        s.Media.stop(video_name, player[num].getCurrentTime());
        s.Media.close(video_name);
    }
}

// /*********Media Module Calls**************/
s.Media.onLoad = function() {
  // console.log('**** MEDIA module loaded');
  /*Configure Media Module Functions */
  if (document.getElementsByTagName('video').length > 0 ){//&& document.URL.search(/.*\/bancadigital\.bancomer\.com\/wallet/gi) == -1) {
      s.Media.autoTrack = true;
      s.Media.playerName = "HTML 5 video";
      s.eVar9 = _satellite.getVar('nameOfVideoDisplayed');
  } else {
      s.Media.autoTrack = false;
      s.Media.playerName = "You tube Player";
  }
  s.Media.trackWhilePlaying = true;
  // s.Media.trackSecond=0; // set to 30 if milestone in seconds
  // console.log('**** MEDIA module loaded1');
  s.Media.completeByCloseOffset = true; //*** Enabled if you want to allow the video to be completed a few seconds before the actual end of the video
  s.Media.completeCloseOffsetThreshold = 10;
  //**NOTE: Add additional data which will be pushed either in the plugin or on the page
  //**NOTE: Add additional data which will be pushed either in the plugin or on the page
  //event155  Video starts (e155)
  // event156    Video 25% (e156)
  // event157    Video 50% (e157)
  // event158    Video 75% (e158)
  // event159    Video completes (e159)
  // event160    Video time viewed (e160)
  // eVar9   Video content (v9)
  s.Media.trackEvents = "event155,event156,event157,event158,event159,event160";
  s.Media.trackVars = "events,eVar9,eVar1";
  s.Media.trackMilestones = "1,25,50,75";
  s.Media.segmentByMilestones = false;
  s.Media.trackUsingContextData = true;
  // console.log('**** MEDIA module loaded2');
  s.Media.contextDataMapping = {
      "a.media.name": "eVar9",
      "a.media.segment": "",
      "a.contentType": "",
      "a.media.timePlayed": "event160",
      "a.media.view": "",
      "a.media.segmentView": "",
      "a.media.complete": "event159",
      "a.media.milestones": {
          1: "event155",
          25: "event156",
          50: "event157",
          75: "event158"
      }
  }
  // console.log('**** MEDIA module loaded3');
  /*
   * can use the below IF wanna pass additional data --- Need to update s.Media.trackVars --- BUT we could potential set it on above var and avoid using the below
   */
  s.Media.monitor = function(s, media) {
      // console.log('**** MEDIA module loaded4');
      // console.log(media);
      //https://marketing.adobe.com/resources/help/en_US/sc/appmeasurement/video/video_mediamonitor.html
      // console.log('in the video monitor, can help add additional evar, prop or events', media);
      if (media.event == "OPEN") {
          s.contextData = s.Media.contextDataMapping
          s.Media.track(media.name);
      } else if (media.event == "MILESTONE") {
          s.contextData = s.Media.contextDataMapping
          s.Media.track(media.name);
      } else if (media.event == "CLOSE") {
          s.contextData = s.Media.contextDataMapping
          s.Media.track(media.name);
      }
  }
}

/**********************MEDIA CONFIG END*********************/
/**********************FUNCIONES INI********************/
//Elimina los acentos y pasa a minusculas
var formatearTexto=function(){for(var r="ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",a="AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",o={},t=0,e=r.length;t<e;t++)o[r.charAt(t)]=a.charAt(t);return function(r){r=r.toLowerCase(r);for(var a=[],t=0,e=r.length;t<e;t++){var n=r.charAt(t);o.hasOwnProperty(r.charAt(t))?a.push(o[n]):a.push(n)}return a.join("")}}();

/**********************FUNCIONES FIN********************/

/****************************** PLUGINS INI **********************************/

// copy and paste implementation plug-ins here - See "Implementation Plug-ins" @
// https://marketing.adobe.com/resources/help/en_US/sc/implement/#Implementation_Plugins
// Plug-ins can then be used in the s_doPlugins(s) function above 

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

// function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''}return s_loadT}
function s_getLoadTime() {
    if (typeof(performance) !== 'undefined' && typeof(performance.timing) == 'object') {
        var timing = performance.timing;

        // fall back to less accurate milestones
        var startTime = performance.timing.redirectStart ||
            performance.timing.fetchStart ||
            performance.timing.requestStart;
        var endTime = performance.timing.domContentLoadedEventEnd ||
            performance.timing.domInteractive ||
            performance.timing.domComplete ||
            performance.timing.loadEventEnd;

        if (startTime && endTime && (startTime < endTime)) {
            // console.log((endTime - startTime)/100);
            return Math.round((endTime - startTime)/100);
        }
    }
    return 'data not available';
}
/*
 * Plugin: getTrackingCode 2.0 (by Carlos Pliego)
 */

function getTrackingCode() {
    var res = "";
    var cid = s.getQueryParam("cid");

    if (cid.length > 0) {
        res = cid;
    }

    return res;
}

/*
 * Plugin: getNewRepeat 1.3 (revised by Carlos Pliego) - Returns whether user is new or repeat
 */
/*s.getNewRepeat = new Function("d", "cn", "" +
 "var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:" +
 "'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length=" +
 "=0){s.c_w(cn,ct+'-New',e);return'New';}sval=cval.split(cval,'-');if(ct" +
 "-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N" +
 "ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");*/
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
  sval = cval.split('-');
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
s.getVisitNum=new Function("tp","c","c2",""
+"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
+"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
+"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
+"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
+"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
+"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
+";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo=new Function("m","y",""
+"var d=new Date(y,m+1,0);return d.getDate();");
s.endof=new Function("x",""
+"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
+"t;");

/* 
 * Plugin: getQueryParam 2.3 (required for getTrackingCode())
 */
s.getQueryParam = new Function("p", "d", "u", "" + "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati" + "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p" + ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-" + "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i=" + "=p.length?i:i+1)}return v");
s.p_gpv = new Function("k", "u", "" + "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v" + "=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf = new Function("t", "k", "" + "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T" + "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s." + "epa(v)}return ''");


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
s.apl=function(l,v,d,u){var s=this;d=d?d:",";if(!s.inList(l,v,d,u))l=l?l+d+v:v;return l};
s.inList=function(l,v,d,u){if(typeof v!="string")return false;var s=this,ar=Array();if(typeof l=="string"){d=d?d:",";ar=l.split(d)}else if(typeof l=="object")ar=l;else return false;for(var i=0,arlength=ar.length;i<arlength;i++)if(typeof u!="undefined"&&u==1&&v==ar[i])return true;else if(v.toLowerCase()==ar[i].toLowerCase())return true;return false};

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: Days since last Visit 1.1 - capture time from last visit
 */
/*s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");
*/


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
 * Plugin: getPercentPageViewed 2.0 rc.0.01 Félix G.
 */
s.handlePPVevents = function() {
    if (s_c_il) {
        for (var e = 0, n = s_c_il.length; e < n; e++)
            if ("undefined" != typeof s_c_il[e] && s_c_il[e]._c && "s_c" == s_c_il[e]._c) {
                var t = s_c_il[e];
                break }
        if (t && t.getPPVid) {
            var d = Math.max(Math.max(null != t.d.body ? t.d.body.scrollHeight : 0, t.d.documentElement.scrollHeight), Math.max(null != t.d.body ? t.d.body.offsetHeight : 0, t.d.documentElement.offsetHeight), Math.max(null != t.d.body ? t.d.body.clientHeight : 0, t.d.documentElement.clientHeight)),
                i = window.innerHeight || (t.d.documentElement.clientHeight || null != t.d.body ? t.d.body.clientHeight : 0),
                l = window.pageYOffset || window.document.documentElement.scrollTop || window.document.body!=null?window.document.body.scrollTop:0,
                a = l + i,
                o = Math.min(Math.round(a / d * 100), 100),
                c = "";!t.c_r("tp") || decodeURIComponent(t.c_r("s_ppv").split(",")[0]) != t.getPPVid || "1" == t.ppvChange && t.c_r("tp") && d != t.c_r("tp") ? (t.c_w("tp", d), t.c_w("s_ppv", "")) : c = t.c_r("s_ppv");
            var s = c && c.indexOf(",") > -1 ? c.split(",", 4) : [],
                h = s.length > 0 ? s[0] : escape(t.getPPVid),
                p = s.length > 1 ? parseInt(s[1]) : 0,
                r = s.length > 2 ? parseInt(s[2]) : o,
                P = s.length > 3 ? parseInt(s[3]) : 0,
                v = o > 0 ? h + "," + (o > p ? o : p) + "," + r + "," + (a > P ? a : P) : "";
            t.c_w("s_ppv", v) } } }, s.getPercentPageViewed = function(e, n) {
    var t = this,
        d = !t.getPPVid;
    if (e = e ? e : t.pageName ? t.pageName : document.location.href, t.ppvChange = n ? n : "1", "undefined" != typeof t.linkType && "0" != t.linkType && "" != t.linkType && "e" != t.linkType) return "";
    var i = t.c_r("s_ppv"),
        l = i.indexOf(",") > -1 ? i.split(",", 4) : [];
    if (l && l.length < 4) {
        for (var a = 3; a > 0; a--) l[a] = a < l.length ? l[a - 1] : "";
        l[0] = "" }
    return l && (l[0] = unescape(l[0])), t.getPPVid && t.getPPVid == e || (t.getPPVid = e, t.c_w("s_ppv", escape(t.getPPVid)), t.handlePPVevents()), d && (window.addEventListener ? (window.addEventListener("load", t.handlePPVevents, !1), window.addEventListener("click", t.handlePPVevents, !1), window.addEventListener("scroll", t.handlePPVevents, !1), window.addEventListener("resize", t.handlePPVevents, !1)) : window.attachEvent && (window.attachEvent("onload", t.handlePPVevents), window.attachEvent("onclick", t.handlePPVevents), window.attachEvent("onscroll", t.handlePPVevents), window.attachEvent("onresize", t.handlePPVevents))), "-" != e ? l : l[1] };
/*
 * Plugin: getTimeParting 3.4
 */
s.getTimeParting=new Function("h","z",""
+"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+"h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['"
+"Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda"
+"y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp"
+"DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea"
+"r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)"
+"{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT"
+"imezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getHours();M=d"
+".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U=' AM';if(H>=12){U=' P"
+"M';H=H-12;}if(H==0){H=12;}D=da[D];tm=H+':'+M+U;return(tm+'|'+D);}");

/*
 * Plugin: Form Analysis 2.2 (Success, Error, Abandonment)
 */
s.setupFormAnalysis = new Function("" + "var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s." + "wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.even" + "tList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('',''" + ",'','')}");
s.sendFormEvent = new Function("t", "pn", "fn", "en", "" + "var s=this,f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='" + "s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol = new Function("e", "" + "var s=s_c_il[" + s._in + "],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd." + "event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.leng" + "th>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name" + ";tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);" + "if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='" + "No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.element" + "s[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();if(t.indexOf" + "('FIELDSET')<0){var md=el.onmousedown,kd=el.onkeydown,omd=md?md.toS" + "tring():'',okd=kd?kd.toString():'';if(omd.indexOf('.fam(')<0&&okd.i" + "ndexOf('.fam(')<0){el.s_famd=md;el.s_fakd=kd;el.onmousedown=s.fam;e" + "l.onkeydown=s.fam}}}}}}f.ul=s.wd.onunload;s.wd.onunload=s.fasl;}ret" + "urn r;");
s.faos = new Function("e", "" + "var s=s_c_il[" + s._in + "],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.v" + "u]='';f.va[1]='';f.va[3]='';}su=f.os[this.name];return su?su(e):tru" + "e;");
s.fasl = new Function("e", "" + "var s=s_c_il[" + s._in + "],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPag" + "eName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.path" + "name:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]=" + "'Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]" + "='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]" + "!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackV" + "ars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars=" + "ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lt" + "e=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,'" + ",','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s" + ".events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f." + "vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;var faLink=new Object" + "();faLink.href='#';s.tl(faLink,'o','Form Analysis');s[f.vu]='';s.us" + "ePlugins=up}return f.ul&&e!='e'&&e!='s'?f.ul(e):true;");
s.fam = new Function("e", "" + "var s=s_c_il[" + s._in + "],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLas" + "tChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this." + "form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e." + "which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOW" + "N'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIM" + "AGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=e" + "n;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1" + "){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va[" + "1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s" + "_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fak" + "d(e);");
s.ee = new Function("e", "n", "" + "return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage = new Function("e", "a", "" + "var s=this,f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");


/*
 * Utility: AppMeasurement Compatibility v1.1
 * Define deprecated H-code s properties and methods used by legacy plugins
 */
s.wd=window;
s.fl=new Function("x","l",""
+"return x?(''+x).substring(0,l):x");
s.pt=new Function("x","d","f","a",""
+"var s=this,t=x,z=0,y,r,l='length';while(t){y=t.indexOf(d);y=y<0?t[l"
+"]:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d[l];t=x.subs"
+"tring(z,x[l]);t=z<x[l]?t:''}return''");
s.rep=new Function("x","o","n",""
+"var a=new Array,i=0,j;if(x){if(x.split)a=x.split(o);else if(!o)for("
+"i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){"
+"j=x.indexOf(o,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i"
+">=0)i+=o.length}}x='';j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.joi"
+"n)x=a.join(n);else for(i=1;i<j;i++)x+=n+a[i]}}return x");
s.ape=new Function("x",""
+"var s=this,h='0123456789ABCDEF',f='+~!*()\\'',i,c=s.charSet,n,l,e,y"
+"='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComp"
+"onent(x);for(i=0;i<f.length;i++){n=f.substring(i,i+1);if(x.indexOf("
+"n)>=0)x=s.rep(x,n,'%'+n.charCodeAt(0).toString(16).toUpperCase())}}"
+"else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.sub"
+"string(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e="
+"h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='"
+"+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2"
+"B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0)"
+"{i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.subst"
+"ring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.subst"
+"ring(i);i=x.indexOf('%',i)}}}return x");
s.epa=new Function("x",""
+"var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Fu"
+"nction('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape"
+"(x)}return y');return tcf(x)}else return unescape(x)}return y");
s.parseUri=new Function("u",""
+"if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')"
+"==0?'/':'//')+u:u}u=u?u+'':window.location.href;var e,a=document.cr"
+"eateElement('a'),l=['href','protocol','host','hostname','port','pat"
+"hname','search','hash'],p,r={href:u,toString:function(){return this"
+".href}};a.setAttribute('href',u);for(e=1;e<l.length;e++){p=l[e];r[p"
+"]=a[p]||''}delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathnam"
+"e='/'+p;return r");
s.gtfs=new Function(""
+"var w=window,l=w.location,d=document,u;if(!l.origin)l.origin=l.prot"
+"ocol+'//'+l.hostname+(l.port?':'+l.port:'');u=l!=w.parent.location?"
+"d.referrer:d.location;return{location:s.parseUri(u)}");
/****************************** PLUGINS INI **********************************/
s.doPlugins=s_doPlugins;
/****************************** MODULES *****************************/

/***** Media Module v 1.8 ****/
function AppMeasurement_Module_Media(q){var b=this;b.s=q;q=window;q.s_c_in||(q.s_c_il=[],q.s_c_in=0);b._il=q.s_c_il;b._in=q.s_c_in;b._il[b._in]=b;q.s_c_in++;b._c="s_m";b.list=[];b.open=function(d,c,e,k){var f={},a=new Date,l="",g;c||(c=-1);if(d&&e){b.list||(b.list={});b.list[d]&&b.close(d);k&&k.id&&(l=k.id);if(l)for(g in b.list)!Object.prototype[g]&&b.list[g]&&b.list[g].R==l&&b.close(b.list[g].name);f.name=d;f.length=c;f.offset=0;f.e=0;f.playerName=b.playerName?b.playerName:e;f.R=l;f.C=0;f.a=0;f.timestamp=
Math.floor(a.getTime()/1E3);f.k=0;f.u=f.timestamp;f.c=-1;f.n="";f.g=-1;f.D=0;f.I={};f.G=0;f.m=0;f.f="";f.B=0;f.L=0;f.A=0;f.F=0;f.l=!1;f.v="";f.J="";f.K=0;f.r=!1;f.H="";f.complete=0;f.Q=0;f.p=0;f.q=0;b.list[d]=f}};b.openAd=function(d,c,e,k,f,a,l,g){var h={};b.open(d,c,e,g);if(h=b.list[d])h.l=!0,h.v=k,h.J=f,h.K=a,h.H=l};b.M=function(d){var c=b.list[d];b.list[d]=0;c&&c.monitor&&clearTimeout(c.monitor.interval)};b.close=function(d){b.i(d,0,-1)};b.play=function(d,c,e,k){var f=b.i(d,1,c,e,k);f&&!f.monitor&&
(f.monitor={},f.monitor.update=function(){1==f.k&&b.i(f.name,3,-1);f.monitor.interval=setTimeout(f.monitor.update,1E3)},f.monitor.update())};b.click=function(d,c){b.i(d,7,c)};b.complete=function(d,c){b.i(d,5,c)};b.stop=function(d,c){b.i(d,2,c)};b.track=function(d){b.i(d,4,-1)};b.P=function(d,c){var e="a.media.",k=d.linkTrackVars,f=d.linkTrackEvents,a="m_i",l,g=d.contextData,h;c.l&&(e+="ad.",c.v&&(g["a.media.name"]=c.v,g[e+"pod"]=c.J,g[e+"podPosition"]=c.K),c.G||(g[e+"CPM"]=c.H));c.r&&(g[e+"clicked"]=
!0,c.r=!1);g["a.contentType"]="video"+(c.l?"Ad":"");g["a.media.channel"]=b.channel;g[e+"name"]=c.name;g[e+"playerName"]=c.playerName;0<c.length&&(g[e+"length"]=c.length);g[e+"timePlayed"]=Math.floor(c.a);0<Math.floor(c.a)&&(g[e+"timePlayed"]=Math.floor(c.a));c.G||(g[e+"view"]=!0,a="m_s",b.Heartbeat&&b.Heartbeat.enabled&&(a=c.l?b.__primetime?"mspa_s":"msa_s":b.__primetime?"msp_s":"ms_s"),c.G=1);c.f&&(g[e+"segmentNum"]=c.m,g[e+"segment"]=c.f,0<c.B&&(g[e+"segmentLength"]=c.B),c.A&&0<c.a&&(g[e+"segmentView"]=
!0));!c.Q&&c.complete&&(g[e+"complete"]=!0,c.S=1);0<c.p&&(g[e+"milestone"]=c.p);0<c.q&&(g[e+"offsetMilestone"]=c.q);if(k)for(h in g)Object.prototype[h]||(k+=",contextData."+h);l=g["a.contentType"];d.pe=a;d.pev3=l;var q,s;if(b.contextDataMapping)for(h in d.events2||(d.events2=""),k&&(k+=",events"),b.contextDataMapping)if(!Object.prototype[h]){a=h.length>e.length&&h.substring(0,e.length)==e?h.substring(e.length):"";l=b.contextDataMapping[h];if("string"==typeof l)for(q=l.split(","),s=0;s<q.length;s++)l=
q[s],"a.contentType"==h?(k&&(k+=","+l),d[l]=g[h]):"view"==a||"segmentView"==a||"clicked"==a||"complete"==a||"timePlayed"==a||"CPM"==a?(f&&(f+=","+l),"timePlayed"==a||"CPM"==a?g[h]&&(d.events2+=(d.events2?",":"")+l+"="+g[h]):g[h]&&(d.events2+=(d.events2?",":"")+l)):"segment"==a&&g[h+"Num"]?(k&&(k+=","+l),d[l]=g[h+"Num"]+":"+g[h]):(k&&(k+=","+l),d[l]=g[h]);else if("milestones"==a||"offsetMilestones"==a)h=h.substring(0,h.length-1),g[h]&&b.contextDataMapping[h+"s"][g[h]]&&(f&&(f+=","+b.contextDataMapping[h+
"s"][g[h]]),d.events2+=(d.events2?",":"")+b.contextDataMapping[h+"s"][g[h]]);g[h]&&(g[h]=0);"segment"==a&&g[h+"Num"]&&(g[h+"Num"]=0)}d.linkTrackVars=k;d.linkTrackEvents=f};b.i=function(d,c,e,k,f){var a={},l=(new Date).getTime()/1E3,g,h,q=b.trackVars,s=b.trackEvents,t=b.trackSeconds,u=b.trackMilestones,v=b.trackOffsetMilestones,w=b.segmentByMilestones,x=b.segmentByOffsetMilestones,p,n,r=1,m={},y;b.channel||(b.channel=b.s.w.location.hostname);if(a=d&&b.list&&b.list[d]?b.list[d]:0)if(a.l&&(t=b.adTrackSeconds,
u=b.adTrackMilestones,v=b.adTrackOffsetMilestones,w=b.adSegmentByMilestones,x=b.adSegmentByOffsetMilestones),0>e&&(e=1==a.k&&0<a.u?l-a.u+a.c:a.c),0<a.length&&(e=e<a.length?e:a.length),0>e&&(e=0),a.offset=e,0<a.length&&(a.e=a.offset/a.length*100,a.e=100<a.e?100:a.e),0>a.c&&(a.c=e),y=a.D,m.name=d,m.ad=a.l,m.length=a.length,m.openTime=new Date,m.openTime.setTime(1E3*a.timestamp),m.offset=a.offset,m.percent=a.e,m.playerName=a.playerName,m.mediaEvent=0>a.g?"OPEN":1==c?"PLAY":2==c?"STOP":3==c?"MONITOR":
4==c?"TRACK":5==c?"COMPLETE":7==c?"CLICK":"CLOSE",2<c||c!=a.k&&(2!=c||1==a.k)){f||(k=a.m,f=a.f);if(c){1==c&&(a.c=e);if((3>=c||5<=c)&&0<=a.g&&(r=!1,q=s="None",a.g!=e)){h=a.g;h>e&&(h=a.c,h>e&&(h=e));p=u?u.split(","):0;if(0<a.length&&p&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h/a.length*100<g&&a.e>=g&&(r=!0,n=p.length,m.mediaEvent="MILESTONE",a.p=m.milestone=g);if((p=v?v.split(","):0)&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h<g&&e>=g&&(r=!0,n=p.length,m.mediaEvent=
"OFFSET_MILESTONE",a.q=m.offsetMilestone=g)}if(a.L||!f){if(w&&u&&0<a.length){if(p=u.split(","))for(p.push("100"),n=h=0;n<p.length;n++)if(g=p[n]?parseFloat(""+p[n]):0)a.e<g&&(k=n+1,f="M:"+h+"-"+g,n=p.length),h=g}else if(x&&v&&(p=v.split(",")))for(p.push(""+(0<a.length?a.length:"E")),n=h=0;n<p.length;n++)if((g=p[n]?parseFloat(""+p[n]):0)||"E"==p[n]){if(e<g||"E"==p[n])k=n+1,f="O:"+h+"-"+g,n=p.length;h=g}f&&(a.L=!0)}(f||a.f)&&f!=a.f&&(a.F=!0,a.f||(a.m=k,a.f=f),0<=a.g&&(r=!0));(2<=c||100<=a.e)&&a.c<e&&
(a.C+=e-a.c,a.a+=e-a.c);if(2>=c||3==c&&!a.k)a.n+=(1==c||3==c?"S":"E")+Math.floor(e),a.k=3==c?1:c;!r&&0<=a.g&&3>=c&&(t=t?t:0)&&a.a>=t&&(r=!0,m.mediaEvent="SECONDS");a.u=l;a.c=e}if(!c||3>=c&&100<=a.e)2!=a.k&&(a.n+="E"+Math.floor(e)),c=0,q=s="None",m.mediaEvent="CLOSE";7==c&&(r=m.clicked=a.r=!0);if(5==c||b.completeByCloseOffset&&(!c||100<=a.e)&&0<a.length&&e>=a.length-b.completeCloseOffsetThreshold)r=m.complete=a.complete=!0;l=m.mediaEvent;"MILESTONE"==l?l+="_"+m.milestone:"OFFSET_MILESTONE"==l&&(l+=
"_"+m.offsetMilestone);a.I[l]?m.eventFirstTime=!1:(m.eventFirstTime=!0,a.I[l]=1);m.event=m.mediaEvent;m.timePlayed=a.C;m.segmentNum=a.m;m.segment=a.f;m.segmentLength=a.B;b.monitor&&4!=c&&b.monitor(b.s,m);b.Heartbeat&&b.Heartbeat.enabled&&0<=a.g&&(r=!1);0==c&&b.M(d);r&&a.D==y&&(d={contextData:{}},d.linkTrackVars=q,d.linkTrackEvents=s,d.linkTrackVars||(d.linkTrackVars=""),d.linkTrackEvents||(d.linkTrackEvents=""),b.P(d,a),d.linkTrackVars||(d["!linkTrackVars"]=1),d.linkTrackEvents||(d["!linkTrackEvents"]=
1),b.s.track(d),a.F?(a.m=k,a.f=f,a.A=!0,a.F=!1):0<a.a&&(a.A=!1),a.n="",a.p=a.q=0,a.a-=Math.floor(a.a),a.g=e,a.D++)}return a};b.O=function(d,c,e,k,f){var a=0;if(d&&(!b.autoTrackMediaLengthRequired||c&&0<c)){if(b.list&&b.list[d])a=1;else if(1==e||3==e)b.open(d,c,"HTML5 Video",f),a=1;a&&b.i(d,e,k,-1,0)}};b.attach=function(d){var c,e,k;d&&d.tagName&&"VIDEO"==d.tagName.toUpperCase()&&(b.o||(b.o=function(c,a,d){var e,h;b.autoTrack&&(e=c.currentSrc,(h=c.duration)||(h=-1),0>d&&(d=c.currentTime),b.O(e,h,a,
d,c))}),c=function(){b.o(d,1,-1)},e=function(){b.o(d,1,-1)},b.j(d,"play",c),b.j(d,"pause",e),b.j(d,"seeking",e),b.j(d,"seeked",c),b.j(d,"ended",function(){b.o(d,0,-1)}),b.j(d,"timeupdate",c),k=function(){d.paused||d.ended||d.seeking||b.o(d,3,-1);setTimeout(k,1E3)},k())};b.j=function(b,c,e){b.attachEvent?b.attachEvent("on"+c,e):b.addEventListener&&b.addEventListener(c,e,!1)};void 0==b.completeByCloseOffset&&(b.completeByCloseOffset=1);void 0==b.completeCloseOffsetThreshold&&(b.completeCloseOffsetThreshold=
1);b.Heartbeat={};b.N=function(){var d,c;if(b.autoTrack&&(d=b.s.d.getElementsByTagName("VIDEO")))for(c=0;c<d.length;c++)b.attach(d[c])};b.j(q,"load",b.N)}

/******** Integrate Module v 1.8 *********/
function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
(b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}

/***************** Audience module 1.8 *************/
function AppMeasurement_Module_AudienceManagement(d){var a=this;a.s=d;var b=window;b.s_c_in||(b.s_c_il=[],b.s_c_in=0);a._il=b.s_c_il;a._in=b.s_c_in;a._il[a._in]=a;b.s_c_in++;a._c="s_m";a.setup=function(c){b.DIL&&c&&(c.disableDefaultRequest=!0,c.disableScriptAttachment=!0,c.disableCORS=!0,c.secureDataCollection=!1,a.instance=b.DIL.create(c),a.tools=b.DIL.tools)};a.isReady=function(){return a.instance?!0:!1};a.getEventCallConfigParams=function(){return a.instance&&a.instance.api&&a.instance.api.getEventCallConfigParams?
a.instance.api.getEventCallConfigParams():{}};a.passData=function(b){a.instance&&a.instance.api&&a.instance.api.passData&&a.instance.api.passData(b)}}
"function"!==typeof window.DIL&&(window.DIL=function(a,c){var e=[],d,g;a!==Object(a)&&(a={});var h,l,t,v,p,n,w,E,r,A,L,B,C,F;h=a.partner;l=a.containerNSID;t=!!a.disableDestinationPublishingIframe;v=a.iframeAkamaiHTTPS;p=a.mappings;n=a.uuidCookie;w=!0===a.enableErrorReporting;E=a.visitorService;r=a.declaredId;A=!0===a.removeFinishedScriptsAndCallbacks;L=!0===a.delayAllUntilWindowLoad;B=!0===a.disableIDSyncs;C="undefined"===typeof a.secureDataCollection||!0===a.secureDataCollection;F=!0===a.useCORSOnly;
var M,N,I,G,O,P,Q,R;M=!0===a.disableScriptAttachment;N=!0===a.disableDefaultRequest;I=a.afterResultForDefaultRequest;G=a.dpIframeSrc;O=!0===a.testCORS;P=!0===a.useJSONPOnly;Q=a.visitorConstructor;R=!0===a.disableCORS;w&&DIL.errorModule.activate();var T=!0===window._dil_unit_tests;(d=c)&&e.push(d+"");if(!h||"string"!==typeof h)return d="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:d,filename:"dil.js"}),Error(d);d="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";
if(l||"number"===typeof l)l=parseInt(l,10),!isNaN(l)&&0<=l&&(d="");d&&(l=0,e.push(d),d="");g=DIL.getDil(h,l);if(g instanceof DIL&&g.api.getPartner()===h&&g.api.getContainerNSID()===l)return g;if(this instanceof DIL)DIL.registerDil(this,h,l);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+h+" and containerNSID = "+l);var y={IS_HTTPS:C||"https:"===document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC",
MILLIS_PER_DAY:864E5,DIL_COOKIE_NAME:"AAMC_"+encodeURIComponent(h)+"_"+l,FIRST_PARTY_SYNCS:"AMSYNCS",FIRST_PARTY_SYNCS_ON_PAGE:"AMSYNCSOP"},J={stuffed:{}},s={},q={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_cors_responses:0,num_of_cors_errors:0,corsErrorSources:[],
num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:l+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,mid:null,noVisitorAPI:!1,VisitorAPI:null,instance:null,releaseType:"no VisitorAPI",isOptedOut:!0,isOptedOutCallbackCalled:!1,admsProcessingStarted:!1,process:function(b){try{if(!this.admsProcessingStarted){this.admsProcessingStarted=
!0;var k=this,m,f,a,d;if("function"===typeof b&&"function"===typeof b.getInstance){if(E===Object(E)&&(m=E.namespace)&&"string"===typeof m)f=b.getInstance(m,{idSyncContainerID:l});else{this.releaseType="no namespace";this.releaseRequests();return}if(f===Object(f)&&f instanceof b&&"function"===typeof f.isAllowed&&"function"===typeof f.getMarketingCloudVisitorID&&"function"===typeof f.getCustomerIDs&&"function"===typeof f.isOptedOut){this.VisitorAPI=b;if(!f.isAllowed()){this.releaseType="VisitorAPI not allowed";
this.releaseRequests();return}this.instance=f;a=function(b){"VisitorAPI"!==k.releaseType&&(k.mid=b,k.releaseType="VisitorAPI",k.releaseRequests())};d=f.getMarketingCloudVisitorID(a);if("string"===typeof d&&d.length){a(d);return}setTimeout(function(){"VisitorAPI"!==k.releaseType&&(k.releaseType="timeout",k.releaseRequests())},this.getLoadTimeout());return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(e){this.releaseRequests()}},releaseRequests:function(){this.calledBack=
!0;q.registerRequest()},getMarketingCloudVisitorID:function(){return this.instance?this.instance.getMarketingCloudVisitorID():null},getMIDQueryString:function(){var b=x.isPopulatedString,k=this.getMarketingCloudVisitorID();b(this.mid)&&this.mid===k||(this.mid=k);return b(this.mid)?"d_mid="+this.mid+"&":""},getCustomerIDs:function(){return this.instance?this.instance.getCustomerIDs():null},getCustomerIDsQueryString:function(b){if(b===Object(b)){var k="",m=[],f=[],a,d;for(a in b)b.hasOwnProperty(a)&&
(f[0]=a,d=b[a],d===Object(d)&&(f[1]=d.id||"",f[2]=d.authState||0,m.push(f),f=[]));if(f=m.length)for(b=0;b<f;b++)k+="&d_cid_ic="+u.encodeAndBuildRequest(m[b],"%01");return k}return""},getIsOptedOut:function(){this.instance?this.instance.isOptedOut([this,this.isOptedOutCallback],this.VisitorAPI.OptOut.GLOBAL,!0):(this.isOptedOut=!1,this.isOptedOutCallbackCalled=!0)},isOptedOutCallback:function(b){this.isOptedOut=b;this.isOptedOutCallbackCalled=!0;q.registerRequest()},getLoadTimeout:function(){var b=
this.instance;if(b){if("function"===typeof b.getLoadTimeout)return b.getLoadTimeout();if("undefined"!==typeof b.loadTimeout)return b.loadTimeout}return this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE}},declaredId:{declaredId:{init:null,request:null},declaredIdCombos:{},setDeclaredId:function(b,k){var m=x.isPopulatedString,f=encodeURIComponent;if(b===Object(b)&&m(k)){var a=b.dpid,d=b.dpuuid,e=null;if(m(a)&&m(d)){e=f(a)+"$"+f(d);if(!0===this.declaredIdCombos[e])return"setDeclaredId: combo exists for type '"+
k+"'";this.declaredIdCombos[e]=!0;this.declaredId[k]={dpid:a,dpuuid:d};return"setDeclaredId: succeeded for type '"+k+"'"}}return"setDeclaredId: failed for type '"+k+"'"},getDeclaredIdQueryString:function(){var b=this.declaredId.request,k=this.declaredId.init,m=encodeURIComponent,f="";null!==b?f="&d_dpid="+m(b.dpid)+"&d_dpuuid="+m(b.dpuuid):null!==k&&(f="&d_dpid="+m(k.dpid)+"&d_dpuuid="+m(k.dpuuid));return f}},registerRequest:function(b){var k=this.firingQueue;b===Object(b)&&k.push(b);this.firing||
!k.length||L&&!DIL.windowLoaded||(this.adms.isOptedOutCallbackCalled||this.adms.getIsOptedOut(),this.adms.calledBack&&!this.adms.isOptedOut&&this.adms.isOptedOutCallbackCalled&&(this.adms.isOptedOutCallbackCalled=!1,b=k.shift(),b.src=b.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.adms.getMIDQueryString()+"d_nsid="),x.isPopulatedString(b.corsPostData)&&(b.corsPostData=b.corsPostData.replace(/^d_nsid=/,this.adms.getMIDQueryString()+"d_nsid=")),D.fireRequest(b),this.firstRequestHasFired||
"script"!==b.tag&&"cors"!==b.tag||(this.firstRequestHasFired=!0)))},processVisitorAPI:function(){this.adms.process(Q||window.Visitor)},requestRemoval:function(b){if(!A)return"removeFinishedScriptsAndCallbacks is not boolean true";var k=this.toRemove,m,f;b===Object(b)&&(m=b.script,f=b.callbackName,(m===Object(m)&&"SCRIPT"===m.nodeName||"no script created"===m)&&"string"===typeof f&&f.length&&k.push(b));if(this.readyToRemove&&k.length){f=k.shift();m=f.script;f=f.callbackName;"no script created"!==m?
(b=m.src,m.parentNode.removeChild(m)):b=m;window[f]=null;try{delete window[f]}catch(a){}this.removed.push({scriptSrc:b,callbackName:f});DIL.variables.scriptsRemoved.push(b);DIL.variables.callbacksRemoved.push(f);return this.requestRemoval()}return"requestRemoval() processed"}};g=function(){var b="http://fast.",k="?d_nsid="+l+"#"+encodeURIComponent(document.location.href);if("string"===typeof G&&G.length)return G+k;y.IS_HTTPS&&(b=!0===v?"https://fast.":"https://");return b+h+".demdex.net/dest5.html"+
k};var z={THROTTLE_START:3E4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:"destination_publishing_iframe_"+h+"_"+l,url:g(),onPagePixels:[],iframeHost:null,getIframeHost:function(b){if("string"===typeof b){var k=b.split("/");if(3<=k.length)return k[0]+"//"+k[2];e.push("getIframeHost: url is malformed: "+b);return b}},iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:y.POST_MESSAGE_ENABLED?15:100,ibsDeleted:[],jsonWaiting:[],jsonProcessed:[],
canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,newIframeCreated:null,iframeIdChanged:!1,originalIframeHasLoadedAlready:null,attachIframe:function(){function b(){f=document.createElement("iframe");f.sandbox="allow-scripts allow-same-origin";f.title="Adobe ID Syncing iFrame";f.id=m.id;f.style.cssText="display: none; width: 0; height: 0;";f.src=m.url;m.newIframeCreated=!0;k();document.body.appendChild(f)}function k(){u.addListener(f,"load",function(){f.className="aamIframeLoaded";
m.iframeHasLoaded=!0;m.requestToProcess()})}var m=this,f=document.getElementById(this.id);f?"IFRAME"!==f.nodeName?(this.id+="_2",this.iframeIdChanged=!0,b()):(this.newIframeCreated=!1,"aamIframeLoaded"!==f.className?(this.originalIframeHasLoadedAlready=!1,k()):(this.iframeHasLoaded=this.originalIframeHasLoadedAlready=!0,this.iframe=f,this.requestToProcess())):b();this.iframe=f},requestToProcess:function(b,k){var m=this;b&&!x.isEmptyObject(b)&&this.jsonWaiting.push([b,k]);if((this.receivedThirdPartyCookiesNotification||
!y.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length){var f=this.jsonWaiting.shift();this.process(f[0],f[1]);this.requestToProcess()}this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){m.messageSendingInterval=y.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},processSyncOnPage:function(b){var k,m,f;if((k=b.ibs)&&k instanceof Array&&(m=k.length))for(b=
0;b<m;b++)f=k[b],f.syncOnPage&&this.checkFirstPartyCookie(f,"","syncOnPage")},process:function(b,k){var m=encodeURIComponent,f,a,d,e,c,h;k===Object(k)&&(h=u.encodeAndBuildRequest(["",k.dpid||"",k.dpuuid||""],","));if((f=b.dests)&&f instanceof Array&&(a=f.length))for(d=0;d<a;d++)e=f[d],c=[m("dests"),m(e.id||""),m(e.y||""),m(e.c||"")],this.addMessage(c.join("|"));if((f=b.ibs)&&f instanceof Array&&(a=f.length))for(d=0;d<a;d++)e=f[d],c=[m("ibs"),m(e.id||""),m(e.tag||""),u.encodeAndBuildRequest(e.url||
[],","),m(e.ttl||""),"",h,e.fireURLSync?"true":"false"],e.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(c.join("|")):e.fireURLSync&&this.checkFirstPartyCookie(e,c.join("|")));if((f=b.dpcalls)&&f instanceof Array&&(a=f.length))for(d=0;d<a;d++)e=f[d],c=e.callback||{},c=[c.obj||"",c.fn||"",c.key||"",c.tag||"",c.url||""],c=[m("dpm"),m(e.id||""),m(e.tag||""),u.encodeAndBuildRequest(e.url||[],","),m(e.ttl||""),u.encodeAndBuildRequest(c,","),h],this.addMessage(c.join("|"));this.jsonProcessed.push(b)},
checkFirstPartyCookie:function(b,k,a){var f=(a="syncOnPage"===a?!0:!1)?y.FIRST_PARTY_SYNCS_ON_PAGE:y.FIRST_PARTY_SYNCS,d=this.getOnPageSyncData(f),e=!1,c=!1,h=Math.ceil((new Date).getTime()/y.MILLIS_PER_DAY);d?(d=d.split("*"),c=this.pruneSyncData(d,b.id,h),e=c.dataPresent,c=c.dataValid,e&&c||this.fireSync(a,b,k,d,f,h)):(d=[],this.fireSync(a,b,k,d,f,h))},getOnPageSyncData:function(b){var k=q.adms.instance;return k&&"function"===typeof k.idSyncGetOnPageSyncInfo?k.idSyncGetOnPageSyncInfo():u.getDilCookieField(b)},
pruneSyncData:function(b,k,a){var f=!1,d=!1,e,c,h;if(b instanceof Array)for(c=0;c<b.length;c++)e=b[c],h=parseInt(e.split("-")[1],10),e.match("^"+k+"-")?(f=!0,a<h?d=!0:(b.splice(c,1),c--)):a>=h&&(b.splice(c,1),c--);return{dataPresent:f,dataValid:d}},manageSyncsSize:function(b){if(b.join("*").length>this.MAX_SYNCS_LENGTH)for(b.sort(function(b,a){return parseInt(b.split("-")[1],10)-parseInt(a.split("-")[1],10)});b.join("*").length>this.MAX_SYNCS_LENGTH;)b.shift()},fireSync:function(b,k,a,f,d,e){function c(b,
k,a,f){return function(){h.onPagePixels[b]=null;var m=h.getOnPageSyncData(a),d=[];if(m){var m=m.split("*"),e,c,g;e=0;for(c=m.length;e<c;e++)g=m[e],g.match("^"+k.id+"-")||d.push(g)}h.setSyncTrackingData(d,k,a,f)}}var h=this;if(b){if("img"===k.tag){b=k.url;a=y.IS_HTTPS?"https:":"http:";var g,l,n;f=0;for(g=b.length;f<g;f++){l=b[f];n=/^\/\//.test(l);var r=new Image;u.addListener(r,"load",c(this.onPagePixels.length,k,d,e));r.src=(n?a:"")+l;this.onPagePixels.push(r)}}}else this.addMessage(a),this.setSyncTrackingData(f,
k,d,e)},addMessage:function(b){var k=encodeURIComponent,k=w?k("---destpub-debug---"):k("---destpub---");this.messages.push(k+b)},setSyncTrackingData:function(b,k,a,f){b.push(k.id+"-"+(f+Math.ceil(k.ttl/60/24)));this.manageSyncsSize(b);u.setDilCookieField(a,b.join("*"))},sendMessages:function(){var b=this,k;this.messages.length?(k=this.messages.shift(),DIL.xd.postMessage(k,this.url,this.iframe.contentWindow),this.messagesPosted.push(k),setTimeout(function(){b.sendMessages()},this.messageSendingInterval)):
this.sendingMessages=!1},receiveMessage:function(b){var k=/^---destpub-to-parent---/;"string"===typeof b&&k.test(b)&&(k=b.replace(k,"").split("|"),"canSetThirdPartyCookies"===k[0]&&(this.canSetThirdPartyCookies="true"===k[1]?!0:!1,this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(b))}},K={traits:function(b){x.isValidPdata(b)&&(s.sids instanceof Array||(s.sids=[]),u.extendArray(s.sids,b));return this},pixels:function(b){x.isValidPdata(b)&&(s.pdata instanceof
Array||(s.pdata=[]),u.extendArray(s.pdata,b));return this},logs:function(b){x.isValidLogdata(b)&&(s.logdata!==Object(s.logdata)&&(s.logdata={}),u.extendObject(s.logdata,b));return this},customQueryParams:function(b){x.isEmptyObject(b)||u.extendObject(s,b,q.reservedKeys);return this},signals:function(b,k){var a,f=b;if(!x.isEmptyObject(f)){if(k&&"string"===typeof k)for(a in f={},b)b.hasOwnProperty(a)&&(f[k+a]=b[a]);u.extendObject(s,f,q.reservedKeys)}return this},declaredId:function(b){q.declaredId.setDeclaredId(b,
"request");return this},result:function(b){"function"===typeof b&&(s.callback=b);return this},afterResult:function(b){"function"===typeof b&&(s.postCallbackFn=b);return this},useImageRequest:function(){s.useImageRequest=!0;return this},clearData:function(){s={};return this},submit:function(){D.submitRequest(s);s={};return this},getPartner:function(){return h},getContainerNSID:function(){return l},getEventLog:function(){return e},getState:function(){var b={},k={};u.extendObject(b,q,{callbackPrefix:!0,
useJSONP:!0,registerRequest:!0});u.extendObject(k,z,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{initConfig:a,pendingRequest:s,otherRequestInfo:b,destinationPublishingInfo:k}},idSync:function(b){if(B)return"Error: id syncs have been disabled";if(b!==Object(b)||"string"!==typeof b.dpid||!b.dpid.length)return"Error: config or config.dpid is empty";if("string"!==typeof b.url||!b.url.length)return"Error: config.url is empty";var k=b.url,a=b.minutesToLive,f=encodeURIComponent,
d,k=k.replace(/^https:/,"").replace(/^http:/,"");if("undefined"===typeof a)a=20160;else if(a=parseInt(a,10),isNaN(a)||0>=a)return"Error: config.minutesToLive needs to be a positive number";d=u.encodeAndBuildRequest(["",b.dpid,b.dpuuid||""],",");b=["ibs",f(b.dpid),"img",f(k),a,"",d];z.addMessage(b.join("|"));q.firstRequestHasFired&&z.requestToProcess();return"Successfully queued"},aamIdSync:function(b){if(B)return"Error: id syncs have been disabled";if(b!==Object(b)||"string"!==typeof b.dpuuid||!b.dpuuid.length)return"Error: config or config.dpuuid is empty";
b.url="//dpm.demdex.net/ibs:dpid="+b.dpid+"&dpuuid="+b.dpuuid;return this.idSync(b)},passData:function(b){if(x.isEmptyObject(b))return"Error: json is empty or not an object";z.ibsDeleted.push(b.ibs);delete b.ibs;D.defaultCallback(b);return b},getPlatformParams:function(){return q.platformParams},getEventCallConfigParams:function(){var b=q,k=b.modStatsParams,a=b.platformParams,f;if(!k){k={};for(f in a)a.hasOwnProperty(f)&&!b.nonModStatsParams[f]&&(k[f.replace(/^d_/,"")]=a[f]);b.modStatsParams=k}return k}},
D={corsMetadata:function(){var b="none",a=!0;"undefined"!==typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?b="XMLHttpRequest":(new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/"))()?b="XMLHttpRequest":"undefined"!==typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(a=!1),0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&(a=!1));return{corsType:b,corsCookiesEnabled:a}}(),getCORSInstance:function(){return"none"===
this.corsMetadata.corsType?null:new window[this.corsMetadata.corsType]},submitRequest:function(b){q.registerRequest(D.createQueuedRequest(b));return!0},createQueuedRequest:function(b){var a=q,d,f=b.callback,e="img",c;if(!x.isEmptyObject(p)){var h,g,n;for(h in p)p.hasOwnProperty(h)&&(g=p[h],null!=g&&""!==g&&h in b&&!(g in b||g in q.reservedKeys)&&(n=b[h],null!=n&&""!==n&&(b[g]=n)))}x.isValidPdata(b.sids)||(b.sids=[]);x.isValidPdata(b.pdata)||(b.pdata=[]);x.isValidLogdata(b.logdata)||(b.logdata={});
b.logdataArray=u.convertObjectToKeyValuePairs(b.logdata,"=",!0);b.logdataArray.push("_ts="+(new Date).getTime());"function"!==typeof f&&(f=this.defaultCallback);a.useJSONP=!0!==b.useImageRequest;a.useJSONP&&(e="script",d=a.callbackPrefix+"_"+l+"_"+(new Date).getTime());a=this.makeRequestSrcData(b,d);P&&!F||!(c=this.getCORSInstance())||(e="cors");return{tag:e,src:a.src,corsSrc:a.corsSrc,internalCallbackName:d,callbackFn:f,postCallbackFn:b.postCallbackFn,useImageRequest:!!b.useImageRequest,requestData:b,
corsInstance:c,corsPostData:a.corsPostData}},defaultCallback:function(b,a){z.processSyncOnPage(b);var d,f,e,c,h,g,l,r,w;if((d=b.stuff)&&d instanceof Array&&(f=d.length))for(e=0;e<f;e++)if((c=d[e])&&c===Object(c)){h=c.cn;g=c.cv;l=c.ttl;if("undefined"===typeof l||""===l)l=Math.floor(u.getMaxCookieExpiresInMinutes()/60/24);r=c.dmn||"."+document.domain.replace(/^www\./,"");w=c.type;h&&(g||"number"===typeof g)&&("var"!==w&&(l=parseInt(l,10))&&!isNaN(l)&&u.setCookie(h,g,1440*l,"/",r,!1),J.stuffed[h]=g)}d=
b.uuid;x.isPopulatedString(d)&&!x.isEmptyObject(n)&&(f=n.path,"string"===typeof f&&f.length||(f="/"),e=parseInt(n.days,10),isNaN(e)&&(e=100),u.setCookie(n.name||"aam_did",d,1440*e,f,n.domain||"."+document.domain.replace(/^www\./,""),!0===n.secure));t||q.abortRequests||z.requestToProcess(b,a)},makeRequestSrcData:function(b,a){b.sids=x.removeEmptyArrayValues(b.sids||[]);b.pdata=x.removeEmptyArrayValues(b.pdata||[]);var d=q,f=d.platformParams,e=u.encodeAndBuildRequest(b.sids,","),c=u.encodeAndBuildRequest(b.pdata,
","),g=(b.logdataArray||[]).join("&");delete b.logdataArray;var n=y.IS_HTTPS?"https://":"http://",r=d.declaredId.getDeclaredIdQueryString(),w=d.adms.instance?d.adms.getCustomerIDsQueryString(d.adms.getCustomerIDs()):"",p;p=[];var s,t,v,A;for(s in b)if(!(s in d.reservedKeys)&&b.hasOwnProperty(s))if(t=b[s],s=encodeURIComponent(s),t instanceof Array)for(v=0,A=t.length;v<A;v++)p.push(s+"="+encodeURIComponent(t[v]));else p.push(s+"="+encodeURIComponent(t));p=p.length?"&"+p.join("&"):"";e="d_nsid="+f.d_nsid+
r+w+(e.length?"&d_sid="+e:"")+(c.length?"&d_px="+c:"")+(g.length?"&d_ld="+encodeURIComponent(g):"");f="&d_rtbd="+f.d_rtbd+"&d_jsonv="+f.d_jsonv+"&d_dst="+f.d_dst;n=n+h+".demdex.net/event";c=d=n+"?"+e+(d.useJSONP?f+"&d_cb="+(a||""):"")+p;2048<d.length&&(d=d.substring(0,2048).substring(0,d.lastIndexOf("&")));return{corsSrc:n+"?"+(O?"testcors=1&d_nsid="+l+"&":"")+"_ts="+(new Date).getTime(),src:d,originalSrc:c,corsPostData:e+f+p,isDeclaredIdCall:""!==r}},fireRequest:function(b){if("img"===b.tag)this.fireImage(b);
else{var a=q.declaredId,a=a.declaredId.request||a.declaredId.init||{},a={dpid:a.dpid||"",dpuuid:a.dpuuid||""};"script"===b.tag?this.fireScript(b,a):"cors"===b.tag&&this.fireCORS(b,a)}},fireImage:function(b){var a=q,c,f;a.abortRequests||(a.firing=!0,c=new Image(0,0),a.sent.push(b),c.onload=function(){a.firing=!1;a.fired.push(b);a.num_of_img_responses++;a.registerRequest()},f=function(f){d="imgAbortOrErrorHandler received the event of type "+f.type;e.push(d);a.abortRequests=!0;a.firing=!1;a.errored.push(b);
a.num_of_img_errors++;a.registerRequest()},c.addEventListener?(c.addEventListener("error",f,!1),c.addEventListener("abort",f,!1)):c.attachEvent&&(c.attachEvent("onerror",f),c.attachEvent("onabort",f)),c.src=b.src)},fireScript:function(b,a){var c=this,f=q,g,l,n=b.src,r=b.postCallbackFn,w="function"===typeof r,p=b.internalCallbackName;f.abortRequests||(f.firing=!0,window[p]=function(c){try{c!==Object(c)&&(c={});B&&(z.ibsDeleted.push(c.ibs),delete c.ibs);var m=b.callbackFn;f.firing=!1;f.fired.push(b);
f.num_of_jsonp_responses++;m(c,a);w&&r(c,a)}catch(g){g.message="DIL jsonp callback caught error with message "+g.message;d=g.message;e.push(d);g.filename=g.filename||"dil.js";g.partner=h;DIL.errorModule.handleError(g);try{m({error:g.name+"|"+g.message},a),w&&r({error:g.name+"|"+g.message},a)}catch(n){}}finally{f.requestRemoval({script:l,callbackName:p}),f.registerRequest()}},M||F?(f.firing=!1,f.requestRemoval({script:"no script created",callbackName:p})):(l=document.createElement("script"),l.addEventListener&&
l.addEventListener("error",function(a){f.requestRemoval({script:l,callbackName:p});d="jsonp script tag error listener received the event of type "+a.type+" with src "+n;c.handleScriptError(d,b)},!1),l.type="text/javascript",l.src=n,g=DIL.variables.scriptNodeList[0],g.parentNode.insertBefore(l,g)),f.sent.push(b),f.declaredId.declaredId.request=null)},fireCORS:function(b,a){var c=this,f=q,g=this.corsMetadata.corsType,l=b.corsSrc,n=b.corsInstance,r=b.corsPostData,p=b.postCallbackFn,w="function"===typeof p;
if(!f.abortRequests&&!R){f.firing=!0;try{n.open("post",l,!0),"XMLHttpRequest"===g&&(n.withCredentials=!0,n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.onreadystatechange=function(){if(4===this.readyState&&200===this.status)a:{var g;try{if(g=JSON.parse(this.responseText),g!==Object(g)){c.handleCORSError(b,a,"Response is not JSON");break a}}catch(l){c.handleCORSError(b,a,"Error parsing response as JSON");break a}B&&(z.ibsDeleted.push(g.ibs),delete g.ibs);try{var n=b.callbackFn;
f.firing=!1;f.fired.push(b);f.num_of_cors_responses++;n(g,a);w&&p(g,a)}catch(r){r.message="DIL handleCORSResponse caught error with message "+r.message;d=r.message;e.push(d);r.filename=r.filename||"dil.js";r.partner=h;DIL.errorModule.handleError(r);try{n({error:r.name+"|"+r.message},a),w&&p({error:r.name+"|"+r.message},a)}catch(V){}}finally{f.registerRequest()}}}),n.onerror=function(){c.handleCORSError(b,a,"onerror")},n.ontimeout=function(){c.handleCORSError(b,a,"ontimeout")},n.send(r)}catch(s){this.handleCORSError(b,
a,"try-catch")}f.sent.push(b);f.declaredId.declaredId.request=null}},handleCORSError:function(b,a,c){q.num_of_cors_errors++;q.corsErrorSources.push(c);"ontimeout"===c||F||(b.tag="script",this.fireScript(b,a))},handleScriptError:function(b,a){q.num_of_jsonp_errors++;this.handleRequestError(b,a)},handleRequestError:function(b,a){var c=q;e.push(b);c.abortRequests=!0;c.firing=!1;c.errored.push(a);c.registerRequest()}},x={isValidPdata:function(b){return b instanceof Array&&this.removeEmptyArrayValues(b).length?
!0:!1},isValidLogdata:function(b){return!this.isEmptyObject(b)},isEmptyObject:function(b){if(b!==Object(b))return!0;for(var a in b)if(b.hasOwnProperty(a))return!1;return!0},removeEmptyArrayValues:function(b){for(var a=0,c=b.length,f,d=[],a=0;a<c;a++)f=b[a],"undefined"!==typeof f&&null!==f&&""!==f&&d.push(f);return d},isPopulatedString:function(b){return"string"===typeof b&&b.length}},u={addListener:function(){if(document.addEventListener)return function(b,a,c){b.addEventListener(a,function(b){"function"===
typeof c&&c(b)},!1)};if(document.attachEvent)return function(b,a,c){b.attachEvent("on"+a,function(b){"function"===typeof c&&c(b)})}}(),convertObjectToKeyValuePairs:function(b,a,c){var f=[],d,e;a||(a="=");for(d in b)b.hasOwnProperty(d)&&(e=b[d],"undefined"!==typeof e&&null!==e&&""!==e&&f.push(d+a+(c?encodeURIComponent(e):e)));return f},encodeAndBuildRequest:function(b,a){return this.map(b,function(b){return encodeURIComponent(b)}).join(a)},map:function(b,a){if(Array.prototype.map)return b.map(a);if(void 0===
b||null===b)throw new TypeError;var c=Object(b),d=c.length>>>0;if("function"!==typeof a)throw new TypeError;for(var e=Array(d),g=0;g<d;g++)g in c&&(e[g]=a.call(a,c[g],g,c));return e},filter:function(b,a){if(!Array.prototype.filter){if(void 0===b||null===b)throw new TypeError;var c=Object(b),d=c.length>>>0;if("function"!==typeof a)throw new TypeError;for(var e=[],g=0;g<d;g++)if(g in c){var h=c[g];a.call(a,h,g,c)&&e.push(h)}return e}return b.filter(a)},getCookie:function(b){b+="=";var a=document.cookie.split(";"),
c,d,e;c=0;for(d=a.length;c<d;c++){for(e=a[c];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(b))return decodeURIComponent(e.substring(b.length,e.length))}return null},setCookie:function(b,a,c,d,e,g){var h=new Date;c&&(c*=6E4);document.cookie=b+"="+encodeURIComponent(a)+(c?";expires="+(new Date(h.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(g?";secure":"")},extendArray:function(b,a){return b instanceof Array&&a instanceof Array?(Array.prototype.push.apply(b,
a),!0):!1},extendObject:function(b,a,c){var d;if(b===Object(b)&&a===Object(a)){for(d in a)!a.hasOwnProperty(d)||!x.isEmptyObject(c)&&d in c||(b[d]=a[d]);return!0}return!1},getMaxCookieExpiresInMinutes:function(){return((new Date(y.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/1E3/60},getCookieField:function(b,a){var c=this.getCookie(b),d=decodeURIComponent;if("string"===typeof c){var c=c.split("|"),e,g;e=0;for(g=c.length-1;e<g;e++)if(d(c[e])===a)return d(c[e+1])}return null},getDilCookieField:function(b){return this.getCookieField(y.DIL_COOKIE_NAME,
b)},setCookieField:function(b,a,c){var d=this.getCookie(b),e=!1,g=encodeURIComponent;a=g(a);c=g(c);if("string"===typeof d){var d=d.split("|"),h,g=0;for(h=d.length-1;g<h;g++)if(d[g]===a){d[g+1]=c;e=!0;break}e||(g=d.length,d[g]=a,d[g+1]=c)}else d=[a,c];this.setCookie(b,d.join("|"),this.getMaxCookieExpiresInMinutes(),"/",this.getDomain(),!1)},setDilCookieField:function(b,a){return this.setCookieField(y.DIL_COOKIE_NAME,b,a)},getDomain:function(b){!b&&window.location&&(b=window.location.hostname);if(b)if(/^[0-9.]+$/.test(b))b=
"";else{var a=b.split("."),c=a.length-1,d=c-1;1<c&&2>=a[c].length&&(2===a[c-1].length||0>",DOMAIN_2_CHAR_EXCEPTIONS,".indexOf(","+a[c]+","))&&d--;if(0<d)for(b="";c>=d;)b=a[c]+(b?".":"")+b,c--}return b}};"error"===h&&0===l&&u.addListener(window,"load",function(){DIL.windowLoaded=!0});var S=!1,H=function(){S||(S=!0,q.registerRequest(),U(),t||q.abortRequests||z.attachIframe(),q.readyToRemove=!0,q.requestRemoval())},U=function(){t||setTimeout(function(){N||q.firstRequestHasFired||("function"===typeof I?
K.afterResult(I).submit():K.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)};C=document;"error"!==h&&(DIL.windowLoaded?H():"complete"!==C.readyState&&"loaded"!==C.readyState?u.addListener(window,"load",function(){DIL.windowLoaded=!0;H()}):(DIL.windowLoaded=!0,H()));if("error"!==h)try{DIL.xd.receiveMessage(function(b){z.receiveMessage(b.data)},z.getIframeHost(z.url))}catch(W){}q.declaredId.setDeclaredId(r,"init");q.processVisitorAPI();this.api=K;this.getStuffedVariable=function(b){var a=J.stuffed[b];
a||"number"===typeof a||(a=u.getCookie(b))||"number"===typeof a||(a="");return a};this.validators=x;this.helpers=u;this.constants=y;this.log=e;T&&(this.pendingRequest=s,this.requestController=q,this.setDestinationPublishingUrl=g,this.destinationPublishing=z,this.requestProcs=D,this.variables=J,this.callWindowLoadFunctions=H)},function(){var a=document,c;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",c=function(){a.removeEventListener("DOMContentLoaded",
c,!1);a.readyState="complete"},!1))}(),DIL.extendStaticPropertiesAndMethods=function(a){var c;if(a===Object(a))for(c in a)a.hasOwnProperty(c)&&(this[c]=a[c])},DIL.extendStaticPropertiesAndMethods({version:"6.6",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoad:function(a){this.windowLoaded="function"===typeof a?!!a():"boolean"===typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(c){return(new Image(0,
0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(a,c,e){c=c+"$"+e;c in this.dils||(this.dils[c]=a)},getDil:function(a,c){var e;"string"!==typeof a&&(a="");c||(c=0);e=a+"$"+c;return e in this.dils?this.dils[e]:
Error("The DIL instance with partner = "+a+" and containerNSID = "+c+" was not found")},dexGetQSVars:function(a,c,e){c=this.getDil(c,e);return c instanceof this?c.getStuffedVariable(a):""},xd:{postMessage:function(a,c,e){var d=1;c&&(window.postMessage?e.postMessage(a,c.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):c&&(e.location=c.replace(/#.*$/,"")+"#"+ +new Date+d++ +"&"+a))},receiveMessage:function(a,c){var e;try{if(window.postMessage)if(a&&(e=function(d){if("string"===typeof c&&d.origin!==c||"[object Function]"===
Object.prototype.toString.call(c)&&!1===c(d.origin))return!1;a(d)}),window.addEventListener)window[a?"addEventListener":"removeEventListener"]("message",e,!1);else window[a?"attachEvent":"detachEvent"]("onmessage",e)}catch(d){}}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),c={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,
typeerror:15019,urierror:15020},e=!1;return{activate:function(){e=!0},handleError:function(d){if(!e)return"DIL error module has not been activated";d!==Object(d)&&(d={});var g=d.name?(d.name+"").toLowerCase():"",h=[];d={name:g,filename:d.filename?d.filename+"":"",partner:d.partner?d.partner+"":"no_partner",site:d.site?d.site+"":document.location.href,message:d.message?d.message+"":""};h.push(g in c?c[g]:c.noerrortypedefined);a.api.pixels(h).logs(d).useImageRequest().submit();return"DIL error report sent"},
pixelMap:c}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,c,e){var d="";c=c||"Error caught in DIL module/submodule: ";a===Object(a)?d=c+(a.message||"err has no message"):(d=c+"err is not a valid object",a={});a.message=d;e instanceof DIL&&(a.partner=e.api.getPartner());DIL.errorModule.handleError(a);return this.errorMessage=d}}});
DIL.tools.getSearchReferrer=function(a,c){var e=DIL.getDil("error"),d=DIL.tools.decomposeURI(a||document.referrer),g="",h="",l={queryParam:"q"};return(g=e.helpers.filter([c===Object(c)?c:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!d.hostname.match(a.hostPattern))}).shift())?{valid:!0,name:d.hostname,keywords:(e.helpers.extendObject(l,g),h=l.queryPattern?
(g=(""+d.search).match(l.queryPattern))?g[1]:"":d.uriParams[l.queryParam],decodeURIComponent(h||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}};
DIL.tools.decomposeURI=function(a){var c=DIL.getDil("error"),e=document.createElement("a");e.href=a||document.referrer;return{hash:e.hash,host:e.host.split(":").shift(),hostname:e.hostname,href:e.href,pathname:e.pathname.replace(/^\//,""),protocol:e.protocol,search:e.search,uriParams:function(a,e){c.helpers.map(e.split("&"),function(c){c=c.split("=");a[c.shift()]=c.shift()});return a}({},e.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},c=document.getElementsByTagName("meta"),e,d,g,h,l;e=0;for(g=arguments.length;e<g;e++)if(h=arguments[e],null!==h)for(d=0;d<c.length;d++)if(l=c[d],l.name===h){a[h]=l.content;break}return a};
DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,c,e,d){try{var g=this,h={name:"DIL Site Catalyst Module Error"},l=function(a){h.message=a;DIL.errorModule.handleError(h);return a};this.options=d===Object(d)?d:{};this.dil=null;if(c instanceof DIL)this.dil=c;else return l("dilInstance is not a valid instance of DIL");h.partner=c.api.getPartner();if(a!==Object(a))return l("siteCatalystReportingSuite is not an object");window.AppMeasurement_Module_DIL=a.m_DIL=
function(a){var c="function"===typeof a.m_i?a.m_i("DIL"):this;if(c!==Object(c))return l("m is not an object");c.trackVars=g.constructTrackVars(e);c.d=0;c.s=a;c._t=function(){var a,c,d=","+this.trackVars+",",e=this.s,h,p=[];h=[];var t={},v=!1;if(e!==Object(e))return l("Error in m._t function: s is not an object");if(this.d){if("function"===typeof e.foreachVar)e.foreachVar(function(a,c){"undefined"!==typeof c&&(t[a]=c,v=!0)},this.trackVars);else{if(!(e.va_t instanceof Array))return l("Error in m._t function: s.va_t is not an array");
if(e.lightProfileID)(a=e.lightTrackVars)&&(a=","+a+","+e.vl_mr+",");else if(e.pe||e.linkType)a=e.linkTrackVars,e.pe&&(c=e.pe.substring(0,1).toUpperCase()+e.pe.substring(1),e[c]&&(a=e[c].trackVars)),a&&(a=","+a+","+e.vl_l+","+e.vl_l2+",");if(a){c=0;for(p=a.split(",");c<p.length;c++)0<=d.indexOf(","+p[c]+",")&&h.push(p[c]);h.length&&(d=","+h.join(",")+",")}h=0;for(c=e.va_t.length;h<c;h++)a=e.va_t[h],0<=d.indexOf(","+a+",")&&"undefined"!==typeof e[a]&&null!==e[a]&&""!==e[a]&&(t[a]=e[a],v=!0)}g.includeContextData(e,
t).store_populated&&(v=!0);v&&this.d.api.signals(t,"c_").submit()}}};a.loadModule("DIL");a.DIL.d=c;return h.message?h.message:"DIL.modules.siteCatalyst.init() completed with no errors"}catch(t){return this.handle(t,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var c=[],e,d,g,h,l;if(a===Object(a)){e=a.names;if(e instanceof Array&&(g=e.length))for(d=0;d<g;d++)h=e[d],"string"===typeof h&&h.length&&c.push(h);a=a.iteratedNames;if(a instanceof Array&&
(g=a.length))for(d=0;d<g;d++)if(e=a[d],e===Object(e)&&(h=e.name,l=parseInt(e.maxIndex,10),"string"===typeof h&&h.length&&!isNaN(l)&&0<=l))for(e=0;e<=l;e++)c.push(h+e);if(c.length)return c.join(",")}return this.constructTrackVars({names:"pageName channel campaign products events pe pev1 pev2 pev3".split(" "),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:250}]})},includeContextData:function(a,c){var e={},d=!1;if(a.contextData===Object(a.contextData)){var g=a.contextData,h=this.options.replaceContextDataPeriodsWith,
l=this.options.filterFromContextVariables,t={},v,p,n,w;"string"===typeof h&&h.length||(h="_");if(l instanceof Array)for(v=0,p=l.length;v<p;v++)n=l[v],this.dil.validators.isPopulatedString(n)&&(t[n]=!0);for(w in g)!g.hasOwnProperty(w)||t[w]||!(l=g[w])&&"number"!==typeof l||(w=("contextData."+w).replace(/\./g,h),c[w]=l,d=!0)}e.store_populated=d;return e}};
DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,c,e){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var d={name:"DIL GA Module Error"},g="";c instanceof DIL?(this.dil=c,d.partner=this.dil.api.getPartner()):(g="dilInstance is not a valid instance of DIL",
d.message=g,DIL.errorModule.handleError(d));a instanceof Array&&a.length?this.arr=a:(g="gaArray is not an array or is empty",d.message=g,DIL.errorModule.handleError(d));this.tv=this.constructTrackVars(e);this.errorMessage=g}catch(h){this.handle(h,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var c=[],e,d,g,h;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){g=this.defaultTrackVars;h={};e=0;for(d=g.length;e<d;e++)h[g[e]]=
!0;this.defaultTrackVarsObj=h}else h=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(d=a.length))for(e=0;e<d;e++)g=a[e],"string"===typeof g&&g.length&&g in h&&c.push(g);if(c.length)return c}return this.defaultTrackVars},constructGAObj:function(a){var c={};a=a instanceof Array?a:this.arr;var e,d,g,h;e=0;for(d=a.length;e<d;e++)g=a[e],g instanceof Array&&g.length&&(g=[],h=a[e],g instanceof Array&&h instanceof Array&&Array.prototype.push.apply(g,h),h=g.shift(),"string"===
typeof h&&h.length&&(c[h]instanceof Array||(c[h]=[]),c[h].push(g)));return c},addToSignals:function(a,c){if("string"!==typeof a||""===a||null==c||""===c)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(c);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),c={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,c,d){"string"===typeof c&&c.length&&this.addToSignals("c_"+c,d)},_addItem:function(a,c,d,e,
g,h){this.addToSignals("c_itemOrderId",a);this.addToSignals("c_itemSku",c);this.addToSignals("c_itemName",d);this.addToSignals("c_itemCategory",e);this.addToSignals("c_itemPrice",g);this.addToSignals("c_itemQuantity",h)},_addTrans:function(a,c,d,e,g,h,l,t){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",c);this.addToSignals("c_transTotal",d);this.addToSignals("c_transTax",e);this.addToSignals("c_transShipping",g);this.addToSignals("c_transCity",h);this.addToSignals("c_transState",
l);this.addToSignals("c_transCountry",t)},_trackSocial:function(a,c,d,e){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",c);this.addToSignals("c_socialTarget",d);this.addToSignals("c_socialPagePath",e)}},e=this.tv,d,g,h,l,t,v;d=0;for(g=e.length;d<g;d++)if(h=e[d],a.hasOwnProperty(h)&&c.hasOwnProperty(h)&&(v=a[h],v instanceof Array))for(l=0,t=v.length;l<t;l++)c[h].apply(this,v[l])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();
return this.hasSignals?(this.dil.api.signals(this.signals).submit(),"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,c,e){try{this.callback=this.dil=null,this.errorMessage=
"",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,this.cookieName=this.v(c)?c:"aam_ga",this.delimiter=this.v(e)?e:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(d){this.handle(d,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var c,e,d,g,h,l;l=!1;var t=1;if(a===Object(a)&&(c=a.stuff)&&c instanceof Array&&(e=c.length))for(a=0;a<e;a++)if((d=
c[a])&&d===Object(d)&&(g=d.cn,h=d.cv,g===this.cookieName&&this.v(h))){l=!0;break}if(l){c=h.split(this.delimiter);"undefined"===typeof window._gaq&&(window._gaq=[]);d=window._gaq;a=0;for(e=c.length;a<e&&!(l=c[a].split("="),h=l[0],l=l[1],this.v(h)&&this.v(l)&&d.push(["_setCustomVar",t++,h,l,1]),t>this.LIMIT);a++);this.errorMessage=1<t?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"===typeof this.callback)return this.callback()},
submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;this.dil.api.afterResult(function(c){a.process(c)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(c){return this.handle(c,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,c,e){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=e===Object(e)?e:{};e={name:"DIL Peer39 Module Error"};var d=[],g="";this.isSecurePageButNotEnabled(document.location.protocol)&&(g="Module has not been enabled for a secure page",d.push(g),e.message=g,DIL.errorModule.handleError(e));c instanceof
DIL?(this.dil=c,e.partner=this.dil.api.getPartner()):(g="dilInstance is not a valid instance of DIL",d.push(g),e.message=g,DIL.errorModule.handleError(e));"string"===typeof a&&a.length?this.aid=a:(g="aid is not a string or is empty",d.push(g),e.message=g,DIL.errorModule.handleError(e));this.errorMessage=d.join("\n")}catch(h){this.handle(h,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"===a&&!0!==this.optionals.enableHTTPS?
!0:!1},constructSignals:function(){var a=this,c=this.constructScript(),e=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var c=a.processData(p39_KVP_Short("c_p","|").split("|"));c.hasSignals&&a.dil.api.signals(c.signals).submit()}catch(e){}finally{a.calledBack=!0,"function"===typeof a.optionals.afterResult&&a.optionals.afterResult()}};e.parentNode.insertBefore(c,e);this.scriptsSent.push(c);return"Request sent to Peer39"},processData:function(a){var c,e,d,g,h={},l=
!1;this.returnedData.push(a);if(a instanceof Array)for(c=0,e=a.length;c<e;c++)d=a[c].split("="),g=d[0],d=d[1],g&&isFinite(d)&&!isNaN(parseInt(d,10))&&(h[g]instanceof Array||(h[g]=[]),h[g].push(d),l=!0);return{hasSignals:l,signals:h}},constructScript:function(){var a=document.createElement("script"),c=this.optionals,e=c.scriptId,d=c.scriptSrc,c=c.scriptParams;a.id="string"===typeof e&&e.length?e:"peer39ScriptLoader";a.type="text/javascript";"string"===typeof d&&d.length?a.src=d:(a.src=document.location.protocol+
"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"===typeof c&&c.length&&(a.src+="?"+c));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};

/*
 Start ActivityMap Module version: 1.8.0

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.8.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(){var a=this;a.version="1.8.0";var h=window;h.s_c_in||(h.s_c_il=[],h.s_c_in=0);a._il=h.s_c_il;a._in=h.s_c_in;a._il[a._in]=a;h.s_c_in++;a._c="s_c";var n=h.AppMeasurement.Ob;n||(n=null);var p=h,l,r;try{for(l=p.parent,r=p.location;l&&l.location&&r&&""+l.location!=""+r&&p.location&&""+l.location!=""+p.location&&l.location.host==r.host;)p=l,l=p.parent}catch(s){}a.P=function(a){try{console.log(a)}catch(b){}};a.La=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.vb=function(){var c=h.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&
!/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.vb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=
e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.K=[];a.ia=function(c,b,d){if(a.Ea)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,k=["webkitvisibilitychange",
"visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<k.length;d++)a.d.addEventListener(k[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.K.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.K.length;){d=a.K.shift();if(b&&!d.t&&d.t>c){a.K.unshift(d);
setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.Ea=1;a[d.m].apply(a,d.a);a.Ea=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,k="";e=f="";if(a.lightProfileID)d=a.O,(k=a.lightTrackVars)&&(k=","+k+","+a.na.join(",")+",");else{d=a.g;if(a.pe||
a.linkType)k=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(k=a[e].Mb,f=a[e].Lb));k&&(k=","+k+","+a.G.join(",")+",");f&&k&&(k+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!k||0<=k.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",k,m,h,t,l=0;"contextData"==c&&(c="c");if(b){for(k in b)if(!(Object.prototype[k]||e&&k.substring(0,e.length)!=e)&&b[k]&&(!d||0<=d.indexOf(","+(f?f+
".":"")+k+","))){h=!1;if(l)for(m=0;m<l.length;m++)k.substring(0,l[m].length)==l[m]&&(h=!0);if(!h&&(""==g&&(g+="&"+c+"."),m=b[k],e&&(k=k.substring(e.length)),0<k.length))if(h=k.indexOf("."),0<h)m=k.substring(0,h),h=(e?e:"")+m+".",l||(l=[]),l.push(h),g+=a.r(m,b,d,f,h);else if("boolean"==typeof m&&(m=m?"true":"false"),m){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(h=k.substring(0,4),t=k.substring(4),k){case "transactionID":k="xact";break;case "channel":k="ch";break;case "campaign":k=
"v0";break;default:a.La(t)&&("prop"==h?k="c"+t:"eVar"==h?k="v"+t:"list"==h?k="l"+t:"hier"==h&&(k="h"+t,m=m.substring(0,255)))}g+="&"+a.escape(k)+"="+a.escape(m)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.yb=function(){var c="",b,d,f,e,g,k,m,h,l="",p="",q=e="";if(a.lightProfileID)b=a.O,(l=a.lightTrackVars)&&(l=","+l+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)l=a.linkTrackVars,p=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(l=a[e].Mb,p=a[e].Lb));
l&&(l=","+l+","+a.G.join(",")+",");p&&(p=","+p+",",l&&(l+=",events,"));a.events2&&(q+=(""!=q?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=n;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,
4);k=e.substring(4);!g&&"events"==e&&q&&(g=q,q="");if(g&&(!l||0<=l.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),
g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e=
"cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":q&&(g+=(""!=g?",":"")+q);if(p)for(k=
g.split(","),g="",f=0;f<k.length;f++)m=k[f],h=m.indexOf("="),0<=h&&(m=m.substring(0,h)),h=m.indexOf(":"),0<=h&&(m=m.substring(0,h)),0<=p.indexOf(","+m+",")&&(g+=(g?",":"")+k[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],l,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e=
"mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],l,e));g="";break;default:a.La(k)&&("prop"==f?e="c"+k:"eVar"==f?e="v"+k:"list"==f?e="l"+k:"hier"==f&&(e="h"+k,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Rb||"undefined"!=""+a.Hb&&"HTML"!=(""+a.Hb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||
"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ha=function(a){var b=h.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.L=function(c){var b=a.D(c),d,f,e="",
g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ha(c),e)?{id:e.substring(0,100),type:g}:0};a.Pb=function(c){for(var b=a.D(c),d=a.L(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=
a.D(c),d=a.L(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Gb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,k;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.L(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.L(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var m=d.onclick?""+d.onclick:"";if(0<=m.indexOf(".tl(")||0<=m.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&
(e=a.Ha(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var l=0,p=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(m=e.toLowerCase(),g=m.indexOf("?"),k=m.indexOf("#"),0<=g?0<=k&&k<g&&(g=k):g=k,0<=g&&(m=m.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),k=0;k<g.length;k++)(n=g[k])&&m.substring(m.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&!f&&(m=e.toLowerCase(),a.Ka(m)&&(a.linkInternalFilters||(a.linkInternalFilters=
h.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),l=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(k=0;k<g.length;k++)n=g[k],0<=m.indexOf(n)&&(p=1);p?l&&(f="e"):l||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),h.s_objectID&&(b.id=h.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+
(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.zb=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,k,m,h,e=0;if(g)for(k=0;k<g.length;k++)m=g[k].split("="),f=a.unescape(m[0]).split(","),
m=a.unescape(m[1]),b[m]=f;f=a.account.split(",");k={};for(h in a.contextData)h&&!Object.prototype[h]&&"a.activitymap."==h.substring(0,14)&&(k[h]=a.contextData[h],a.contextData[h]="");a.e=a.r("c",k)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(m in b)if(!Object.prototype[m])for(h=0;h<f.length;h++)for(e&&(g=b[m].join(","),g==a.account&&(a.e+=("&"!=m.charAt(0)?"&":"")+m,b[m]=[],d=1)),k=0;k<b[m].length;k++)g=b[m][k],g==f[h]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=m.charAt(0)?"&":"")+m+"&u=0"),b[m].splice(k,
1),d=1);c||(d=1);if(d){e="";k=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),k=1);for(m in b)!Object.prototype[m]&&0<k&&0<b[m].length&&(e+=(e?"&":"")+a.escape(b[m].join(","))+"="+a.escape(m),k--);a.cookieWrite("s_sq",e)}}}return c};a.Ab=function(){if(!a.Kb){var c=new Date,b=p.location,d,f,e=f=d="",g="",k="",h="1.2",l=a.cookieWrite("s_cc","true",0)?"Y":"N",n="",q="";if(c.setUTCDate&&(h="1.3",(0).toPrecision&&(h="1.5",c=[],c.forEach))){h="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(h="1.7",
c.reduce&&(h="1.8",h.trim&&(h="1.8.1",Date.parse&&(h="1.8.2",Object.create&&(h="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;k=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),n=a.b.Qb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),q=a.b.connectionType}catch(u){}a.resolution=
d;a.colorDepth=f;a.javascriptVersion=h;a.javaEnabled=e;a.cookiesEnabled=l;a.browserWidth=g;a.browserHeight=k;a.connectionType=q;a.homepage=n;a.Kb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=h["AppMeasurement_Module_"+c]?new h["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.cb=function(){return d.hb};d.ib=function(b){if(d.hb=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.cb,set:d.ib}):d._olc=1}catch(f){d._olc=
1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Cb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};
a.R=function(c,b){var d,f,e,g,k,h;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(k=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(h in a[g])k[h]||(k[h]=a[g][h]);a[g]=k}};a.Ua=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.ub=function(a){var b,d,f,e,g,k=0,h,l="",n="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(h=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,
"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(k=",p,ei,"),k&&h)))){if((a=h.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?l+=(l?"&":"")+e:n+=(n?"&":"")+e;l&&n?h=l+"&"+n:n=""}d=253-(h.length-n.length)-b.length;a=b+(0<d?g.substring(0,d):"")+
"?"+h}return a};a.$a=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.I=!1;a.kb=function(){a.I=!0;a.j()};a.ca=!1;a.V=!1;a.gb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.lb=function(c){a.visitorOptedOut=c;a.W=!0;
a.j()};a.Z=!1;a.S=!1;a.Wa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Ya=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Xa=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.Za=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.H=!1;a.xa=function(){a.H=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.I||(a.$a(a.kb)?a.I=!0:a.ea=!0);if(a.ea&&!a.I)return!1;b&&
b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.gb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.lb]),a.visitorOptedOut!=n&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Wa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||
(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Ya]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Xa]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.H||(a.Za(a.xa)?a.H=!0:
a.da=!0);a.da&&!a.H&&(c=!1);return c};a.o=n;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.pb=c;f.ob=b;f.mb=d;a.o==n&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.jb(),a.o!=n))for(;0<a.o.length;)c=a.o.shift(),c.ob.apply(c.pb,c.mb)};a.jb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.eb=function(c){var b,d,f=n,e=n;if(!a.isReadyToTrack()){b=[];if(c!=n)for(d in f={},c)f[d]=c[d];e={};a.Ua(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,
a.track,b);return!0}return!1};a.wb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+
"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.eb(c)||(b&&a.R(b),c&&(d={},a.Ua(d,0),a.R(c)),a.Cb()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.wb()),a.Gb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=
a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=h.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Va||(a.referrer=p.document.referrer),a.Va=1,a.referrer=a.ub(a.referrer),a.p("_g")),a.zb()&&!a.abort&&(a.Ab(),g+=a.yb(),a.Fb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=
h.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.P("DEBUG: Non function type passed to registerPreTrackCallback")};a.bb=function(c){a.wa(a.za,c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.P("DEBUG: Non function type passed to registerPostTrackCallback")};
a.ab=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.P(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=
a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.Fb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,
f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Jb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.bb(d);
a.sb(d);a.ka()};a.Ta=/{(%?)(.*?)(%?)}/;a.Nb=RegExp(a.Ta.source,"g");a.tb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Nb),e=0;e<f.length;++e){var g=f[e],h=g.match(a.Ta),l="";"%"==h[1]&&"timezone_offset"==h[2]?l=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(l=a.xb());d.c=d.c.replace(g,a.escape(l))}}};a.xb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));
return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.tb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);
else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.sb=function(c){a.i||a.Bb();a.i.push(c);a.ma=a.C();a.Ra()};a.Bb=function(){a.i=a.Db();a.i||(a.i=[])};a.Db=function(){var c,b;if(a.ra()){try{(b=h.localStorage.getItem(a.pa()))&&(c=h.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&
a.offlineFilename&&h.localStorage&&h.JSON||(c=!1);return c};a.Ia=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.F&&a.B.va(),a.q))return;a.Ja=n;if(a.qa)a.ma>a.N&&a.Pa(a.i),a.ua(500);else{var c=a.nb();if(0<c)a.ua(c);else if(c=a.Fa())a.q=1,a.Eb(c),a.Ib(c)}};a.ua=function(c){a.Ja||(c||(c=0),a.Ja=setTimeout(a.ka,c))};a.nb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Oa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
c};a.Fa=function(){if(0<a.i.length)return a.i.shift()};a.Eb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.P(b)}};a.fb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var q;try{q=JSON.parse('{"x":"y"}')}catch(u){q=null}q&&"y"==q.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):h.$&&h.$.parseJSON?(a.X=function(a){return h.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Ib=function(c){var b,
d,f;a.fb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Sa&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?
f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof h.InstallTrigger||(b.abort=function(){b.src=n}));b.Da=function(){try{b.F&&(clearTimeout(b.F),b.F=0)}catch(a){}};b.onload=b.va=function(){a.ab(c);b.Da();a.rb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ga=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.qb);a.q=0;a.ma>a.N&&a.Pa(a.i);
a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ga())};a.Oa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Ma)try{f.removeChild(a.Ma)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Ma=a.B}b.F=setTimeout(function(){b.F&&(b.complete?b.va():(a.trackOffline&&
b.abort&&b.abort(),b.Ga()))},5E3);a.qb=c;a.B=h["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.J||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.rb=function(){if(a.ra()&&!(a.Na>a.N))try{h.localStorage.removeItem(a.pa()),a.Na=a.C()}catch(c){}};a.Pa=function(c){if(a.ra()){a.Ra();try{h.localStorage.setItem(a.pa(),h.JSON.stringify(c)),a.N=a.C()}catch(b){}}};a.Ra=function(){if(a.trackOffline){if(!a.offlineLimit||
0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Fa()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.Ka=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Jb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==
d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,
cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:h.location);d||(d="&");return c&&b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.G="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.G.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.O=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(l=0;250>=l;l++)76>l&&(a.g.push("prop"+l),a.O.push("prop"+l)),a.g.push("eVar"+l),a.O.push("eVar"+l),6>l&&a.g.push("hier"+l),4>l&&a.g.push("list"+l);l="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest".split(" ");a.g=a.g.concat(l);a.G=a.G.concat(l);a.ssl=0<=h.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename=
"AppMeasurement.offline";a.Oa=0;a.ma=0;a.N=0;a.Na=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=h;a.d=h.document;try{if(a.Sa=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Sa=!0}}catch(w){}a.ga=function(){a.ha&&(h.clearTimeout(a.ha),a.ha=n);a.l&&a.J&&a.l.dispatchEvent(a.J);a.A&&("function"==typeof a.A?a.A():a.l&&a.l.href&&(a.d.location=
a.l.href));a.l=a.J=a.A=0};a.Qa=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.M&&a.M==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=
0;else{var k=a.M=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.M==k&&(a.M=0)},1E4);f=a.Ia();a.track();if(f<a.Ia()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Ka(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||h.name&&d==h.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=new h.MouseEvent}if(b){try{b.initMouseEvent("click",
c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(n){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.J=b)}}}}}catch(p){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&
h.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Qa,30)};a.Qa();a.loadModule("ActivityMap")}
function s_gi(a){var h,n=window.s_c_il,p,l,r=a.split(","),s,q,u=0;if(n)for(p=0;!u&&p<n.length;){h=n[p];if("s_c"==h._c&&(h.account||h.oun))if(h.account&&h.account==a)u=1;else for(l=h.account?h.account:h.oun,l=h.allAccounts?h.allAccounts:l.split(","),s=0;s<r.length;s++)for(q=0;q<l.length;q++)r[s]==l[q]&&(u=1);p++}u||(h=new AppMeasurement);h.setAccount?h.setAccount(a):h.sa&&h.sa(a);return h}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,h=a.s_giq,n,p,l;if(h)for(n=0;n<h.length;n++)p=h[n],l=s_gi(p.oun),l.setAccount(p.un),l.setTagContainer(p.tagContainerName);a.s_giq=0}s_pgicq();
