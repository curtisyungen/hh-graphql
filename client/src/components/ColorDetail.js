import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Color from './Color';
import './ColorDetail.css';

export class ColorDetail extends Component {
    
    render() {
        return (
            <Fragment>
                <div className="detailView">
                    <div className="color mainColor" style={{background: this.props.location.state.hexCode }}></div>
                    <div className="secondaryColors"></div>
                    <Link to='/' className="btn clearBtn">Clear</Link>
                </div>
            </Fragment>
        )
    }
}

export default ColorDetail;