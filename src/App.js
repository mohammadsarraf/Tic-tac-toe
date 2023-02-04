import React, { useState, useEffect } from "react";
import { Board } from "./Board";
import { ResetButton } from "./ResetButton";
import { ScoreBoard } from "./ScoreBoard";
import {Dice} from "./Dice";
import './App.css';
import './Dice.css';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getDatabase, ref, onValue} from "firebase/database";

import { doc, setDoc, onSnapshot } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";


const App = () =>{
  const [playerOne, setPlayerOneBoard] = useState(Array(9).fill(null))
  const [playerTwo, setPlayerTwoBoard] = useState(Array(9).fill(null))
  const [playerXPlaying, setPlayerxPlayer] = useState(true)
  const [die, setDie] = useState(Math.floor(Math.random() * 6 + 1))


  const firebaseConfig = {
    apiKey: "AIzaSyCOsWTZn_IZMdSrOsZCtmn2AkFQAVqZHac",
    authDomain: "colttest-ab666.firebaseapp.com",
    projectId: "colttest-ab666",
    storageBucket: "colttest-ab666.appspot.com",
    messagingSenderId: "865140778710",
    appId: "1:865140778710:web:4e73aa58376514066a8b77",
    measurementId: "G-JRBB84RCE6"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);


  useEffect ( () => {
  const WriteData = async () =>{
    await setDoc(doc(db, "Sessions", "234567890"), {
      playerone: playerOne,
      playertwo: playerTwo,
      die: die,
      finished: handleGameOver(), 
      PlayeroneName:   "null", 
      //TODO: 
      //PlayertwoName: "null", // TODO: Get player name 

    }, {merge:true});
    console.log("Writing  data...");

  }
  WriteData(); 

},[playerOne])
  
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Sessions", "234567890"), (doc) => {
        console.log("Current Data: ", doc.data());
        console.log("PlayerTwo: ", doc.data().playertwo);
        console.log("Die: ", doc.data().die);
        console.log("GameOver: ", doc.data().finished);
        setPlayerOneBoard(doc.data().playerone)
        setPlayerTwoBoard(doc.data().playertwo)
        setDie(doc.data().die)
      }
  )
  }, [])

  const handleGameOver = () => {
    if (!playerOne.includes(null) || !playerTwo.includes(null)) {
      return true
    }
    return false
  }



  const handleBoxClickPlayerOne = (indx) => {

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
  //  {WriteData()}

    return(

      <div>
        {handleGameOver() ? (
        <div className="GameOver">
          
          <ScoreBoard names={{playerOneName: "POne", playerTwoName: "PTwo"}} scores={updateScore()} playerXPlaying={playerXPlaying} />
          <Board name={"X"} board={playerOne} onClick={null}/>
          <h1 style={{fontSize: "30px", color: "red", background: "lightblue", textAlign: "center"}}>gameover</h1>
          <Board name={"O"} board={playerTwo} onClick={null}/>
          <ResetButton resetBoard={resetBoard} />
        </div>):
        (<div className="Game">
          <ScoreBoard names={{playerOneName: "POne", playerTwoName: "PTwo"}} scores={updateScore()} playerXPlaying={playerXPlaying} />
          <Board name={"X"} board={playerOne} onClick={handleBoxClickPlayerOne}/>
          <Dice roll={die} clicked={false}/>
          <Board name={"O"} board={playerTwo} onClick={handleBoxClickPlayerTwo}/>
          <ResetButton resetBoard={resetBoard} />
          
        </div>)}
      </div>
    )
  }

export default App;
