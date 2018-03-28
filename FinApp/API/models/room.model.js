const Promise = require('bluebird');
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    members: [{
        type: String,
    }],
    defaultAmt : {
        type: Number,
        required: true
    },
    portfolios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio'
    }],
    expDate : {
        type : String,
        required: true
    },
    owner : {
        type: String,
        required: true
    }
},{timestamps:{}});

module.exports = mongoose.model('Room', RoomSchema);