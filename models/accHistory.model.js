const mongoose = require('mongoose');
const httpStatus = require('http-status');

const accHistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    history: [{
        accValue: Number,
        date:{
            type: Date,
            default: Date.now
        }
    }]
}, {timestamps : {}});

module.exports = mongoose.model('accHist', accHistSchema);