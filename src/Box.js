import React from 'react';

import "./Box.css";

export const Box = ({ name, value, onClick }) => {
    const style = name === "X" ? "box o" : "box x";

    return (
        <button className={style} onClick={onClick}>{value}</button>
    )
}