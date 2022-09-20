// TODO need to make this createTicket function here
const Ticket = require('../../models/Ticket');


module.exports = {
    Mutation: { 
        async createTicket(_, {ticketInput:{content,isAsigned}}){
            const newTicket = new Ticket({
                
                content: content,
                createdBy: "Kenny",
                createdAt: new Date().toISOString(),
                isAsigned: isAsigned
                
            });
            
            const res = await newTicket.save();
            console.log(res);
            return{
                id:res.id,
                //rest of attributes necessary for return statement
                ...res._doc
            };
        }
    },
    Query: {
        ticket: (_, {ID}) => Ticket.findById(ID)
    }
}