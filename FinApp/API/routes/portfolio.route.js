const express = require('express');
const validate = require('express-validation');
import portfolioService from '../services/portfolio.service';

const router = express.Router();

//localhost/api/portfolio
router.route('/')

    .get(portfolio.service.getStocks)

    .post(portfolio.service.addStocks);
    
module.exports = router;