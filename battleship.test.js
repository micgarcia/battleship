import { Ship, Gameboard } from './battleship.js';

test('ship produces object with array of length', () => {
  const shipObject = new Ship(5);
  expect(shipObject.positions.length).toBe(5);
});

test('ship has hit function that marks position as hit', () => {
  const shipObject = new Ship(5);
  shipObject.hit(3);
  expect(shipObject.positions[3]).toBe('hit');
});

test('ship has isSunk function that determines if all positions are hit', () => {
  const shipObject = new Ship(2);
  shipObject.hit(0);
  shipObject.hit(1);
  expect(shipObject.isSunk()).toBe(true);
})


test.todo('Gameboard has receiveAttack function that takes coords, sends hit to ship or miss'

)