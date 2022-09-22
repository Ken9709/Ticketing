
const {gql} = require('apollo-server');

module.exports = gql`

type Message { 
    text:String
    createdAt: String,
    createdBy: String
}

type User{
    
    email: String,
    password: String,
    token:String
}

type Ticket{
    content: String,
    isAsigned: Boolean,
    createdAt: String, 
    createdBy: String
}

input TicketInput{
    content: String,
    isAsigned: Boolean
}

input MessageInput {
    text: String,
    username: String
}

input RegisterInput{
    username: String,
    email: String,
    password: String,
    confirmPassword: String
}

input LoginInput{
    email: String,
    password: String
}

type Query{
    message(id: ID!): Message,
    user(id: ID!): User,
    ticket(id: ID!): Ticket,
    getTickets(amount: Int): [Ticket]
}

type Mutation { 
    createMessage(messageInput: MessageInput): Message!,
    registerUser(registerInput: RegisterInput): User,
    loginUser(loginInput: LoginInput): User,
    createTicket(ticketInput: TicketInput): Ticket,
    deleteTicket(ID: ID!): Boolean
    editTicket(ID: ID!, ticketInput: TicketInput): Boolean
}

`

// we could create a new input type like EditTicketInput like this
// Which would not allow the users to change the content, only the isaAssigned variable, etc
// editTicket(ID: ID!, editTicketInput: EditTicketInput)
// input EditTicketInput{
//    content:String
// }