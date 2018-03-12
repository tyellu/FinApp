/*jshint esversion: 6 */
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation =  require('express-validation');
const helmet = require('helmet');
const passport = require('passport');
const expressSession = require('express-session');
const util = require('util');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
// import winstonInstance from './winston';
const routes = require('../routes/index.route.js');
const config = require('./config.js');
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

// ===========================================
const app = express();
app.use(bodyParser.json());


//===========TODO sessions and cookies============
// app.use(cookieParser());
// app.use(expressSession({
//   store: new MongoStore({
//     mongooseConnection:mongoose.connection
//   }),
//   secret: "wousgsu23afhg987a9t437huasdfd923u4h1928jaskdfnp9",
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(compress());
// app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// ========= Routing ===========
app.use('/api', routes);


// var router = express.Router();
// const authRoutes = require('./auth/auth.route');

// router.use('/auth', authRoutes);
// .... add more routes here

// ========= Routing End ===========

// TODO: Security Measures

module.exports = app;
