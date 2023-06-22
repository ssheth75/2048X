import Board from "./board.js";

let gameBoard;


export function createBoard() {
  gameBoard = new Board();
  awaitInput();
}

function awaitInput() {
  window.addEventListener("keydown", move, { once: true });
}


function move() {

  if (event.code == "ArrowUp") {
    gameBoard.moveUp();
  } else if (event.code == "ArrowDown") {
    gameBoard.moveDown();
  } else if (event.code == "ArrowLeft") {
    gameBoard.moveLeft();
  } else if (event.code == "ArrowRight") {
    gameBoard.moveRight();
  }
  awaitInput();
}
