const express = require('express');
const userRoutes = require('./user.route.js');
import portfolioRoutes from './portfolio.route';
import quoteRoutes from './quote.route';
import passport from 'passport';


const router = express.Router();

router.get('/', (req,res) => 
  res.redirect('/')    
);


/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /user
router.use('/user', userRoutes);

// mount quote routes at /quote
router.use('/quote', quoteRoutes);

//mount portfolio routes at /portfolio
router.use('/portfolio', portfolioRoutes);

module.exports = router;