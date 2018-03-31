const express = require('express');
const validate = require('express-validation');
import quoteService from '../services/quote.service';
var router = express.Router();

//localhost/api/quote
router.route('/:symbol/:scale/')
    .get(quoteService.getQuoteDetailed);

router.route('/:symbol')
    .get(quoteService.getQuote);


module.exports = router;