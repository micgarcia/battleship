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
    this.isTurn = false;
  }
  this.compAttack = function(board) {
    const letters = "ABCDEFGHIJ";
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    let randomNumber = (Math.floor(Math.random() * 10)).toString();
    let randomCoord = randomLetter + randomNumber;
    if(board.board[randomCoord] === 'miss') {
      this.compAttack(board);
    } else {
      board.receiveAttack(randomCoord);
      this.isTurn = false;
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
      coordinates: ['B2', 'B3']
    }
  }

  const oneBoard = new Gameboard(oneShips);
  const compBoard = new Gameboard();
}