import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const colorMenu = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Gray'];

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <Link 
                    className="btn btn-light allBtn"
                    to={'/'}
                >
                    All Colors
                </Link>
                <button 
                    className="btn btn-light randomBtn"
                    // onClick={this.props.getRandomColor}
                >
                    Random Color
                </button>

                <div className="colorMenu">
                    {colorMenu.map(color => (
                        <div 
                            key={color}
                            className="menuItem"
                            // onClick={this.props.getColor.bind(null, color)}
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