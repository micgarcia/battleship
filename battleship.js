export const Ship = function(length) {
  this.positions = new Array(length);
  this.hit = function(pos) {
    this.positions[pos] = 'hit';
  }

}