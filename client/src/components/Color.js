import React from 'react';
import { Link } from 'react-router-dom';
import './Color.css';

export default function Color({ color: {id, hexCode }, size }) {
    return (
        <Link to={{pathname: `/detail`, state: {id: id, hexCode: hexCode}}}>
            <div className={`color ${size}`} style={{ background: hexCode }}>
                <div className="colorName">{ hexCode }</div>
            </div>
        </Link>
    )
}