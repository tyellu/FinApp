const express = require('express');
const validate = require('express-validation');
import portfolioService from '../services/portfolio.service';
var router = express.Router();

//localhost/api/portfolio
router.route('/new')
    .post(portfolioService.createPortfolio);

router.route('/:username')
    .post(portfolioService.addToPortfolio);

router.route('/:username')
    .get(portfolioService.getPortfolio);



module.exports = router;