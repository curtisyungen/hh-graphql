import React, { Component } from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link, Redirect } from 'react-router-dom';
import "./Sidebar.css";

const colorMenu = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Gray'];

const GET_RANDOM = gql`
    query getRandomColor($id: Int!) {
        color_by_id (id: $id) {
            id
            hexCode
        }
    }
`;

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            getRandom: false,
        }
    }

    getRandom = () => {
        this.setState({
            getRandom: true,
        });
    }

    setRandom = () => {
        return (
            <Query query={GET_RANDOM} variables={{ id: Math.floor(Math.random() * 50) }}>
                {
                    ({loading, error, data}) => {
                        if (loading) return <h4>Loading...</h4>;
                        if (error) console.log(error);

                        return (
                            <Redirect 
                                to={{
                                    pathname: '/detail',
                                    state: { 
                                        id: data.color_by_id.id,
                                        hexCode: data.color_by_id.hexCode,
                                    }
                                }}
                            />
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
                    onClick={() => {
                        this.setState({
                            getRandom: false,
                        });
                        this.props.getColorByClass.bind(null, null)
                    }}
                >
                    All Colors
                </Link>
                <button 
                    className="btn btn-light randomBtn"
                    onClick={this.getRandom}
                >
                    Random Color
                </button>

                {this.state.getRandom && this.setRandom()}
                
                <div className="colorMenu">
                    {colorMenu.map(color => (
                        <Link 
                            key={color}
                            to='/'
                            className="menuItem"
                            onClick={() => {
                                this.setState({
                                    getRandom: false,
                                });
                                this.props.getColorByClass.bind(null, color)
                            }}
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
