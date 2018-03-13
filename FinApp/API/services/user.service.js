const User = require('../models/user.model.js');

function getUsers(req, res, next){
    User.find({},function(err, usrs){
        res.json(usrs);
    });
}

function createUser(req, res, next){
    const user = new User({
        _id: req.body.username,
    });

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

export default {getUsers, createUser};