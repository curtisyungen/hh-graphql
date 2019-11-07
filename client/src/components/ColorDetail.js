import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Color from './Color';
import './ColorDetail.css';

export class ColorDetail extends Component {
    render() {
        return (
            <Fragment>
                <div className="colorDetail">
                    test
                </div>
                <Link to='/' className="btn clearBtn">Clear</Link>
            </Fragment>
        )
    }
}

export default ColorDetail;