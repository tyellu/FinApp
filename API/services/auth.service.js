function isAuth(req, res, next){
    if (req.isAuthenticated()) return next();
    res.status(401).end("access denied");
}

export default {isAuth};
