/*jshint esversion: 6 */
const methodOverride = require('method-override');
//import methodOverride from 'method-override';
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation =  require('express-validation');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const util = require('util');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
// import winstonInstance from './winston';
const routes = require('../routes/index.route.js');
const config = require('./config.js');
import User from '../models/user.model';
// import APIError from '../server/helpers/APIError';


// ========= connect to mongo db =========== 
mongoose.Promise = require('bluebird');
const mongoUri = `${config.mongo.host}`;
var settings = {
    reconnectTries : Number.MAX_VALUE,
    autoReconnect : true
};
mongoose.connect(mongoUri, settings);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
});}

// ===========App Configuration =============================
const app = express();

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
// app.use(cors());
// ============Session Setup===================================
app.use(session({
    secret: `${config.mongo.host}`,
    resave: false,
    saveUninitialized: true,
}));
//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//serializing and deserializing user
passport.serializeUser(function(user, done) {
    console.log("serializeUser");
    console.log(user);
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
    console.log("deserializeUser");
    console.log(user);
    done(null, JSON.parse(user));
});

//===========Passport Strategy======================
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID:`${config.gID}`,
    clientSecret: `${config.gSecret}`,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback : true
  },
  function(req, accessToken, refreshToken, profile, done) {
    // console.log(req);
	User.findOneAndUpdate(
        {email: profile._json.emails[0].value},
        {$setOnInsert:{token: accessToken, email: profile._json.emails[0].value}},
        {safe: true, new: true, upsert: true},
        function(err,usr) { 
		    usr.token = accessToken;	
		    usr.save(function(err,usr,num) {    
                if(err)	{
                    return "err storing token";
                }
		    });
            process.nextTick(function() {
                return done(null,usr);
            });
	    });
    }
));

app.use(function(err, req, res, next) {
    console.log(err);
});


app.use('/api', routes);
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
passport.authenticate('google', {
    successRedirect : 'http://localhost:3000/MainPage/',
    failureRedirect : '/'
}));

module.exports = app;
