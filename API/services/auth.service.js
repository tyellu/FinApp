import User from '../models/user.model';

// import passport from 'passport';

function isAuth(req, res, next){
    if (req.isAuthenticated()) return next();
    res.status(401).end("access denied");
}

function logout(req, res, next){
    //TODO
}

export default {isAuth, logout};
