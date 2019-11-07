const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = graphql;
const _ = require('lodash');
const colors = require('./colors');

const ColorType = new GraphQLObjectType({
    name: 'Color',
    fields: () => ({
        id: { type: GraphQLInt },
        hexCode: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        colors: {
            type: new GraphQLList(ColorType),
            args: { offset: { type: GraphQLInt }},
            resolve(parent, args) {
                return _.filter(colors, (color) => { return color.id >= args.offset && color.id <= (args.offset + 25)});
            }
        },
        color_by_id: {
            type: ColorType,
            args: { id: { type: GraphQLInt }},
            resolve(parent, args) {
                return _.find(colors, { id: args.id });
            }
        },
        color_by_hexCode: {
            type: ColorType,
            args: { hexCode: { type: GraphQLString }},
            resolve(parent, args) {
                return _.find(colors, { hexCode: args.hexCode });
            }
        },
        colors_by_class: {
            type: new GraphQLList(ColorType),
            args: { color_class: { type: GraphQLString }},
            resolve(parent, args) {
                return _.filter(colors, (color) => { return color.class === args.color_class });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
