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
  uri: '/graphql',
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color_class: null,
    }
  }

  getColorByClass = (color_class) => {
    this.setState({
      color_class: color_class,
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>

          <Navbar />
          <Sidebar 
            getColorByClass={this.getColorByClass}
          />

          <div className="app">
            <Route exact path="/" component={() => <ColorList color_class={this.state.color_class}/>}/>
            <Route path="/color/:hexCode" component={ColorDetail} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
