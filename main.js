import Board from "./board.js";

let gameBoard;
let gameOverDiv;

export function createBoard() {
  gameBoard = new Board();

  awaitInput();
}

export function showGameOver(score) {
  // Create the Game Over div
  gameOverDiv = document.createElement("div");
  gameOverDiv.id = "game-over";

  // Set the inner HTML of the div
  gameOverDiv.innerHTML = `
    <h1>Game Over</h1>
    <p>Your Score: ${score}</p>
    <button id="restart-button">Restart</button>
  `;

  // Apply CSS styles to the div
  gameOverDiv.style.position = "fixed";
  gameOverDiv.style.top = "0";
  gameOverDiv.style.left = "0";
  gameOverDiv.style.width = "100%";
  gameOverDiv.style.height = "100%";
  gameOverDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  gameOverDiv.style.color = "#fff";
  gameOverDiv.style.display = "flex";
  gameOverDiv.style.flexDirection = "column";
  gameOverDiv.style.alignItems = "center";
  gameOverDiv.style.justifyContent = "center";
  gameOverDiv.style.zIndex = "9999";
  gameOverDiv.style.opacity = "0";
  gameOverDiv.style.transition = "opacity 0.5s";

  // Append the div to the body
  document.body.appendChild(gameOverDiv);

  // Trigger a reflow so that the transition works
  gameOverDiv.offsetWidth;

  // Fade in the Game Over div
  gameOverDiv.style.opacity = "1";

  // Add event listener to restart button
  const restartButton = gameOverDiv.querySelector("#restart-button");
  restartButton.addEventListener("click", handleRestart);
}

function handleRestart() {
  // Remove the Game Over div from the DOM
  gameOverDiv.remove();
  createBoard();
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
