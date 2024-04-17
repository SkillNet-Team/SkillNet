const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    content: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);