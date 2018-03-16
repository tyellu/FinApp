const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const UserSchema = new mongoose.Schema({
    token: String,
    email: String,
    username: String
});

module.exports = mongoose.model('User', UserSchema);