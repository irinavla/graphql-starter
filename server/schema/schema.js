const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const BookTYpe = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});