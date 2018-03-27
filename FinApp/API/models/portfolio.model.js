const mongoose = require('mongoose');
const httpStatus = require('http-status');

const PortfolioSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    balance: {
        type: Number,
        default: 10000,
    },
    stocks : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    }],
    roomName : {
        type: String,
        default: null
    },
    defaultAmt: {
        type: Number,
        default: 10000
    }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);