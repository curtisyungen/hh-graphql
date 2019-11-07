import React, { Component } from "react";
import SearchSuggestions from "./SearchSuggestions";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import "./Navbar.css";

const MAX_SEARCH_RESULTS = 28;

const GET_SUGGESTIONS = gql`
    query getSearchSuggestions($searchString: String!) {
        searchSuggestions(searchString: $searchString) {
            id
            hexCode
        }
    }
`;

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: null,
            showSuggestions: false,
            searchTerm: null,
            matches: null,
        }   
    }

    // Sets user search input as "searchTerm" in state
    handleInputChange = (event) => {
        const {name, value} = event.target;
        event.preventDefault();

        this.setState({
            [name]: value,
        }, () => {
            if (value !== null && value !== "") {
                this.showSuggestions();
            }
            else {
                this.hideSuggestions();
            }
        });
    }

    // Conducts search when Enter key is pressed
    handleKeyPress = (event) => {
        let searchTerm = this.state.searchTerm;
        let matches = this.state.matches;
        if (event.key === "Enter" && searchTerm !== null && searchTerm !== "" && matches && matches.length > 0) {
            event.preventDefault();
            this.props.searchForColor(matches);
            this.props.getPages(matches);
        }
    }

    // Displays Search Suggestions
    showSuggestions = () => {
        this.setState({
            showSuggestions: true,
        }, () => {
            this.getSuggestions();
        });
    }

    // Hides Search Suggestions
    hideSuggestions = () => {
        this.setState({
            showSuggestions: false,
        });
    }

    // Gets list of hex codes that include search term
    getSuggestions = () => {
        let searchTerm = this.state.searchTerm;
        let hexCodes = this.props.hexCodes;

        let matches = [];
        let count = 0;
        if (searchTerm !== null && searchTerm !== "") {
            while (matches.length < MAX_SEARCH_RESULTS && count < hexCodes.length) {
                if (hexCodes[count].indexOf(searchTerm) > -1) {
                    matches.push(hexCodes[count]);
                }

                count += 1;
            }
        }

        this.setState({
            matches: matches,
        });
    }

    // Selects a match from Search Suggestions and hides suggestions
    selectMatch = (match) => {
        this.hideSuggestions();

        this.setState({
            searchTerm: match,
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
                        value={this.state.searchTerm}
                    />
                </form>

                {/* {this.state.showSuggestions && this.state.matches && this.state.matches.length > 0 ? (
                    <SearchSuggestions 
                        hideSuggestions={this.hideSuggestions}
                        matches={this.state.matches}
                        selectMatch={this.selectMatch}
                        getColor={this.props.getColor}
                    />
                ) : (
                    <></>
                )} */}
            </nav>
        )
    }
}

export default Navbar;