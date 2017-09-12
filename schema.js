const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNotNull
} = require('graphql');

// Hardcoded data
const customers = [
  {
    id: '1', 
    name: 'John Doe', 
    email: 'jdoe@gmail.com', 
    age: 35
  },
  {
    id: '2', 
    name: 'Sarah Smith', 
    email: 'ssmith@gmail.com', 
    age: 22
  },
  {
    id: '3', 
    name: 'Alex Kim', 
    email: 'akim@gmail.com', 
    age: 24
  },
]

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields:() => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer:{
      type: CustomerType,
      args:{
        id:{type: GraphQLString}
      },
      resolve(parentValue, args){
        for(let i = 0; i < customers.length; i++) {
          if(customers[i].id == args.id) {
            return customers[i];
          }
        }
      }
    },
    customers:{
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return customers;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
