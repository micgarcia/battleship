export const assignBoard = function() {
  const boardOne = document.getElementById('boardOne');
  const boardOneChildren = boardOne.children;

  const boardTwo = document.getElementById('boardTwo');
  const boardTwoChildren = boardTwo.children;

  const letters = ['A', 'B' , 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numbers = ['1', '2' , '3', '4', '5', '6', '7', '8', '9', '10'];
  let i = 0;
  let coord = '';
  for (let j = 0; j < numbers.length; j++) {
    for (let k = 0; k < letters.length; k++) {
      coord = letters[k] + numbers[j];
      boardOneChildren[i].setAttribute('id', coord);
      boardTwoChildren[i].setAttribute('id', coord);
      i++;
    }
  }
}

export const getShips = new Promise(function(myResolve, myReject) {
  let oneShips = {};
  const button = document.getElementById('submitCoord');

  button.addEventListener('click', () => {
    const carrier = document.getElementById('carrier').value.split(' ');
    const battleship = document.getElementById('battleship').value.split(' ');
    const cruiser = document.getElementById('cruiser').value.split(' ');
    const subOne = document.getElementById('subOne').value.split(' ');
    const subTwo = document.getElementById('subTwo').value.split(' ');

    oneShips = {
      'carrier': {
        coordinates: carrier
      },
      'battleship': {
        coordinates: battleship
      },
      'cruiser': {
        coordinates: cruiser
      },
      'subOne': {
        coordinates: subOne
      },
      'subTwo': {
        coordinates: subTwo
      }
    }

    myResolve(oneShips);
  })



})

export const populateBoard = function(gameBoard, number) {
    if (number === 1) {
      var boardElement = document.getElementById('boardOne');
    } else if (number === 2) {
      var boardElement = document.getElementById('boardTwo');
    }
    for (let coord in gameBoard.board) {
      let currentCoord = boardElement.querySelector('#' + coord);
      currentCoord.style.backgroundColor = 'black';
    }
}


export const clickAttack = function(targetPlayer, targetBoard, playerOne, playerBoard) {
  if (targetPlayer.name === 'Player One') {
    var boardElement = document.getElementById('boardOne');
  } else {
    var boardElement = document.getElementById('boardTwo');
  }

  // User attacking logic
  if (targetPlayer.name === 'Computer') {
    const boardElementChildren = boardElement.children;
    for (let i = 0; i < boardElementChildren.length; i++) {
      boardElementChildren[i].addEventListener('click', function attack(event) {
        let selectedCoord = event.target.id;
        if (event.target.style.backgroundColor === 'red' || event.target.style.backgroundColor === 'grey') {
          console.log('already attacked');
          return;
        }

        targetBoard.receiveAttack(selectedCoord);
        if (targetBoard.board[selectedCoord] === 'miss') {
          event.target.style.backgroundColor = 'red';
        } else {
          event.target.style.backgroundColor = 'grey';
        }

        // Computer attacking logic
        let randomCoord = targetPlayer.compAttack(playerBoard);
        for (let cell in playerBoard.board) {
          if (playerBoard.board[cell] === 'miss') {
            let hitSpot = document.getElementById(cell);
            hitSpot.style.backgroundColor = 'red';
          }
        }
        let playerBoardElement = document.getElementById('boardOne');
        let playerBoardElementChildren = playerBoardElement.children;
        for (let i = 0; i < playerBoardElementChildren.length; i++) {
          if (playerBoardElementChildren[i].id === randomCoord) {
            if (playerBoardElementChildren[i].style.backgroundColor === 'black') {
              playerBoardElementChildren[i].style.backgroundColor = 'grey';
            }
          }
        }
        if (targetBoard.allSunk()) {
          endGame(playerOne.name);
        } else if (playerBoard.allSunk()) {
          endGame(targetPlayer.name);
        }

      })
    }
  }
}

// Work on styling and formatting

const endGame = function(winningPlayer) {
  const msgCont = document.getElementById('msgCont');
  msgCont.innerHTML = '';

  const winMessage = document.createElement('div');
  const gameArea = document.getElementById('gameArea');
  const content = document.getElementById('content');
  winMessage.setAttribute('id', 'winMessage');
  winMessage.innerHTML = winningPlayer + ' has won!';

  msgCont.appendChild(winMessage);
  content.insertBefore(msgCont, gameArea);
}