const express = require('express');
const validate = require('express-validation');
import portfolioService from '../services/portfolio.service';

const router = express.Router();

//localhost/api/portfolio
router.route('/')

    .get(portfolioService.getStocks)

    .post(portfolioService.addStocks);
    
module.exports = router;