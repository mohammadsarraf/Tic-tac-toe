import React, { useState } from 'react';
import './Dice.css';

export const Dice = ({roll, clicked}) => {
  // const [diceValue, setDiceValue] = useState(Math.floor(Math.random() * 6 + 1));

  // const rollDice = () => {
  //   setTimeout(() => {
  //     setDiceValue(roll);
  //   }, 250);
  // };
  
  return (
    <div className="dice-container">
      <div className="dice">
        <h1>{roll}</h1>
      </div>
    </div>
  );
};


