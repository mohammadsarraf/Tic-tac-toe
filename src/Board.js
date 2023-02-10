import React from 'react';
import * as cotl from './Class.js';
import { Box } from './Box';
import './Board.css';

export const Board = ({ name, board, onClick, mouseHoverTile}) => {
  
  let col0 = cotl.match([board[0], board[3], board[6]]);
  let col1 = cotl.match([board[1], board[4], board[7]]);
  let col2 = cotl.match([board[2], board[5], board[8]]);


  return (
    <div className="board">
      {board.map((value, idx) => {
        
        let className = "box";
        let fontColor = ""
        if ([0, 3, 6].includes(idx) && (col0.length === 3 || (col0.length === 2 && col0.includes(idx/3)))) {
          className += col0.length === 2 ? " highlighted-box2" : " highlighted-box3";
        }
        if ([1, 4, 7].includes(idx) && (col1.length === 3 || (col1.length === 2 && col1.includes((idx-1)/3)))) {
          className += col1.length === 2 ? " highlighted-box2" : " highlighted-box3";
        }
        if ([2, 5, 8].includes(idx) && (col2.length === 3 || (col2.length === 2 && col2.includes((idx-2)/3)))) {
          className += col2.length === 2 ? " highlighted-box2" : " highlighted-box3";
        }
        if (name === "X") {
          className += " x";
        } else if (name === "O") {
          className += " o";
        }
        return  <Box className={className} style={className} name={name} value={value} mouseHoverTile={mouseHoverTile} onClick={() => value === null && onClick(idx)} />;
      })}
    </div>
  );
};
