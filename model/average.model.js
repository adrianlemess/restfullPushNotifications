var mongoose = require('mongoose');

var validate = require('mongoose-validator');

var averageSchema = new mongoose.Schema({
    day: {type: Date},
    average: Number
});

//Module is created from average's mongoose.model 
var Average = mongoose.model('Average', averageSchema);
module.exports= Average;
