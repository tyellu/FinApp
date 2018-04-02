const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const TransactionSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
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
    type:{
        type:String,
        required:true
    },
    room:{
        type:String,
        default:null
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('Transaction', TransactionSchema);