const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    }
});


module.exports = mongoose.model('User', UserSchema);