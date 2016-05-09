var mongoose = require('mongoose');

var validate = require('mongoose-validator');

var quotationSchema = new mongoose.Schema({
    idreg: Number,
    code: String,
    codein: String,
    high: Number,
    bid: Number,
    low: Number,
    create_date: { type: Date }
});

//Module is created from user's mongoose.model 
var Quotation = mongoose.model('Quotation', quotationSchema);
module.exports= Quotation;
