import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import "./SearchSuggestions.css";

class SearchSuggestions extends Component {

    handleClickOutside = (event) => {
        event.preventDefault();
        this.props.hideSuggestions();
    }

    // Selects match from Search Suggestions and hides suggestions
    selectMatch = (match) => {
        this.props.selectMatch(match);
        this.props.getColor(match);
    }

    render() {
        return (
            <div className="searchSuggestions">
                {this.props.matches && this.props.matches.length > 0 ? (
                    this.props.matches.map(match => (
                        <div 
                            key={match}
                            className="suggestion"
                            onClick={this.selectMatch.bind(null, match)}
                        >
                            {match}
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default onClickOutside(SearchSuggestions);