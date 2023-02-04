import React from 'react';

import "./ResetButton.css";

export const ResetButton = ({ name, resetBoard, joinButton }) => {
    return (
        <div className='buttons'>
            <button className="reset-btn" onClick={resetBoard}>Reset</button>
            <button className="reset-btn" onClick={joinButton}>{name}</button>
        </div>
    )
}