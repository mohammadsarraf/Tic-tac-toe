import React, { useState, useEffect } from "react";
import { Board } from "./Board";
import { ResetButton } from "./ResetButton";
import { ScoreBoard } from "./ScoreBoard";
import { Dice } from "./Dice";
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";
import * as cotl from "./Class.js";
import './App.css';
import './Dice.css';

const App = () =>{
  const [playerOne, setPlayerOneBoard] = useState(Array(9).fill(null))
  const [playerTwo, setPlayerTwoBoard] = useState(Array(9).fill(null))
  const [sessionID, setSessionID]= useState(cotl.sessionIDGenerator());
  const [playerXPlaying, setPlayerxPlayer] = useState(true)
  const [die, setDie] = useState(Math.floor(Math.random() * 6 + 1))
  // const IntialzeBoard = false; 

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

  const AlertSession = () => {
    let ID = prompt("Please enter the session");
    setSessionID(ID);
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
        finished: cotl.handleGameOver(playerOne, playerTwo), 
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

  useEffect (() => {
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
        finished: cotl.handleGameOver(playerOne, playerTwo), 
        PlayeroneName:  "ReadyPlayerOne", 
        playerXPlaying: true
        //TODO: 
        //PlayertwoName: "null", // TODO: Get player name 
      });
    } 
  }
    IntialzeBoard(); 
  },[])
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Sessions", sessionID), (doc) => {
        
        setPlayerOneBoard(cotl.sort(doc.data().playerone))
        setPlayerTwoBoard(cotl.sort(doc.data().playertwo))
        setDie(doc.data().die)
        setPlayerxPlayer(doc.data().playerXPlaying)

      }
  )
  },[sessionID])

  const handleBoxClickPlayerOne = (indx) => {
    //alert(playerXPlaying);
    const updateBoard = playerOne.map((value, index) => {
      if (index === indx && playerXPlaying === true) {
        cotl.updateChange(die, index, playerTwo);
        
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
        cotl.updateChange(die, index, playerOne)
        return die;
      } else {
        return value;
      }
    })

    if (!playerXPlaying){

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
    const Ref = doc(db, "Sessions", sessionID );
    let diemove = Math.floor(Math.random() * 6 + 1); 

    updateDoc(Ref, {
      playerone: Array(9).fill(null),
      playertwo: Array(9).fill(null),
      die: diemove,
      playerXPlaying: true
      
    });
  }

    return(

      <div>
        {cotl.handleGameOver(playerOne, playerTwo) ? (
        <div className="GameOver">
          <ScoreBoard names={{playerOneName: "POne", playerTwoName: "PTwo"}} scores={cotl.updateScore(playerOne, playerTwo)} playerXPlaying={playerXPlaying} ID={sessionID}/>
          <Board name={"X"} board={playerOne} onClick={null}/>
          <h1 style={{fontSize: "30px", color: "black", background: "", textAlign: "center"}}>{cotl.winner(playerOne, playerTwo)}</h1>
          <Board name={"O"} board={playerTwo} onClick={null}/>
          <ResetButton name="Join" resetBoard={resetBoard} joinButton={AlertSession}/>
        </div>)
          :
        (<div className="Game">

          <ScoreBoard names={{playerOneName: "POne", playerTwoName: "PTwo"}} scores={cotl.updateScore(playerOne, playerTwo)} playerXPlaying={playerXPlaying} ID={sessionID}/>
          <Board name={"X"} board={playerOne} onClick={handleBoxClickPlayerOne}/>
          <Dice roll={die} clicked={false}/>
          <Board name={"O"} board={playerTwo} onClick={handleBoxClickPlayerTwo}/>
          <ResetButton name="Join" resetBoard={resetBoard} joinButton={AlertSession}/>

        </div>)}
      </div>

    )
}

export default App;