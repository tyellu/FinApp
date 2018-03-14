var express = require('express');
import authService from '../services/auth.service';
var router = express.Router();

//Default route of localhost/api/auth/
router.route('/google')
    .get(authService.googleSignIn);

router.route('/google/callback')
    .get(authService.googleCallback);

router.route('/logout'); 

module.exports = router;