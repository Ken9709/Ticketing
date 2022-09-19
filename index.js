const { ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const MNGDB = "mongodb+srv://Kenchil:vg1YUeG17wSfQgZq@cluster0.gqfpqfr.mongodb.net/?retryWrites=true&w=majority"

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MNGDB, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: 5000})
    })
    .then((res ) => {
        console.log(`Server running at ${res.url}`)
    })