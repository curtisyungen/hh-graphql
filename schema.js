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
        },
        search_suggestions: {
            type: new GraphQLList(ColorType),
            args: { searchString: { type: GraphQLString }},
            resolve(parent, args) {
                return _.filter(colors, (color) => { return color.hexCode.indexOf(args.searchString) !== -1 });
            }
        },
        next_colors: {
            type: new GraphQLList(ColorType),
            args: { id: { type: GraphQLInt }},
            resolve(parent, args) {
                return _.filter(colors, (color) => { 
                    if (args.id < 3) {
                        return color.id <= 5 && color.id !== args.id;
                    }
                    return color.id >= args.id - 2 && color.id !== args.id && color.id <= (args.id + 3)});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
