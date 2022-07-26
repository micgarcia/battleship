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
  const gameBoard = new Gameboard(oneShips);
  gameBoard.receiveAttack('A3');
  expect(carrier.positions[2]).toBe('hit');
});

test('Gameboard has receiveAttack function, should register a miss', () => {
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
  const gameBoard = new Gameboard(oneShips);
  gameBoard.receiveAttack('A6');
  expect(gameBoard.board['A6']).toBe('miss');
});

test('Gameboard has allSunk function that tells whether all ships are sunk', () => {
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
    subTwo: {
      shipObj: subTwo,
      coordinates: ['B2', 'B3']
    }
  }
  const gameBoard = new Gameboard(oneShips);
  gameBoard.receiveAttack('A1');
  gameBoard.receiveAttack('A2');
  gameBoard.receiveAttack('A3');
  gameBoard.receiveAttack('A4');
  gameBoard.receiveAttack('A5');
  gameBoard.receiveAttack('B2');
  gameBoard.receiveAttack('B3');
  expect(gameBoard.allSunk()).toBe(true);
});

test('Player has attack function that attacks gameboard coordinate and hits ship', () => {
  const player = new Player('Player One');
  const carrier = new Ship(5);
  const subTwo = new Ship(2);
  let oneShips = {
    carrier: {
      shipObj: carrier,
      coordinates: ['A1', 'A2', 'A3', 'A4', 'A5']
    },
    subTwo: {
      shipObj: subTwo,
      coordinates: ['B2', 'B3']
    }
  }
  const gameBoard = new Gameboard(oneShips);
  player.attack(gameBoard, 'A2');
  expect(carrier.positions[1]).toBe('hit');
});

test('Player has compAttack that attacks random coordinates that have not already missed', () => {
  const player = new Player('Player One');
  const carrier = new Ship(5);
  const subTwo = new Ship(2);
  let oneShips = {
    carrier: {
      shipObj: carrier,
      coordinates: ['A1', 'A2', 'A3', 'A4', 'A5']
    },
    subTwo: {
      shipObj: subTwo,
      coordinates: ['B2', 'B3']
    }
  }
  const gameBoard = new Gameboard(oneShips);
  player.compAttack(gameBoard);
  const size = Object.keys(gameBoard.board).length;
  expect(size).toBe(8);
});






