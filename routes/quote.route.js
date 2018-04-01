const express = require('express');
const validate = require('express-validation');
import quoteService from '../services/quote.service';
import bodyValidation from '../config/body-validation';
var router = express.Router();

//localhost/api/quote
router.route('/:symbol/:scale/')
    .get(validate(bodyValidation.getQuote),quoteService.getQuoteDetailed);

router.route('/:symbol')
    .get(validate(bodyValidation.getQuote),quoteService.getQuote);


module.exports = router;