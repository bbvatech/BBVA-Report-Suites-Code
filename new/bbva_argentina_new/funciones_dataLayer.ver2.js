
function setVersionDL(){
    digitalData.versionDL = "1.10";
}

function setPageInstanceID(){
    
    digitalData.pageInstanceID = "pro";

}

function setPageName(){

	var area = digitalData.page.pageInfo.area;
	var pageSegment = digitalData.page.pageInfo.pageSegment;
	var levels = [];
	for (var i = 1; i < 11; i++) {
		if (digitalData["page"]["pageInfo"]["level" + i] != "") {

			levels.push(digitalData["page"]["pageInfo"]["level" + i]);

		} else {

			break;

		}
	}
	var pageName = area + ":" + pageSegment;
	for (var i = 0; i < levels.length; i++) {
		if (i === 0) {
			pageName += ":";
		}
		if (i == levels.length - 1) {
			pageName += "" + levels[i];
		} else {
			pageName += "" + levels[i] + ":";
		}
	}
		digitalData.page.pageInfo.pageName = pageName;
	//digitalData.page.pageInfo.pageName = pageName;
}

function setPageIntent( pageIntent ){
	digitalData.page.pageInfo.pageIntent = pageIntent;

}

function setPageSegment( pageSegment ){
	digitalData.page.pageInfo.pageSegment = pageSegment;
}

function setSysEnv(){
	

	var check = false;
	(function(a) {
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
	})

	(navigator.userAgent || navigator.vendor || window.opera);
	if (check) {
		digitalData.page.pageInfo.sysEnv = "web-movil";
	} else {
		digitalData.page.pageInfo.sysEnv = "escritorio";
	}
}

function setVersion( version ){
	digitalData.page.pageInfo.version = version;
}

function setChannel( channel ){
	digitalData.page.pageInfo.channel = channel;
}

function setLanguage( language ){
	digitalData.page.pageInfo.language = language;
}

function setGeoRegion( geoRegion){
	digitalData.page.pageInfo.geoRegion = geoRegion;
}

function setLevel(numero, level){
	switch ( numero ) {
		case 1:
			digitalData.page.pageInfo.level1 = level;
		break;

		case 2:
			digitalData.page.pageInfo.level2 = level;
		break;

		case 3:
			digitalData.page.pageInfo.level3 = level;
		break;

		case 4:
			digitalData.page.pageInfo.level4 = level;
		break;

		case 5:
			digitalData.page.pageInfo.level5 = level;
		break;

		case 6:
			digitalData.page.pageInfo.level6 = level;
		break;

		case 7:
			digitalData.page.pageInfo.level7 = level;
		break;

		case 8:
			digitalData.page.pageInfo.level8 = level;
		break;

		case 9:
			digitalData.page.pageInfo.level9 = level;
		break;

		case 10:
			digitalData.page.pageInfo.level10 = level;
		break;

		default:
		break;
	}
}

function setArea(){

	var dominiosPublicos = ["bancomer.com", "bancomer.com.mx", "integrado.tridion-portal"];
	var dominiosPrivados = ["a1.bbvanet.com.mx","a2.bbvanet.com.mx","test.bbvanet.com.mx" ];
	var url = window.location.href;

	var area = "";

	for(var i = 0; i < dominiosPublicos.length; i++){

		if(url.indexOf(dominiosPublicos[i]) > -1){
		area = "publica";
		break;

		}
	}

	for(var j = 0; j < dominiosPrivados.length; j++){

		if(url.indexOf(dominiosPrivados[j]) > -1){

			area = "privada";
			break;

		}

	}

	digitalData.page.pageInfo.area = area;
}

function setServer(){
	digitalData.page.pageInfo.server = window.location.hostname;
}

function setBussinessUnit( bussiness_unit ){
	digitalData.page.pageInfo.bussinessUnit = bussiness_unit;
}

function setErrorPage( error ){
	digitalData.page.pageInfo.errorPage = error;
}

function setInternalCampaign(loc, cf, cc, cn, pr, pc, qu) {
               var pos = digitalData.internalCampaign.attributes.length;
               if (digitalData.internalCampaign.attributes[0].location == "" &&
                       digitalData.internalCampaign.attributes[0].campaignFormat == "" &&
                       digitalData.internalCampaign.attributes[0].collectiveCode == "" &&
                       digitalData.internalCampaign.attributes[0].campaignName == "" &&
                       digitalData.internalCampaign.attributes[0]. product == "" &&
                       digitalData.internalCampaign.attributes[0]. productCode == "" &&
                       digitalData.internalCampaign.attributes[0]. quantity == "") {
                           pos = 0;
               }
               digitalData.internalCampaign.attributes[pos] = {
                       location: loc,
                       campaignFormat: cf,
                       collectiveCode: cc,
                       campaignName: cn,
                       product: pr,
                       productCode: pc,
                       quantity: qu
               };
               }

function setOnSiteSearchResults(){}
function setOnSiteSearchTerm(){}
function setOriginalPage(){}
function setNameOfVideoDisplayed(){}

function setlocation(){}
function setCampaignFormat(){}
function setCollectiveCode(){}
function setCampaignName(){}

function setEventName(){}
function setSiteActionName(){}

function setUserAgent(){
	 // convertimos en minusculas la cadena devuelta por navigator.userAgent
    var nav = navigator.userAgent.toLowerCase();

    //buscamos dentro de la cadena mediante indexOf() el identificador del navegador
    if(nav.indexOf("msie") != -1){
    	digitalData.user.device.userAgent = "explorer";
    } else if(nav.indexOf("firefox") != -1){

    	digitalData.user.device.userAgent = userAgenCVert("(m|M)ozilla");

    } else if(nav.indexOf("opera") != -1 ){

    	digitalData.user.device.userAgent = userAgenCVert("(O|o)opera");

    } else if(nav.indexOf("chrome") != -1 ){

        digitalData.user.device.userAgent = userAgenCVert("(c|C)hrome");

    }else if( nav.indexOf("safari") != -1 ){

    	digitalData.user.device.userAgent = userAgenCVert("(s|S)afari");
    	
    }else if( nav.indexOf("applewebkit" != -1) ){

    	digitalData.user.device.userAgent = userAgenCVert("(a|A)ppleWebKit");

    }
}

function setMobile(){

	var check = false;
	(function(a) {
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
		 check = true;
	})

	(navigator.userAgent || navigator.vendor || window.opera);
	if (check) {
		digitalData.user.device.mobile = "si";
	} else {
		digitalData.user.device.mobile = "no";
	}
	
}

function setUserState( userState ){
	digitalData.user.userState = userState;
}

function setProfileID(){}
function setGlobal(){}
function setProfile(){}
function setGender(){}
function setCountry(){}
function setState(){}
function setAge(){}

function setTransactionID( id ){
	digitalData.application.transactionID = id;
}

function setType( type ){
	digitalData.application.application.type = type;
}

function setName( name ){
	digitalData.application.application.name = name;
}

function setFulfillmentModel( fulfillmentModel ){
	digitalData.application.fulfillmentModel = fulfillmentModel;
}

function setAmount( amount ){
	digitalData.application.amount = amount;
}
function setPaymentAmount( payamount ){
	digitalData.application.paymentAmount = payamount; 
}
function setNumberOfPayments( numberofpayments ){
	digitalData.application.numberOfPayments = numberofpayments;
}
function setPaymentDate(){}
function setPaymentType( payment_type ){
	digitalData.application.paymentType = payment_type;
}
function setServiceCharge(){}
function setTypology( typology ){
	digitalData.application.typology = typology;
}
function setCurrency( currency ){
	digitalData.application.currency = currency;
}
function setProgramTypeHired( typehired){
	digitalData.application.programTypeHired = typehired;
}
function setOffer(){}
function setOperationNumber( operationNumber ){
	digitalData.application.operationNumber = operationNumber;
}
function setTerm( term ){
	digitalData.application.term = term;
}
function setInterestRate( interes_rate ){
	digitalData.application.interestRate = interes_rate;
}



function setProcess( proccess ){
	digitalData.application.process = proccess;
}

function setStep( step ){
	digitalData.application.step = step;
}



function setState( state ){
	digitalData.application.state = state;
}

function setErrorType(){}





function setPrimaryCategory( primarycategory ){
	digitalData.product.primaryCategory = primarycategory;
}

function setProductSubtype( ProductSubtype ){
	digitalData.product.productSubtype = ProductSubtype;
}

function setProductName( productname ){
	digitalData.product.productName = productname;
}

function userAgenCVert(navegador){
	var usera = navigator.userAgent;
	var res = usera.split(" ");
	var re = new RegExp(navegador);
	for( i = 0; i < res.length; i++){
		
		if(re.test(res[i])){
			return(res[i]);
		}
	}
	return navigator.userAgent;
}





