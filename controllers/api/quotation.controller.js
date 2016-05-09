var config = require('config.json');
var express = require('express');
var http = require('http');
var quotationService = require('../../services/quotation.service');
var averageService = require('../../services/average.service');

module.exports = {
    getQuotationAPI: function(req, res, next) {

        quotationService.getQuotationAPI(function(err, moeda){
           if(err) {console.log(err); return done(err);}
           res.send(moeda);
       });

    },
    // GET /
    getHelloWorld: function(req, res, next) {      

           res.json({HelloWorld: "helloWorld"});
    },
getQuotation:function (req, res, next) {

     quotationService.getQuotation()
        .then(function (moeda) {
            if (moeda) {
                res.send(moeda);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
},
    
   storeQuotation: function (req, res, next){

    

       
         quotationService.storeQuotation(function(quotation){
          averageService.storeAverageDaily(quotation, function(averageDaily){
                averageService.getLastAverages(function(lastAverage){
                   // if(quotation.bid > last4DaysAverage && quotation.bid )
                   if (quotation.bid > lastAverage){
                       console.log("Envia notificação");
                   }
                  
                });
          });
          
       });
       
     
    }
    
};
























//--------------------------------------------------------------------
/*router.get('/', getQuotation);
router.get('/store', storeQuotation);
module.exports = router;*/

/*
function getQuotation(req, res) {

	quotationService.Quotation(function(err, moeda){
       if(err) {console.log(err); return done(err);}
       res.send(moeda);
   });
    
    quotationService.storeQuotation(function(err, resposta){
        if(err) {console.log(err); return done(err);}
        res.send(resposta);
    });
}
*/


/*
function storeQuotation (req, res) {
  quotationService.storeQuotation(function(err, resposta){
    if(err) {console.log("aqui"+err); return done(err);}
    console.log("Pegou resposta"+resposta);
    if (resposta == true){
     res.status(200);
   }else{
    res.send('false');

}

});
}*/