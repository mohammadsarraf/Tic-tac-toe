import React from 'react';

import "./ResetButton.css";

export const ResetButton = ({ name, resetBoard }) => {
    return (
        <button className="reset-btn" onClick={resetBoard}>{name}</button>
    )
}