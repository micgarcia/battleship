import { Ship } from './battleship.js';
test('ship produces object with array of length', () => {
  const shipObject = new Ship(5);
  expect(shipObject.positions.length).toBe(5);
});

test('ship has hit function that marks position as hit', () => {
  const shipObject = new Ship(5);
  shipObject.hit(3);
  expect(shipObject.positions[3]).toBe('hit');
});