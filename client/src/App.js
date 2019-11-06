import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ColorList from './components/ColorList';
import ColorDetail from './components/ColorDetail';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>

          <Navbar />
          <Sidebar />

          <div className="app">
            <Route exact path="/" component={ColorList} />
            <Route path="/color/:hexCode" component={ColorDetail} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
