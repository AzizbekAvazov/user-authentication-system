const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log("Connected to database");
        return server.listen({ port: 4000 });
    })
    .then((response)=> {
        console.log(`Server running at ${response.url}`)
    });



