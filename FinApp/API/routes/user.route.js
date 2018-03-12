const express = require('express');
const validate = require('express-validation');
const User = require('../Models/user.modal.js');

const router = express.Router();

//localhost/api/user
router.route('/')
    .get(function(req,res,next){
        User.find(function(err, usrs){
            res.json(usrs);
        });
    })
    .post(function(req, res, next){
        User.create(req.body, function(err, usr){
            res.json(usr);
        });
    });
    
module.exports = router;