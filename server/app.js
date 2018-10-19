const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');


const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));  


app.listen(4000, () => {
  console.log('Now listening to requests from port 4000...');
});

