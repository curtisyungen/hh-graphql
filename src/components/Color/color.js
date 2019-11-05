import React, { Component } from "react";
import "./color.css";

class Color extends Component {
    render() {
        return (
            this.props.color ? (
                <div className={`color color-${this.props.size}`}>
                    <div 
                        className={`colorBackground ${this.props.size}`} 
                        style={{background: this.props.color}}
                        onClick={this.props.getColor.bind(null, this.props.color)}
                    >

                    </div>
                    <div className="colorName">{this.props.color}</div>
                </div>
            ) : (
                <></>
            )
        )
    }
}

export default Color;
