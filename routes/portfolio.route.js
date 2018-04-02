const express = require('express');
const validate = require('express-validation');
import portfolioService from '../services/portfolio.service';
import bodyValidation from '../config/body-validation';
var router = express.Router();


//localhost/api/portfolio
router.route('/transactions')
    .post(validate(bodyValidation.makeNewTransaction), portfolioService.makeNewTransaction)
    .get(portfolioService.getTransactions);

router.route('/transactions/:room')
    .post(portfolioService.makeNewTransaction)
    .get(portfolioService.getTransactions);

router.route('/hist')
    .get(portfolioService.getPortfolioHistory);

router.route('/')
    .get(portfolioService.getPortfolio);

router.route('/:room')
    .get(portfolioService.getPortfolio);



module.exports = router;