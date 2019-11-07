import React, { Component } from "react";
import "./Sidebar.css";

const colorMenu = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Gray'];

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <button 
                    className="btn btn-light allBtn"
                    onClick={this.props.getColorByClass.bind(null, null)}
                >
                    All Colors
                </button>
                <button 
                    className="btn btn-light randomBtn"
                    onClick={this.props.getRandomColor}
                >
                    Random Color
                </button>

                <div className="colorMenu">
                    {colorMenu.map(color => (
                        <div 
                            key={color}
                            className="menuItem"
                            onClick={this.props.getColorByClass.bind(null, color)}
                        >
                            {color}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Sidebar;
