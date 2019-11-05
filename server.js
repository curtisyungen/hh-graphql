const express = require("express");
const graphqlHTTP = require('express-graphql');
const schema = require('./src/graphql/schema');
const cors = require('cors');

const PORT = 5000;

const app = express();

var corsOptions = {
  origin: 'http://hh-graphql.herokuapp.com/',
  credentials: true
};

app.use(cors(corsOptions));
app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});

module.exports.app = app;
