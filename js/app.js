var board = document.querySelector('.board-js');
board.addEventListener('click', addMove);

var resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGame);


var centinel = true;
var moves = 0;

function addMove(event) {
  if (event.target.textContent === '') {
    if (centinel) {
      event.target.className = 'play-x';
      event.target.textContent = 'X';
    } else {
      event.target.className = 'play-o';
      event.target.textContent = 'O';
    }

    moves++;

    if (moves >= 5 && moves < 10) {
      if (checkWinner(event.target.textContent)) {
        document.querySelector('#winMessage').textContent = 'Gana el jugador ' + event.target.textContent;
      } else if (checkWinner(event.target.textContent) == false && moves == 9) {
        document.querySelector('#winMessage').textContent = 'Nadie gana. ¡Es un empate! :(';
      }
    }
    centinel = !centinel;
  }
}

function checkWinner(play) {
  var centinel = false;
  if (checkRow(1, 2, 3, play) ||
    checkRow(4, 5, 6, play) ||
    checkRow(7, 8, 9, play) ||
    checkRow(1, 5, 9, play) ||
    checkRow(3, 5, 7, play) ||
    checkRow(1, 4, 7, play) ||
    checkRow(2, 5, 8, play) ||
    checkRow(3, 6, 9, play)) {
    centinel = true;
    board.removeEventListener('click', addMove);
  }
  return centinel;
}

function checkRow(a, b, c, play) {
  var centinel = false;
  if (getBox(a) == play && getBox(b) == play && getBox(c) == play)
    centinel = true;
  return centinel;
}

function getBox(num) {
  return document.getElementById('box' + num).textContent;
}

function resetGame(event) {
  var boxes = document.getElementsByTagName('td');
  for (var i = 0; i < boxes.length; i++)
    boxes[i].textContent = '';

  document.querySelector('#winMessage').textContent = '';
  moves = 0;
  board.addEventListener('click', addMove);
}
