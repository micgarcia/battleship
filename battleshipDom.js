export const assignBoard = function() {
  const boardOne = document.getElementById('boardOne');
  const boardOneChildren = boardOne.children;

  const boardTwo = document.getElementById('boardTwo');
  const boardTwoChildren = boardTwo.children;

  const letters = ['A', 'B' , 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numbers = ['1', '2' , '3', '4', '5', '6', '7', '8', '9', '10'];
  let i = 0;
  let coord = '';
  for (let j = 0; j < numbers.length; j++) {
    for (let k = 0; k < letters.length; k++) {
      coord = letters[k] + numbers[j];
      boardOneChildren[i].setAttribute('id', coord);
      boardTwoChildren[i].setAttribute('id', coord);
      i++;
    }
  }
}

export const populateBoard = function(gameBoard, number) {
    if (number === 1) {
      var boardElement = document.getElementById('boardOne');
    } else if (number === 2) {
      var boardElement = document.getElementById('boardTwo');
    }
    for (let coord in gameBoard.board) {
      let currentCoord = boardElement.querySelector('#' + coord);
      currentCoord.style.backgroundColor = 'black';
    }
}

export const clickAttack = function(targetPlayer, targetBoard) {
  if (targetPlayer.name === 'Player One') {
    var boardElement = document.getElementById('boardOne');
  } else {
    var boardElement = document.getElementById('boardTwo');
  }
  if (targetPlayer.name === 'Computer') {
    const boardElementChildren = boardElement.children;
    for (let i = 0; i < boardElementChildren.length; i++) {
      boardElementChildren[i].addEventListener('click', (event) => {
        console.log(event.target.id);
        let selectedCoord = event.target.id;
        targetBoard.receiveAttack(selectedCoord);
        console.log(targetBoard);
        if (targetBoard.board[selectedCoord] === 'miss') {
          event.target.style.backgroundColor = 'red';
        } else {
          event.target.style.backgroundColor = 'grey';
        }
      })
    }
  } else if (targetPlayer.name === 'Player One') {
    targetPlayer.compAttack(targetBoard);
    for (let cell in targetBoard.board) {
      if (targetBoard.board[cell] === 'miss') {
        let hitSpot = document.getElementById(cell);
        hitSpot.style.backgroundColor = 'red';
      }
    }
  }

  // IMPLEMENT SYSTEM TO SHOW VISUALLY WHICH SHIPS ARE HIT BY THE COMP ATTACK
  //    SHOULD BE ABLE TO USE THE SHIP OBJECT'S POSITIONS ARRAY
  // FIX WHILE LOOP IN BATTLESHIP.JS SO THAT EACH PLAYER TAKES TURNS
  // FIGURE OUT HOW TO DISABLE CLICK EVENTS FROM PLAYER WHEN NOT THEIR TURN
  // CREATE WINNING EVENT WHEN THE WHILE LOOP STOPS BECAUSE ONE OF THE BOARDS
  //    ALLSUNK() FUNCTION RETURNS TRUE
  // CREATE INPUT TO ALLOW PLAYER TO PLACE SHIPS, COMPUTER RANDOMLY PLACES THEM
  // CREATE RESTART BUTTON TO RESET THE BOARD AND REPLACE THE SHIPS
  // HIDE THE COMPUTER'S SHIPS FROM PLAYER BUT SHOW HITS AND MISSES
}