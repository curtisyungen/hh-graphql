import React, { Component } from "react";
import Color from "../Color/color";
import "./suggestions.css";

class Suggestions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suggestions: null,
        }
    }

    componentDidMount = () => {
        this.getSuggestions();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.getSuggestions();
        }
    }

    // Gets five color suggestions for display in Detail View
    // Uses colors from the left and right of subject color,
    // not including subject color
    getSuggestions = () => {
        let hexCodes = this.props.hexCodes;
        let color = this.props.color;

        if (!hexCodes) {
            return;
        }

        let startIdx = Math.max(hexCodes.indexOf(color) - 3, 0);
        let endIdx = Math.min(hexCodes.length, startIdx + 6);

        let suggestions = [];
        for (var c=startIdx; c<endIdx; c++) {
            if (hexCodes[c] !== color) {
                suggestions.push(hexCodes[c]);
            }
        }

        this.setState({
            suggestions: suggestions,
        });
    }

    render() {
        return (
            <div className="suggestions">
                {this.state.suggestions && this.state.suggestions.length > 0 ? (
                    this.state.suggestions.map(color => (
                        <Color
                            color={color}
                            getColor={this.props.getColor}
                            size={"small"}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default Suggestions;
