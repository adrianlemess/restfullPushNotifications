var config = require('config.json');
var express = require('express');
var http = require('http');
var averageService = require('../../services/average.service');


module.exports = {
 getLastDaysAverage: function(req, res, next) {
     
     averageService.getLastAverages(function(average){
               
              res.json({average: average});
          }); 


    },   
     getAverageDaily: function(req, res, next) {
     
     averageService.getAverageDaily(function(average){
                console.log("Average: "+average);
              res.json({averageDaily: average});
          }); 


    }
}