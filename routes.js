var express = require('express');
var averageController = require('./controllers/api/average.controller');
var quotationController = require('./controllers/api/quotation.controller');
var router = express.Router();


router.get('/getQuotationAPI', quotationController.getQuotationAPI); 
router.get('/getQuotation', quotationController.getQuotation);
router.get('/getAverages', averageController.getLastDaysAverage); 
router.get('/getAverageDaily', averageController.getAverageDaily);


// router.put('/:_id', updateUser);
// router.delete('/:_id', deleteUser);
router.get('/', quotationController.getHelloWorld);
module.exports = router;

