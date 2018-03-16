import User from '../models/user.model';
// import passport from 'passport';

function googleSignIn(req, res, next){
    // console.log('working on login');
    // console.log(req._passport.instance);
    var passport = req._passport.instance;
    passport.authenticate('google', {scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read']})(req,res,next);
}

function googleCallback(req, res, next){
    var passport = req._passport.instance;
    passport.authenticate('google',function(err, user, info) {
        console.log("u : " + user);
		if(err) {
			return next(err);
		}
		if(!user) {
			return res.redirect('http://localhost:3000/api/health-check');
		}
		User.findOne({email: user.email},function(err,usr) {
			res.json(user);
		});
    })(req,res,next);
}

function logout(req, res, next){
    
}

export default {googleSignIn, googleCallback};
