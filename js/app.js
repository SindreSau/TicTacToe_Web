const startBtn = document.getElementById('startBtn');
const gameContainer = document.getElementById('gameContainer');
const textField = document.getElementById('textField');

let turn = 0;
let clicked = 0;
let cells = [];
let takenCells = [];
let hasWinner = false;
let winner = null;
let winStatement;

startBtn.addEventListener('click', () => {
  startBtn.style.animation = ' rollOut .4s linear forwards';
  setTimeout(() => startBtn.remove(), 400);
  setTimeout(() => gameBoard.createBoard(), 1000);
})

const gameBoard = {
  board: document.createElement('div'),

  createBoard: function () {
    textField.textContent = "To begin, place a piece on the board. X starts!";
    this.board.id = 'gameBoard';
    this.createCells();
    cells.forEach(cell => {
      this.board.appendChild(cell);
    });
    gameContainer.appendChild(this.board);
  },

  createCells: function () {
    for (let i = 1; i <= 9; i++) {
      cells[i] = document.createElement('div');
      cells[i].id = "c" + i;
      cells[i].textContent = " ";
      cells[i].classList.add('cells');
      cells[i].addEventListener('click', () => {
        clicked = i;
        if (!hasWinner) {
          setPiece(clicked);
        }
        checkWinner();
      });
    }
  }
}

function setPiece(cellClicked) {
  if (isValidPosition(cellClicked)) {
    if (turn === 0) {
      cells[cellClicked].textContent = 'X';
      turn = 1;
    } else {
      cells[cellClicked].textContent = 'O';
      turn = 0;
    }
  } else {
    textField.textContent = "Invalid position";
  }
  console.log("turn: " + turn);
}

function isValidPosition(cellClicked) {
  let valid = true;

  if (takenCells.includes(cellClicked)) {
    valid = false;
  } else {
    takenCells.push(cellClicked);
  }

  return valid;
}

function checkWinner() {
  if (takenCells.length === 9) {
    hasWinner = true;
    winStatement = "Tie!";
  }

  let winLines = [
    //Rows
    cells[1].textContent + cells[2].textContent + cells[3].textContent,
    cells[4].textContent + cells[5].textContent + cells[6].textContent,
    cells[7].textContent + cells[8].textContent + cells[9].textContent,
    //Columns
    cells[1].textContent + cells[4].textContent + cells[7].textContent,
    cells[2].textContent + cells[5].textContent + cells[8].textContent,
    cells[3].textContent + cells[6].textContent + cells[9].textContent,
    //Diagonal
    cells[1].textContent + cells[5].textContent + cells[9].textContent,
    cells[3].textContent + cells[5].textContent + cells[7].textContent
  ];

  winLines.forEach((line) => {
    if (line === "XXX") {
      hasWinner = true;
      winStatement = "X Wins!";
      winner = "X";
      scoreX += 1;
    } else if (line === "OOO") {
      hasWinner = true;
      winStatement = "O Wins!";
      winner = "O";
      scoreX += 1;
    }
  });

  if (hasWinner) {
    textField.textContent = winStatement;
    updateFooter();
  }
}


//Creating footer with info
const footer = document.querySelector("footer");
const timesPlayedText = document.querySelector(".times-played");
const scoreXText = document.querySelector(".score-x");
const scoreOText = document.querySelector(".score-o");
let timesPlayed = 0;
let scoreX = 0;
let scoreO = 0;

startBtn.onclick = () => {
  footer.style.animation = "popUp 1000ms ease-in-out forwards";
}

function updateFooter() {
  if (hasWinner) {
    timesPlayedText.textContent += " " + winStatement;
    switch (winner) {
      case "X": scoreXText += " " + scoreX; break;
      case "O": scoreXText += " " + scoreO; break;
    }
  }
}