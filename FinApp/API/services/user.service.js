const User = require('../Models/user.model.js');

function getUsers(req, res, next){
    User.find(function(err, usrs){
        res.json(usrs);
    });
}

function createUser(req, res, next){
    User.create(req.body, function(err, usr){
        res.json(usr);
    });
}

export default {getUsers, createUser};