const express = require('express');
const validate = require('express-validation');
import userService from '../services/user.service';

const router = express.Router();

//localhost/api/user
router.route('/')

    .get(userService.getUsers)

    .post(userService.createUser);
    
module.exports = router;