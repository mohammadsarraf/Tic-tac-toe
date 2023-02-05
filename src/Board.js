import React from 'react'

import { Box } from "./Box"
import "./Board.css"

export const Board = ({ name, board, onClick}) => {

  const match = (board) => {
    
    const whichMatch = (index) => {
      let matchingIndexes = [];
      const column = [board[index],board[index+3], board[index + 6]]

      for (let i = 0; i < column.length; i++) {
        for (let j = i + 1; j < column.length; j++) {
          if (column[i] === column[j]) {
            matchingIndexes.push(i , j);
            return matchingIndexes;
          }
        }
      }
    }
    console.log("Match: " + whichMatch(0))
    return whichMatch(0) + whichMatch(1) + whichMatch(2)
  };
  // console.log(match([1,2,3,4,5,6,7,8,9]))
  match(board);
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