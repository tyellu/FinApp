const express = require('express');
import portfolioRoutes from './portfolio.route';
import quoteRoutes from './quote.route';
import passport from 'passport';
import auth from '../services/auth.service';
import newsService from '../services/news.service';


const router = express.Router();

router.get('/', (req,res) => 
  res.redirect('/')    
);

/** GET /health-check - Check service health */
router.get('/health-check', auth.isAuth ,(req, res) =>
  res.send('OK')
);

router.route('/news', auth.isAuth).get(newsService.getNews);

// mount quote routes at /quote
router.use('/quote', auth.isAuth ,quoteRoutes);

//mount portfolio routes at /portfolio
router.use('/portfolio', auth.isAuth ,portfolioRoutes);

module.exports = router;