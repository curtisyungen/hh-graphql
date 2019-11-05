const graphql = require('graphql');
const _ = require('lodash');
// const colors = require('./colors');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

var colors = [
    {id: 1, hexCode: '#000000', baseColor: 'black'}
];

const ColorType = new GraphQLObjectType({
    name: 'Color',
    fields: () => ({
        id: { type: GraphQLID },
        hexCode: { type: GraphQLString },
        baseColor: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        color: {
            type: ColorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return _.find(colors, { id: args.id });
            }
        },
        colors: {
            type: new GraphQLList(ColorType),
            resolve(parent, args) {
                return colors;
            }
        },
    }
});

module.exports = new GraphQLSchema ({
    query: RootQuery,
});

