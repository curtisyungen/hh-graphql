import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import Color from './Color';
import './ColorDetail.css';

const NEXT_COLORS_QUERY = gql`
    query getNextColors($id: Int!) {
        next_colors(id: $id) {
            id
            hexCode
        }
    }
`;

export class ColorDetail extends Component {
    render() {
        return (
            <Fragment>
                <div className="detailView">
                    <Color 
                        className="color mainColor" 
                        style={{background: this.props.location.state.hexCode }} 
                        color={this.props.location.state}
                        size="large"
                    />
                    <Query query={NEXT_COLORS_QUERY} variables={{ id: this.props.location.state.id }}>
                        {
                            ({loading, error, data, fetchMore}) => {
                                if (loading) return <h4>Loading...</h4>;
                                if (error) console.log(error);

                                return (
                                    <div className="nextColors">
                                        {data.next_colors.map(color => (
                                            <Color key={color.id} color={color} size="small" />
                                        ))}
                                    </div>
                                )
                            }
                        }
                    </Query>
                    <Link to='/' className="btn clearBtn">Clear</Link>
                </div>
            </Fragment>
        )
    }
}

export default ColorDetail;