import React from 'react';
import { Link } from 'react-router-dom';
import './Color.css';

export default function Color({ color: {id, hexCode }}) {
    return (
        <Link to={{pathname: `/detail`, state: {id: id, hexCode: hexCode}}}>
            <div className="color" style={{ background: hexCode }}></div>
            <div className="colorName">{ hexCode }</div>
        </Link>
    )
}