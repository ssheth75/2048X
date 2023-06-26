import Board from "./board.js";

let gameBoard;


export function createBoard() {
  gameBoard = new Board();
  awaitInput();
}

function awaitInput() {
  window.addEventListener("keydown", move, { once: true });
}


async function move() {

  if (event.code == "ArrowUp") {
    await gameBoard.moveUp();
  } else if (event.code == "ArrowDown") {
    await gameBoard.moveDown();
  } else if (event.code == "ArrowLeft") {
    await gameBoard.moveLeft();
  } else if (event.code == "ArrowRight") {
    await gameBoard.moveRight();
  }
  awaitInput();
}
