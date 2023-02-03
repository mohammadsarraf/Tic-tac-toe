import React from 'react'

import { Box } from "./Box"
import "./Board.css"

export const Board = ({ name, board, onClick, match}) => {

  // const {playerOneName, playerTwoName} = match;

  return (
    <div>
      
    <div className="board">
      
      {
        board.map((value, idx) => {
          
          return <Box  name={name} value={value} onClick={() => value === null && onClick(idx)} />;
        })
      }
    </div>
    </div>
  )
}