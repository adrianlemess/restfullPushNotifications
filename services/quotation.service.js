
//quotation.service.js
//Quotation's model schema
var Quotation = require('../model/quotation.model');
var Q = require('q');
var config = require('config.json');

var request = require('request');
var service = {};
service.getQuotationAPI = getQuotationAPI;
service.storeQuotation = storeQuotation;
service.getQuotation = getLastQuotation;
service.getListQuotations = getListQuotations;

module.exports = service;



function getQuotationAPI(callback) {
//Configura as opções para criar a requisição a API de cotação
    var options = {
    url: 'https://economia.awesomeapi.com.br/json/USD-BRL/1',
    method:'GET',
    json: true,
    headers: {
      'User-Agent': 'request'
    }
};
          //Callback que manusea a resposta do API
          function handleResponse(error, response, body) {
            if (!error && response.statusCode == 200) {

                var info = body;
                var data = {
                    idreg: info[0].idreg,
                    code: info[0].code,
                    codein: info[0].codein,
                    high: info[0].high,
                    bid: info[0].bid,
                    low: info[0].low,
                    create_date: info[0].create_date
                }

                return callback(null, data);
            }
            return callback(error); // or some other more robust error handling.
        }
        request(options, handleResponse);
    }
        

//Pegar ultima cotação
function getLastQuotation(){
    var deferred = Q.defer();
    Quotation.find().limit(1).sort({$natural:-1}).exec( function (err, quotationMongo) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(quotationMongo[0]);
        }
        
    });
    return deferred.promise;
}
function getListQuotations(callback){
   Quotation.find().limit(10).sort({$natural:-1}).exec(function (err, quotation){
       if (err) {
           callback(err);
       } 
       else {
           callback(quotation);
       }
    });
}

//Armzenar média diária
//Recuperar a maior média do dia e a menor média do dia calcular e depois armazenar
//function storeAverageDaily {
//   // var lastQuotation = getLastQuotation().then
//}

//Calcular média dos ultimos 4 dias
        
//Pegar média dos ultimos dias e verificar o indicador, se passar chamar uma função de push notification




//Armazenar cotacao no banco se o dado for atualizado
function storeQuotation(callback) {
    var deferred = Q.defer();
    getQuotationAPI(function(err, quotationApi){

        if(err) {console.log(err);
            return done(err);
        }
        // Retornar o valor de: averageService.getAverages e botar no campo esse valor
        //Salva no banco
            var newQuotation = new Quotation({
            idreg: quotationApi.idreg,
            code: quotationApi.code,
            codein: quotationApi.codein,
            high: quotationApi.high,
            bid: quotationApi.bid,
            low: quotationApi.low,
            create_date: quotationApi.create_date
        });
        //lastQuoation(newQuotation, function(err, response){

        Quotation.find().limit(1).sort({$natural:-1}).exec( function (err, quotationMongo) {
        if (err) {
        console.log(err);
        }
        if (quotationMongo[0] == undefined){
        newQuotation.save(function(err, quotation){
        if (err){
        console.log(err);

        } 

        callback(quotation);
        });   

        }else if ((quotationMongo[0].high != newQuotation.high)||(quotationMongo[0].bid != newQuotation.bid)||(quotationMongo[0].low != newQuotation.low)){
            
            newQuotation.save(function(err, quotation){
                if (err){
                    console.log(err);
                    callback(err);
                }      
                console.log("armazenou- service");
                callback(quotation);
            });
        }
        });
        
    });

}








