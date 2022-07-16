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

export const Gameboard = function() {
  this.board = {/*board is an object that assigns each coord (eg 'A2') as a ship. Then it checks if an attack hits a key that has a ship value. Otherwise, it creates a new key with a value of miss};
}