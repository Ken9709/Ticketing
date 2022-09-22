// TODO need to make this createTicket function here
const Ticket = require('../../models/Ticket');


module.exports = {
    Mutation: { 
        async createTicket(_, {ticketInput:{content, isAsigned}}){
            //create a new model based on the mongoose model we already made.
            //we are SETTING UP THE MODEL, not saving data.
            const newTicket = new Ticket({
                
                content: content,
                createdBy: "Kenny",
                createdAt: new Date().toISOString(),
                isAsigned: isAsigned
                
            });
            
            //save the newly created model to mongoDB
            const res = await newTicket.save();
            console.log(res._doc)
            return{
                id:res.id,
                //rest of attributes necessary for return statement
            
                ...res._doc
                
            };
        },
        async deleteTicket(_, {ID}) {
            //delete a ticket based on its ID, compared to the implicit mongoDB id
            const wasDeleted = (await Ticket.deleteOne({_id: ID})).deletedCount;
            return wasDeleted; //deletedCount gives 1 if something deleted, 0 if not
        },

        async editTicket(_, {ID, ticketInput:{content, isAsigned}}){
            const wasEdited = (await Ticket.updateOne({ _id: ID}, {content: content, isAsigned: isAsigned})).modifiedCount;
            return wasEdited; 
        }
    },
    Query: {
        // first arguement is the parent( dont need), second is parameters being passed into resolver
        // destrcutured, 
        async ticket (_, {ID}) {
            return await Ticket.findById(ID)
        },
        async getTickets(_, {amount}) {
            //find the tickets created last and limit them by the amount(gives {amount} oldest tickets)
            return await Ticket.find().sort({createdAt: -1}).limit(amount)
        }
    }
}