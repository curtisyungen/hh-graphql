import React from 'react';
import { Link } from 'react-router-dom';
import './Color.css';

export default function Color({ color: {id, hexCode }}) {
    let hexCodeClean = hexCode.replace('#', '');

    return (
        <Link to={`/color/${hexCodeClean}`}>
            <div className="color" style={{ background: hexCode }}></div>
            <div className="colorName">{ hexCode }</div>
        </Link>
    )
}