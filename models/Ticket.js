const{ model, Schema} = require('mongoose');

const ticketSchema = new Schema({
    // syntax for schema with single property fields
    content: String,
    isAsigned: Boolean,
    createdAt: String, 
    createdBy: String
})

module.exports = model('Ticket', ticketSchema);