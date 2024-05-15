const Message = require("../models/message-model");
const mongoose = require("mongoose");

// GET /api/messages
async function getMessages(req, res) {
    const msgs = await Message.find({}).sort({ createdAt: -1 });

    if (msgs.length == 0) res.status(400).json({ message: "There are no messages!" });
    else res.status(200).json(msgs);
}

// GET /api/messages/:id
async function getMessage(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No such message!" });
        const msg = await Message.findById(id);

        if (!msg) res.status(404).json({ message: "No such message!" });
        else res.status(200).json(msg);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There was an error retrieving your message!" });
    }
}

// POST /api/messages
async function createMessage(req, res) {
    try {
        const { sender, receiver, content } = req.body;
        const msg = await Message.create({ sender, receiver, content });
        res.status(200).json(msg);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There was an error processing your message!" });
    }
}

// PATCH /api/messages/:id
async function updateMessage(req, res) {

}

// DELETE /api/messages/:id
async function deleteMessage(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No such message!" });
        const msg = await Message.findOneAndDelete({ _id: id });

        if (!msg) res.status(404).json({ message: "No such message!" });
        else res.status(200).json({ message: "Message successfully deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There was an error deleting your message!" });
    }
}

module.exports = { getMessages, getMessage, createMessage, updateMessage, deleteMessage };