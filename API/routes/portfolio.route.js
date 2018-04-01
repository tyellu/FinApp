const express = require('express');
const validate = require('express-validation');
import portfolioService from '../services/portfolio.service';
var router = express.Router();


//localhost/api/portfolio
router.route('/new')
    .post(portfolioService.createPortfolio);

router.route('/makeNewTransaction')
    .post(portfolioService.makeNewTransaction);

router.route('/getTransactions')
    .get(portfolioService.getTransactions);

router.route('/news')
    .get(portfolioService.getNews);

router.route('/hist')
    .get(portfolioService.getPortfolioHistory);

router.route('/')
    .get(portfolioService.getPortfolio);



module.exports = router;