const { Schema, model } = require('mongoose')

const collection = 'message'

const MessageSchema = new Schema({
    user: { type: String, max: 100, required: true},
    message: { type: String, max: 450, required: true},
});

const messageModel = model(collection, MessageSchema)
module.exports = { messageModel }



