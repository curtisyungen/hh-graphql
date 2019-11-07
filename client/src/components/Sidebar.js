import React, { Component } from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const colorMenu = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Gray'];

const GET_RANDOM = gql`
    query getRandomColor($id: Int!) {
        color_by_id {
            id
            hexCode
        }
    }
`;

class Sidebar extends Component {

    getRandom = (event) => {
        event.preventDefault();
        let random = Math.floor(Math.random() * 100);
        
        return (
            <Query query={GET_RANDOM} variables={{ id: random }}>
                {
                    ({loading, error, data}) => {
                        if (loading) return <h4>Loading...</h4>;
                        if (error) console.log(error);

                        console.log(data);

                        return (
                            <div>test</div>
                        )
                    }
                }
            </Query>
        )
    }

    render() {
        return (
            <div className="sidebar">
                <Link 
                    to='/'
                    className="btn btn-light allBtn"
                    onClick={this.props.getColorByClass.bind(null, null)}
                >
                    All Colors
                </Link>
                <button 
                    className="btn btn-light randomBtn"
                    onClick={this.getRandom}
                >
                    Random Color
                </button>
                <div className="colorMenu">
                    {colorMenu.map(color => (
                        <Link 
                            key={color}
                            to='/'
                            className="menuItem"
                            onClick={this.props.getColorByClass.bind(null, color)}
                        >
                            {color}
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}

export default Sidebar;
