const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin request
app.use(cors());


// connect to mlab database
mongoose.connect('mongodb://irina:pass1234@ds135653.mlab.com:35653/graphql-list');
mongoose.connection.once('open', () => {
  console.log('connected to DB');
}); 


app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));  


app.listen(4000, () => {
  console.log('Now listening to requests from port 4000...');
});

