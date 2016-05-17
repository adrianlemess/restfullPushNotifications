//controllers/routes.js
var express = require('express');
var averageController = require('./api/average.controller');
var quotationController = require('./api/quotation.controller');
var router = express.Router();


router.get('/getQuotationAPI', quotationController.getQuotationAPI); 
router.get('/getQuotation', quotationController.getQuotation);
router.get('/getListQuotations', quotationController.getListQuotations);
router.get('/getLastAverage', averageController.getLastDaysAverage); 
router.get('/getAverageDaily', averageController.getAverageDaily);
router.get('/getListAverageDaily', averageController.getListAverageDaily);


// router.put('/:_id', updateUser);
// router.delete('/:_id', deleteUser);
router.get('/', quotationController.getHelloWorld);
module.exports = router;

