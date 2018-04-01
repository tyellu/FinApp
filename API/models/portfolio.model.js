const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const PortfolioSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    balance: {
        type: Number,
        required: true
    },
    stocks : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    }]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);