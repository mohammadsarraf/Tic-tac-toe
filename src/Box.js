import React from 'react';

import "./Box.css";

export const Box = ({ name, value, onClick, style, fontColor ,mouseHoverTile}) => {
    // const style = name === "X" ? "box o" : "box x";
    
    return (
        <button className={style} onClick={onClick} 
        onMouseEnter={(e)=>mouseHoverTile(e,true)} onMouseLeave={(e)=>mouseHoverTile(e,false)}>{value}</button>
    )
}