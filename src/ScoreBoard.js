import React from 'react'

import "./ScoreBoard.css"

export const ScoreBoard = ({ names, scores, playerXPlaying }) => {
  const { playerOne, playerTwo } = scores;
  const {playerOneName, playerTwoName} = names;

  return (
    <div className="scoreboard">
      <span className={`score x-score ${!playerXPlaying && "inactive"}`}>{playerOneName} - {playerOne}</span>
      <span className={`score o-score ${playerXPlaying && "inactive"}`}>{playerTwoName} - {playerTwo}</span>
    </div>
  )
}