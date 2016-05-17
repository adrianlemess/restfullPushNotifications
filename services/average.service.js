
//average.service.js
//Average's model schema
var Average = require('../model/average.model');
var Q = require('q');
var config = require('config.json');

var request = require('request');
var service = {};
service.storeAverageDaily = storeAverageDaily;
service.getLastAverages = getLastAverages;
service.getAverageDaily = getAverageDaily;
service.getListAverageDaily = getListAverageDaily;

module.exports = service;

function storeAverageDaily(quotation, callback){
   
    var average = (quotation.high + quotation.low)/2;
    var newDate = quotation.create_date;

    Average.findOneAndUpdate(
    {day: newDate.toDateString()},
    {average: average},
    {upsert: true},
    function(err, newMedia){
        
        if (err) {
              callback(err);
             
          }
            callback(newMedia);
        
    });
};
function getListAverageDaily(callback){
    Average.find().exec(function (err, average){
       if (err) {
           callback(err);
       } 
       else {
           callback(average);
       }
    });
}

function getAverageDaily(callback){

    Average.find().limit(1).sort({$natural:-1}).exec( function (err, average) {
        if (err) {
            callback(err);
        }
        else {
           
          callback(average[0].average);
        }

    });
    return callback;
}


function getLastAverages(callback){ 

    Average.find().limit(5).sort({$natural:-1}).exec( function (err, average) {
        if (err) {
            callback(err);
        }
        else {
            var lastAverages = 0;
            for (var i = 1; i <= 4; i++){
               lastAverages += average[i].average;
            }
            
            lastAverages = lastAverages/4;
            callback(lastAverages);
        }
        
    });
}

