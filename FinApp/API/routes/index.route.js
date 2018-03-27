const express = require('express');
const userRoutes = require('./user.route.js');
import portfolioRoutes from './portfolio.route';
import quoteRoutes from './quote.route';
import passport from 'passport';
import auth from '../services/auth.service';
import roomRoutes from './room.route';


const router = express.Router();

router.get('/', (req,res) => 
  res.redirect('/')    
);


/** GET /health-check - Check service health */
router.get('/health-check', auth.isAuth ,(req, res) =>
  res.send('OK')
);

// mount user routes at /user
router.use('/user', auth.isAuth ,userRoutes);

// mount quote routes at /quote
router.use('/quote', auth.isAuth ,quoteRoutes);

//mount portfolio routes at /portfolio
router.use('/portfolio', auth.isAuth ,portfolioRoutes);

//mount room routes at /rooms
router.use('/room', auth.isAuth , roomRoutes);

module.exports = router;