import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Color from './Color';
import './ColorList.css';

const ALL_COLORS_QUERY = gql`
    query getAllColors($offset: Int!) {
        colors(offset: $offset) {
            id
            hexCode
        }
    }
`;

const CLASS_QUERY = gql`
    query getColorsByClass($color_class: String!) {
        colors_by_class(color_class: $color_class) {
            id
            hexCode
        }
    }
`;

export class ColorList extends Component {
    constructor(props) {
        super(props);

        this.state =  {
            color_class: null,
            hasMoreItems: true,
            offset: 0,
        }
    }

    componentDidMount = () => {
        this.setState({
            color_class: this.props.color_class,
        });
    }

    render() {
        return (
            <Fragment>
                {this.props.color_class ? (
                    <Query query={CLASS_QUERY} variables={{color_class: this.props.color_class.toLowerCase()}}>
                        {
                            ({loading, error, data }) => {
                                if (loading) return <h4>Loading...</h4>;
                                if (error) console.log(error);

                                return (
                                    <Fragment>
                                        <div className="colorList">
                                            {
                                                data.colors_by_class.map(color => (
                                                    <Color key={color.id} color={color} size="small">{ color.hexCode }</Color>
                                                ))
                                            }
                                        </div>
                                    </Fragment>
                                )
                            }
                        }
                    </Query>
                ) : (
                    <Query query={ALL_COLORS_QUERY} variables={{offset: this.state.offset}}>
                        {
                            ({loading, error, data, fetchMore}) => {
                                if (loading) return <h4>Loading...</h4>;
                                if (error) console.log(error);

                                return (
                                    <Fragment>
                                        <div className="colorList">
                                            {
                                                data.colors.map(color => (
                                                    <Color key={color.id} color={color} size="small">{ color.hexCode }</Color>
                                                ))
                                            }
                                        </div>
                                        <div className="prevNextBtns">
                                            {this.state.offset > 0 && <button className="pageBtn" onClick={() => {
                                                this.setState({
                                                    offset: this.state.offset - 25,
                                                    hasMoreItems: true,
                                                }, () => {
                                                    fetchMore({
                                                        variables: {
                                                            offset: this.state.offset,
                                                        },
                                                        updateQuery: (prevResult, { fetchMoreResult }) => {
                                                            if (!fetchMoreResult) {
                                                                return prevResult;
                                                            }
                                                            return {
                                                                colors: [...fetchMoreResult.colors]
                                                            }
                                                        }
                                                    });
                                                });
                                            }}>Prev</button>}
                                            {this.state.hasMoreItems && <button className="pageBtn" onClick={() => {
                                                this.setState({
                                                    offset: this.state.offset + 25,
                                                }, () => {
                                                    fetchMore({
                                                        variables: {
                                                            offset: this.state.offset,
                                                        },
                                                        updateQuery: (prevResult, { fetchMoreResult }) => {
                                                            if (!fetchMoreResult) {
                                                                return prevResult;
                                                            }
                                                            if (fetchMoreResult.colors.length < 25) {
                                                                this.setState({
                                                                    hasMoreItems: false,
                                                                });
                                                            }
                                                            return {
                                                                colors: [...fetchMoreResult.colors]
                                                            }
                                                        }
                                                    });
                                                });
                                            }}>Next</button> }
                                        </div>
                                    </Fragment>
                                )
                            }
                        }
                    </Query>
                )}
            </Fragment>
        )
    }
}

export default ColorList;
