// need to provide window some others for libraries
var window =  this;
var self = this;
var global = this;
var root = this;

bricks.config.language = Settings.language;

bricks.device = {
    'appIdentifier': Device.appIdentifier,
    'appVersion': Device.appVersion,
    'model': Device.model,
    'productType': Device.productType,
    'systemVersion': Device.systemVersion,
    'vendorIdentifier': Device.vendorIdentifier
};

console.log('bricks.environment',bricks);


