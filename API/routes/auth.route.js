const express = require('express');
import authService from '../services/auth.service';
const router = express.Router();

//localhost/auth/
router.use('/logout');

router.use('/isAuth');

export default router;
