import { assignBoard, getShips, populateBoard, clickAttack } from './battleshipDom.js';

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
  this.attackHistory = [];
  this.compAttack = function(board) {
    const letters = "ABCDEFGHIJ";
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    let randomNumber = (Math.floor(Math.random() * (11 - 1) + 1)).toString();
    if (randomNumber === '0') {
      this.compAttack(board);
    }
    let randomCoord = randomLetter + randomNumber;

    while((this.attackHistory.includes(randomCoord))) {
      randomLetter = letters[Math.floor(Math.random() * letters.length)];
      randomNumber = (Math.floor(Math.random() * (11 - 1) + 1)).toString();
      randomCoord = randomLetter + randomNumber;
      if (this.attackHistory.length === 100) {
        break;
      }
    }
    this.attackHistory.push(randomCoord);
    board.receiveAttack(randomCoord);

    return randomCoord;
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

  /*
  A1 A2 A3 A4 A5
  B6 B7 B8 B9
  H1 H2 H3
  E5 E6
  I9 J9
  */

  getShips.then(
    function(oneShips) {
      oneShips.carrier.shipObj = carrier;
      oneShips.battleship.shipObj = battleship;
      oneShips.cruiser.shipObj = cruiser;
      oneShips.subOne.shipObj = subOne;
      oneShips.subTwo.shipObj = subTwo;

      const oneBoard = new Gameboard(oneShips);
      const compBoard = new Gameboard(twoShips);

      assignBoard();
      populateBoard(oneBoard, 1);

      clickAttack(compPlayer, compBoard, playerOne, oneBoard);
    }
  )

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
}


gameLoop();

