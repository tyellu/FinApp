const express = require('express');
const validate = require('express-validation');
import portfolioService from '../services/portfolio.service';
var router = express.Router();


//localhost/api/portfolio
router.route('/transactions')
    .post(portfolioService.makeNewTransaction)
    .get(portfolioService.getTransactions);

router.route('/transactions/:room')
    .post(portfolioService.makeNewTransaction)
    .get(portfolioService.getTransactions);

router.route('/hist')
    .get(portfolioService.getPortfolioHistory);

router.route('/')
    .get(portfolioService.getPortfolio);



module.exports = router;