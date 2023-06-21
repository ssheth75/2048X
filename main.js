import Board from "./board.js";

const gameBoard = new Board();

export function awaitInput()
{
  document.addEventListener("keyup", (event) => {
    if (event.code == "ArrowUp") {
      gameBoard.moveUp();
    } else if (event.code == "ArrowDown") {
      gameBoard.moveDown();
    } else if (event.code == "ArrowLeft") {
      gameBoard.moveLeft();
    } else if (event.code == "ArrowRight") {
      gameBoard.moveRight();
    }
  });
}

