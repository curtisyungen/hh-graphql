import React, { Component } from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const colorMenu = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Gray'];

const COLOR_CLASS_QUERY = gql`
    query getColorsByClass($class: String!) {
        colors_by_class(class: $class) {
            id
        }
    }   
`;

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
