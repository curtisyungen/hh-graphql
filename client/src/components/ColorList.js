import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Color from './Color';
import './ColorList.css';

const COLORS_QUERY = gql`
    {
        colors {
            id
            hexCode
        }
    }
`;

export class ColorList extends Component {
    render() {
        return (
            <Fragment>
                <Query query={COLORS_QUERY}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return <h4>Loading...</h4>;
                            if (error) console.log(error);

                            return (
                                <div className="colorList">
                                    {
                                        data.colors.map(color => (
                                            <Color key={color.id} color={color} >{ color.hexCode }</Color>
                                        ))
                                    }
                                </div>
                            )
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default ColorList;