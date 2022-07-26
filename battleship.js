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

export const Gameboard = function(shipOne) {
  this.board = {
    'A1': 'miss',
    'A2': shipOne,
    'A3': shipOne,
    'A4': shipOne
  };

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
    if (shipOne.isSunk()) {
      return true;
    } else {
      return false;
    }
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