const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const stockSchema = new mongoose.Schema({
    symbol: {
        type:String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        integer: true,
        min: 0
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Stock', stockSchema);