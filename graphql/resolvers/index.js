const messagesResolvers = require('./messages');
const usersResolvers = require('./users');
const ticketsResolvers = require('./tickets');

module.exports = {
    Query: { 
        ...messagesResolvers.Query,
        ...usersResolvers.Query,
        ...ticketsResolvers.Query
    },
    Mutation: {
        ...messagesResolvers.Mutation,
        ...usersResolvers.Mutation,
        ...ticketsResolvers.Mutation
    },
}