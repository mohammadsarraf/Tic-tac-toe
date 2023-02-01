import React, { useState } from "react";
import { Board } from "./Board";
import { ResetButton } from "./ResetButton";
import { ScoreBoard } from "./ScoreBoard";
import {Dice} from "./Dice";
import './App.css';
import './Dice.css';

const App = () =>{

  
  const [playerOne, setPlayerOneBoard] = useState(Array(9).fill(null))
  const [playerTwo, setPlayerTwoBoard] = useState(Array(9).fill(null))
  const [playerXPlaying, setPlayerxPlayer] = useState(true)
  const [die, setDie] = useState(Math.floor(Math.random() * 6 + 1))
  
  
  const handleBoxClickPlayerOne = (indx) => {
    if (!playerOne.includes(null)) {
      return;
    }
    if (!playerTwo.includes(null)) {
      return;
    }
    const updateBoard = playerOne.map((value, index) => {
      if (index === indx & playerXPlaying === true) {
        update2(die, index);
        setPlayerxPlayer(!playerXPlaying)
        setDie(Math.floor(Math.random() * 6 + 1))
        
        
        return die;
      } else {
        return value;
      }
    })
    setPlayerOneBoard(sort(updateBoard));
    setPlayerTwoBoard(sort(playerTwo))
    
    
  }

  const handleBoxClickPlayerTwo = (indx) => {
    if (!playerOne.includes(null)) {
      return;
    }
    if (!playerTwo.includes(null)) {
      return;
    }
    const updateBoard = playerTwo.map((value, index) => {
      if (index === indx & playerXPlaying === false) {
        update1(die, index)
        setPlayerxPlayer(!playerXPlaying)
        setDie(Math.floor(Math.random() * 6 + 1))
        
        

        return die;
      } else {
        return value;
      }
    })
    setPlayerOneBoard(sort(playerOne))
    setPlayerTwoBoard(sort(updateBoard));
        
    

  }

  const resetBoard = () => {
    
    setPlayerOneBoard(Array(9).fill(null));
    setPlayerTwoBoard(Array(9).fill(null));
    setDie(Math.floor(Math.random() * 6 + 1))
  }

  const points = (board, index) => {
    
    const column = [board[index],board[index+3], board[index + 6]]
    
    if (column[0] === column[1] && column[0] === column[2]) {
      return column[0] * 9;
    }
    if (column[0] === column[2]) {
      return column[0] * 4 + column[1];
    }
    if (column[1] === column[2]) {
      return column[1] * 4 + column[0];
    }
    if (column[0] === column[1]) {
      return column[0] * 4 + column[2];
    } else {
      return column[0] + column[1] + column[2];
    }
  };
  
  const updateScore = () => {
    const calcScore = (player) => {
      return points(player, 0) + points(player, 1) + points(player, 2)
    }
    return({playerOne: calcScore(playerOne), playerTwo: calcScore(playerTwo)})
  }

  const sort = (board) => {
    function moveZerosToEnd(arr) {
      let nonNull = [];
      let Null = [];
      
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === null) {
          Null.push(arr[i]);
        } else {
          nonNull.push(arr[i]);
        }
      }
      
      return nonNull.concat(Null);
    }
  
    const col0 = moveZerosToEnd([board[0],board[0+3],board[0+6]]);
    const col1 = moveZerosToEnd([board[1],board[1+3],board[1+6]]);
    const col2 = moveZerosToEnd([board[2],board[2+3],board[2+6]]);

    let combinedList1 = []
    for (let i = 0; i < 3; i++){
      combinedList1.push(col0[i], col1[i], col2[i]);
    }
    
    return combinedList1
  };
  
  const update1 = (roll, index) => {
    let i = index % 3;
    
    

    if (playerOne[i] === roll) {
      playerOne[i] = null;
    }
    if (playerOne[i + 3] === roll) {
      playerOne[i + 3] = null;
    }
    if (playerOne[i + 6] === roll) {
      playerOne[i + 6] = null;
    }
    sort(playerOne)
  }

  const update2 = (roll, index) => {
    let i = index % 3;
    
    

    if (playerTwo[i] === roll) {
      playerTwo[i] = null;
    }
    if (playerTwo[i + 3] === roll) {
      playerTwo[i + 3] = null;
    }
    if (playerTwo[i + 6] === roll) {
      playerTwo[i + 6] = null;
    }
    sort(playerTwo)
  }

    return(
      <div>
        
        <ScoreBoard names={{playerOneName: "POne", playerTwoName: "PTwo"}} scores={updateScore()} playerXPlaying={playerXPlaying} />
        <Board name={"X"} board={playerOne} onClick={handleBoxClickPlayerOne}/>
        <Dice roll={die} clicked={false}/>
        <Board name={"O"} board={playerTwo} onClick={handleBoxClickPlayerTwo}/>
        <ResetButton resetBoard={resetBoard} />
      </div>
    )
  }

export default App;
