console.log('var fulfillment ="' + digitalData.application.fulfillmentModel + '";');
console.log('var appName = "' + digitalData.application.application.name + '";');
console.log('var appType = "' + digitalData.application.application.type + '";');
console.log('var appStep = "app on click start";');
console.log('var primaryCategory = "' + digitalData.product.primaryCategory + '";');
console.log('var productSubtype = "' + digitalData.product.productSubtype + '";');
console.log('var productName = "' + digitalData.product.productName + '";');



//////
s.clearVars();
// Damos valor a las variables
var fulfillment ="online";
var appName = "fondos de inversion one click";
var appType = "contratacion";
var appStep = "app on click start";
var primaryCategory = "inversiones";
var productSubtype = "";
var productName = "fondos";

var customLink = appName + ":" + appStep + ":" + nombreLink;

digitalData.application.fulfillmentModel = fulfillment;
digitalData.application.application.name = appName;
digitalData.application.application.type = appType;
digitalData.application.step = appStep;
digitalData.product.primaryCategory = primaryCategory;
digitalData.product.productSubtype = productSubtype;
digitalData.product.productName = productName;
_satellite.setVar("custom link", customLink);

// Ejecutamos la regla
_satellite.track("App On Click Start");