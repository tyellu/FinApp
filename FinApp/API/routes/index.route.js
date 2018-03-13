const express = require('express');
const userRoutes = require('./user.route.js');
import authRoutes from './auth.route.js';
const portfolioRoutes = require('./portfolio.route.js');

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /user
router.use('/user', userRoutes);

//mount auth routes at /auth
router.use('/auth', authRoutes);

//mount portfolio routes at /portfolio
router.use('/portfolio', portfolioRoutes);

module.exports = router;