//server.js

require('rootpath')();
var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
//var config = require('config.json');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
app.set('views', __dirname + 'app');
var db = require('./config/db');
var quotationController = require('./controllers/api/quotation.controller')
mongoose.connect(db.url);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 
// use JWT auth to secure the api
//Configuration files
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

//Timer function
var cron = require('cron');
var cronJob = cron.job("* */5 * * * *", function(){
    // perform operation e.g. GET request http.get() etc.
    console.log("Timer");
    quotationController.storeQuotation();
});
cronJob.start();


app.use('/api', require('./controllers/routes.js'));
app.get('/', function(req, res){
    res.send("Hello World");
});


// start server
var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
      var addr = server.address();
console.log("API quotation listening at", addr.address + ":" + addr.port);
});
