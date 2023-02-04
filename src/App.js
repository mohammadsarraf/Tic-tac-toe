import React, { useState, useEffect } from "react";
import { Board } from "./Board";
import { ResetButton } from "./ResetButton";
import { ScoreBoard } from "./ScoreBoard";
import {Dice} from "./Dice";
import './App.css';
import './Dice.css';
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";
// import { getDatabase, ref, onValue} from "firebase/database";

import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";


const App = () =>{
  const [playerOne, setPlayerOneBoard] = useState(Array(9).fill(null))
  const [playerTwo, setPlayerTwoBoard] = useState(Array(9).fill(null))
  const [playerXPlaying, setPlayerxPlayer] = useState(true)
  const [check, setCheck] = useState(false)
  const [die, setDie] = useState(Math.floor(Math.random() * 6 + 1))
  const IntialzeBoard = false; 

  const firebaseConfig = {
    apiKey: "AIzaSyChA2eWNpmPbVHalWGawI2yaBdiCnhJJ2Y",
    authDomain: "coltv2.firebaseapp.com",
    projectId: "coltv2",
    storageBucket: "coltv2.appspot.com",
    messagingSenderId: "868620196777",
    appId: "1:868620196777:web:02bdbd4f188daae93842b8",
    measurementId: "G-4Q2N47XNVS"
  };
  
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const sessionIDGenerator = () => {
    const radnNum = (Math.floor(Math.random() * (10)))
    return radnNum.toString().padStart(6, '0');
    // return "000000"
  }
  const [sessionID, setSessionID]= useState(sessionIDGenerator());

  const AlertSession = () => {
    let sess = prompt("Please enter the session");
    setSessionID(sess); 
  }

  useEffect( () => {
  const joinSession = async () => {
    const docRef = doc(db, "Sessions", sessionID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setPlayerOneBoard(docSnap.data().playerone)
      setPlayerTwoBoard(docSnap.data().playertwo)
      setDie(docSnap.data().die)
      setPlayerxPlayer(docSnap.data().playerXPlaying)
      // alert(playerXPlaying);
    } else {
      // doc.data() will be undefined in this case
      await setDoc(doc(db, "Sessions", sessionID), {
        playerone: playerOne,
        playertwo: playerTwo,
        die: die,
        finished: handleGameOver(), 
        PlayeroneName:  "ReadyPlayerOne", 
        playerXPlaying: true
        //TODO: 
        //PlayertwoName: "null", // TODO: Get player name 
  
      }, [sessionID]);
      // console.log("Writing  data...");
    }  
  }
  joinSession();
},[sessionID] ); 


  useEffect ( () => {
  const IntialzeBoard = async () =>{
    const docRef = doc(db, "Sessions", sessionID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setPlayerOneBoard(doc.data().playerone)
      setPlayerTwoBoard(doc.data().playertwo)
      setDie(doc.data().die)
      setPlayerxPlayer(doc.data().playerXPlaying)
      alert(playerXPlaying);
      // setCheck(true);
    } else {
      // doc.data() will be undefined in this case
      await setDoc(doc(db, "Sessions", sessionID), {
        playerone: playerOne,
        playertwo: playerTwo,
        die: die,
        finished: handleGameOver(), 
        PlayeroneName:  "ReadyPlayerOne", 
        playerXPlaying: true
        //TODO: 
        //PlayertwoName: "null", // TODO: Get player name 
  
      });
      // console.log("Writing  data...");
    } 
  

  }


    IntialzeBoard(); 
  

},[])
  
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Sessions", sessionID), (doc) => {
        // console.log("Current Data: ", doc.data());
        // console.log("PlayerTwo: ", doc.data().playertwo);
        // console.log("Die: ", doc.data().die);
        // console.log("GameOver: ", doc.data().finished);
        setPlayerOneBoard(sort(doc.data().playerone))
        setPlayerTwoBoard(sort(doc.data().playertwo))
        setDie(doc.data().die)
        setPlayerxPlayer(doc.data().playerXPlaying)
      }
  )
  }, [sessionID])

  const handleGameOver = () => {
    if (!playerOne.includes(null) || !playerTwo.includes(null)) {
      return true
    }
    return false
  }



  const handleBoxClickPlayerOne = (indx) => {
    //alert(playerXPlaying);
    const updateBoard = playerOne.map((value, index) => {
      if (index === indx && playerXPlaying === true) {
        update2(die, index);
        //setPlayerxPlayer(!playerXPlaying)
        //setDie(Math.floor(Math.random() * 6 + 1))
        return die;
      } else {
        return value;
      }
    })

    if (playerXPlaying){ 
    let diemove = Math.floor(Math.random() * 6 + 1); 
    const Ref = doc(db, "Sessions", sessionID );
    updateDoc(  Ref, {
      playerone: updateBoard,
      playertwo: playerTwo,
      playerXPlaying: false,  
      die: diemove,
    });
  } 
    
  }


  const handleBoxClickPlayerTwo = (indx) => {
    //alert(playerXPlaying);
    const updateBoard = playerTwo.map((value, index) => {
      if (index === indx && playerXPlaying === false) {
        update1(die, index)
       // setPlayerxPlayer(!playerXPlaying)
      //  setDie(Math.floor(Math.random() * 6 + 1))
        
        return die;
      } else {
        return value;
      }
    })

    if (!playerXPlaying)
    {
    const  Ref = doc(db, "Sessions", sessionID );
    let diemove = Math.floor(Math.random() * 6 + 1); 

    updateDoc(Ref, {
      playerone: playerOne,
      playertwo: updateBoard,
      playerXPlaying: true, 
      die: diemove
      
    });
  }


  }

  const resetBoard = () => {
    
    // setPlayerOneBoard(Array(9).fill(null));
    // setPlayerTwoBoard(Array(9).fill(null));
    // setDie(Math.floor(Math.random() * 6 + 1))
    const Ref = doc(db, "Sessions", sessionID );
    let diemove = Math.floor(Math.random() * 6 + 1); 
    updateDoc(Ref, {
      playerone: Array(9).fill(null),
      playertwo: Array(9).fill(null),
      die: diemove,
      playerXPlaying: true
      
    });
    
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
  const winner = () => {
    const list = updateScore()
    console.log(list)
    if (list.playerOne > list.playerTwo) {
      return(
        "Player One Won!"
      )
    }else if (list.playerOne < list.playerTwo) {
      return(
        "Player Two Won!"
      )
    } else{
      return(
        "Game ended in a Tie!"
      )
    }
  }
  winner();
    return(

      <div>
        {handleGameOver() ? (
        <div className="GameOver">
          
          <ScoreBoard names={{playerOneName: "POne", playerTwoName: "PTwo"}} scores={updateScore()} playerXPlaying={playerXPlaying} ID={sessionID}/>
          <Board name={"X"} board={playerOne} onClick={null}/>
          <h1 style={{fontSize: "30px", color: "black", background: "", textAlign: "center"}}>{winner()}</h1>
          <Board name={"O"} board={playerTwo} onClick={null}/>
          <ResetButton name="Join" resetBoard={resetBoard} joinButton={AlertSession}/>
        </div>):
        (<div className="Game">
          <ScoreBoard names={{playerOneName: "POne", playerTwoName: "PTwo"}} scores={updateScore()} playerXPlaying={playerXPlaying} ID={sessionID}/>
          <Board name={"X"} board={playerOne} onClick={handleBoxClickPlayerOne}/>
          <Dice roll={die} clicked={false}/>
          <Board name={"O"} board={playerTwo} onClick={handleBoxClickPlayerTwo}/>
          <ResetButton name="Join" resetBoard={resetBoard} joinButton={AlertSession}/>
        </div>)}
      </div>
    )
  }

export default App;