import React, { Component } from "react";
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import onClickOutside from 'react-onclickoutside';
import "./Navbar.css";

const GET_SUGGESTIONS = gql`
    query getSearchSuggestions($searchString: String!) {
        search_suggestions(searchString: $searchString) {
            id
            hexCode
        }
    }
`;

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: null,
            showSuggestions: false,
        }   
    }

    // Sets user search input as "searchTerm" in state
    handleInputChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        
        this.setState({
            [name]: value,
            showSuggestions: true,
        });
    }

    // Conducts search when Enter key is pressed
    handleKeyPress = (event) => {
        let searchTerm = this.state.searchTerm;
        if (event.key === "Enter" && searchTerm !== null && searchTerm !== "") {
            event.preventDefault();
        }
    }

    handleClickOutside = () => {
        this.setState({
            showSuggestions: false,
        });
    }

    showSuggestions = () => {
        this.setState({
            showSuggestions: true,
        });
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark justify-content-between">
                <img className="logo" src={require('../images/logo.png')} alt="logo" />
                <form className="form-inline searchBox">
                    <input 
                        autoComplete="off"
                        className="form-control" 
                        name="searchTerm"
                        type="search" 
                        placeholder="Search for hex code" 
                        aria-label="Search"
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleInputChange}
                        onFocus={this.showSuggestions}
                        value={this.state.searchTerm || ""}
                    />
                </form>

                {this.state.searchTerm && <Query query={GET_SUGGESTIONS} variables={{ searchString: this.state.searchTerm }}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return <h4>Loading...</h4>;
                            if (error) console.log(error);

                            return (
                                this.state.showSuggestions && <div className="suggestions">
                                    {data.search_suggestions.map(sugg => (
                                        <Link key={sugg.id} className="suggestion" to={{pathname: '/detail', state: { id: sugg.id, hexCode: sugg.hexCode }}}>
                                            {sugg.hexCode}
                                        </Link>
                                    ))}
                                </div>
                            );
                        }
                    }
                </Query>}
            </nav>
        )
    }
}

export default onClickOutside(Navbar);
