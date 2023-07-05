import express from 'express'
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';
import cors from 'cors'

const app = express();

app.use(cors())

app.use(express.static("public"))

app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue: resolvers,
    graphiql:true
}))

app.listen(5000, console.log(`app is running on port 5000`))