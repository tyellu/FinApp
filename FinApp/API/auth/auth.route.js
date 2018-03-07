var express = require('express');
var router = express.Router();
var authService = require('./auth.service');

router.route('/login').get(authService.login);

module.exports = router;