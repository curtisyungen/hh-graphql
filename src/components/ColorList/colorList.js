import React, { Component } from 'react';
// import Color from './Color/color';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAllColors = gql`
    {
        colors {
            id
            hexCode
        }
    }
`

class ColorList extends Component {
    render() {
        console.log(this.props);
        return (
            <div >
                Color Name
            </div>
        );
    }
}

export default graphql(getAllColors)(ColorList);