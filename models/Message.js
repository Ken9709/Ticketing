const{ model, Schema} = require('mongoose');

const messageSchema = new Schema({
    // syntax for schema with single property fields
    text: String,
    createdAt: String,
    createdBy: String
})

module.exports = model('Message', messageSchema);