import { Ship, Gameboard, Player } from './battleship.js';

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
});


test('Gameboard has receiveAttack function that takes coords, sends hit to ship', () => {
  const shipOne = new Ship(3);
  const gameBoard = new Gameboard(shipOne);
  gameBoard.receiveAttack('A3');
  expect(shipOne.positions[1]).toBe('hit');
});

test('Gameboard has receiveAttack function, should register a miss', () => {
  const shipOne = new Ship(3);
  const gameBoard = new Gameboard(shipOne);
  gameBoard.receiveAttack('A5');
  expect(gameBoard.board['A5']).toBe('miss');
});

test('Gameboard has allSunk function that tells whether all ships are sunk', () => {
  const ship = new Ship(3);
  const gameBoard = new Gameboard(ship);
  gameBoard.receiveAttack('A2');
  gameBoard.receiveAttack('A3');
  gameBoard.receiveAttack('A4');
  expect(gameBoard.allSunk()).toBe(true);
});

test('Player has attack function that attacks gameboard coordinate and hits ship', () => {
  const player = new Player('Player One');
  const ship = new Ship(3);
  const gameBoard = new Gameboard(ship);
  player.attack(gameBoard, 'A2');
  expect(ship.positions[0]).toBe('hit');
});

test('Player has compAttack that attacks random coordinates that have not already missed', () => {
  const player = new Player('Player One');
  const ship = new Ship(3);
  const gameBoard = new Gameboard(ship);
  player.compAttack(gameBoard);
  const size = Object.keys(gameBoard.board).length;
  expect(size).toBe(5);
});



