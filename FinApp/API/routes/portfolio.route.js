const express = require('express');
const validate = require('express-validation');
import portfolioService from '../services/portfolio.service';
import cors from 'cors';
var router = express.Router();


//localhost/api/portfolio
router.route('/new')
    .post(portfolioService.createPortfolio);

router.route('/:username/buy')
    .post(portfolioService.addToPortfolio);

router.route('/:username/sell')
    .post(portfolioService.removeFromPortfolio);

router.route('/:username')
    .get(portfolioService.getPortfolio);



module.exports = router;