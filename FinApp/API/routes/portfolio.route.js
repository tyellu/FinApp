const express = require('express');
const validate = require('express-validation');
import portfolioService from '../services/portfolio.service';
var router = express.Router();

//localhost/api/portfolio
router.route('/addStocks')
    .post(portfolioService.addStocks);

router.route('/getStocks/:username')
    .get(portfolioService.getStocks);

module.exports = router;