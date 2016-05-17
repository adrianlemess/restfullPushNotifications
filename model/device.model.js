var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
 
var deviceSchema = mongoose.Schema({ 
 
    deviceName      : String,
    deviceId        : String, 
    registrationId  : String
 
});
 
//Module is created from device's mongoose.model 
var Device = mongoose.model('Device', deviceSchema);
module.exports = Device;
