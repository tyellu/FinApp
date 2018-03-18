const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  PORT: Joi.number()
    .default(4040),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  CLIENT_ID: Joi.string().required()
    .description('google api client id'),
  CLIENT_SECRET: Joi.string().required()
    .description('google api secret'),
  SESSION_SECRET: Joi.string().required()
    .description('express-session secret')
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  gID: envVars.CLIENT_ID,
  gSecret: envVars.CLIENT_SECRET,
  AlphaKey: envVars.ALPHA_KEY,
  sessionSecret: envVars.SESSION_SECRET
};

module.exports = config;
