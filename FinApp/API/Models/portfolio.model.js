const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const PortfolioSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    stock:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);