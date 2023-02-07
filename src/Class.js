  export const handleGameOver = (playerOne, playerTwo) => {
    if (!playerOne.includes(null) || !playerTwo.includes(null)) {
      return true
    }
    return false
  };

  export const points = (board, index) => {
    
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

  export const updateScore = (playerOne, playerTwo) => {
    const calcScore = (player) => {
      return points(player, 0) + points(player, 1) + points(player, 2)
    }
    return({playerOne: calcScore(playerOne), playerTwo: calcScore(playerTwo)})
  };

  export const sort = (board) => {
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

  export const updateChange = (roll, index, player) => {
    let i = index % 3;

    if (player[i] === roll) {
      player[i] = null;
    }
    if (player[i + 3] === roll) {
      player[i + 3] = null;
    }
    if (player[i + 6] === roll) {
      player[i + 6] = null;
    }
    sort(player)
  }

  export const winner = (playerOne, playerTwo) => {
    const list = updateScore(playerOne, playerTwo)
    
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

  export const sessionIDGenerator = () => {
    const radnNum = (Math.floor(Math.random() * (10)))
    return radnNum.toString().padStart(6, '0');
  }

  export const match = (array) => {
  
    let matchingIndexes = [];

    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
          if (!matchingIndexes.includes(i) && array[i] !== null) {
            matchingIndexes.push(i );
          }
          if (!matchingIndexes.includes(j) && array[j] !== null) {
            matchingIndexes.push(j );
          }
        }
      }
    }

  return matchingIndexes;
  }