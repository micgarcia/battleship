import { assignBoard, populateBoard, clickAttack } from './battleshipDom.js';

export const Ship = function(length) {
  this.positions = new Array(length);
  this.hit = function(pos) {
    this.positions[pos] = 'hit';
  }
  this.isSunk = function() {
    for(let i = 0; i < this.positions.length; i++) {
      if (this.positions[i] !== 'hit') {
        return false;
      } else if (this.positions[i] === 'hit' && i === this.positions.length - 1) {
        return true;
      }
    }
  }
}

export const Gameboard = function(fleet) {
  this.board = {};
  let newBoard = this.board;
  for (let boats in fleet) {
    for (let i = 0; i < fleet[boats].coordinates.length; i++) {
      newBoard[fleet[boats].coordinates[i]] = fleet[boats].shipObj;
    }
  }

  this.receiveAttack = function(coord) {
    if(this.board[coord] && this.board[coord] !== 'miss') {
      const ship = this.board[coord];
      let j = -1;
      for (let prop in this.board) {
        if (this.board[prop] === ship) {
          j++;
        }
        if (prop === coord) {
          ship.hit(j);
        }
      }
    } else if(this.board[coord] === undefined) {
      this.board[coord] = 'miss';
    }
  }

  this.allSunk = function() {
    for (let boats in fleet) {
      if (fleet[boats].shipObj.isSunk()) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
}

export const Player = function(playerName) {
  this.name = playerName;
  this.isTurn = false;
  this.attack = function(board, coord) {
    board.receiveAttack(coord);
  }
  this.compAttack = function(board) {
    const letters = "ABCDEFGHIJ";
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    let randomNumber = (Math.floor(Math.random() * (11 - 1) + 1)).toString();
    if (randomNumber === '0') {
      this.compAttack(board);
    }
    let randomCoord = randomLetter + randomNumber;
    if(board.board[randomCoord] === 'miss') {
      this.compAttack(board);
    } else {
      board.receiveAttack(randomCoord);
    }

  }
}

export const gameLoop = function() {
  const playerOne = new Player('Player One');
  playerOne.isTurn = true;
  const compPlayer = new Player('Computer');

  const carrier = new Ship(5);
  const battleship = new Ship(4);
  const cruiser = new Ship(3);
  const subOne = new Ship(2);
  const subTwo = new Ship(2);

  let oneShips = {
    carrier: {
      shipObj: carrier,
      coordinates: ['A1', 'A2', 'A3', 'A4', 'A5']
    },
    battleship: {
      shipObj: battleship,
      coordinates: ['D1', 'E1', 'F1', 'G1']
    },
    cruiser: {
      shipObj: cruiser,
      coordinates: ['J1', 'J2', 'J3']
    },
    subOne: {
      shipObj: subOne,
      coordinates: ['E4', 'E5']
    },
    subTwo: {
      shipObj: subTwo,
      coordinates: ['B9', 'C9']
    }
  }

  let twoShips = {
    carrier: {
      shipObj: carrier,
      coordinates: ['C2', 'D2', 'E2', 'F2', 'G2']
    },
    battleship: {
      shipObj: battleship,
      coordinates: ['B4', 'B5', 'B6', 'B7']
    },
    cruiser: {
      shipObj: cruiser,
      coordinates: ['G10', 'H10', 'I10']
    },
    subOne: {
      shipObj: subOne,
      coordinates: ['G5', 'G6']
    },
    subTwo: {
      shipObj: subTwo,
      coordinates: ['J1', 'J2']
    }
  }

  const oneBoard = new Gameboard(oneShips);
  const compBoard = new Gameboard(twoShips);

  assignBoard();
  populateBoard(oneBoard, 1);
  populateBoard(compBoard, 2);

  if (playerOne.isTurn) {
    clickAttack(compPlayer, compBoard);
    playerOne.isTurn = false;
    compPlayer.isTurn = true;
  }

  if(compPlayer.isTurn) {
    clickAttack(playerOne, oneBoard);
  }


  if (playerOne.isTurn) {
    clickAttack(compPlayer, compBoard);
    playerOne.isTurn = false;
    compPlayer.isTurn = true;
  } else if (compPlayer.isTurn) {
    clickAttack(playerOne, oneBoard);
    compPlayer.isTurn = false;
    playerOne.isTurn = true;
  }
/*
  while (!(oneBoard.allSunk() || compBoard.allSunk())) {
    if (playerOne.isTurn) {
    clickAttack(compPlayer, compBoard);
    playerOne.isTurn = false;
    compPlayer.isTurn = true;
    } else if (compPlayer.isTurn) {
      clickAttack(playerOne, oneBoard);
      compPlayer.isTurn = false;
      playerOne.isTurn = true;
    }
  }
*/
}


gameLoop();

