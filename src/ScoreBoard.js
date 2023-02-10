import React from 'react'

import "./ScoreBoard.css"

export const ScoreBoard = ({ names, scores, playerXPlaying, ID }) => {
  const { playerOne, playerTwo } = scores;
  const {playerOneName, playerTwoName} = names;
  
  return (
    <div className="scoreboard">
      <div className="score-header">Game Room: {parseInt(ID)}</div>
      <section className='player-point-section'>
        <span className={`score x-score ${!playerXPlaying && "inactive"}`}>{playerOneName} - {playerOne}</span>
        <span className={`score o-score ${playerXPlaying && "inactive"}`}>{playerTwoName} - {playerTwo}</span>
      </section>
    </div>
  )
}