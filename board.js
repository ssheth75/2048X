import Tile from "./tile.js";
class Board {
  size;
  #board;
  #boardArr;

  // setup board and initial game state
  constructor() {
    this.size = document.getElementById("gridSizeIn").value;
    this.#board = document.getElementById("board");
    this.#boardArr = new Array(this.size);

    // Create board array
    for (var i = 0; i < this.size; ++i) {
      this.#boardArr[i] = new Array(this.size);
      for (var j = 0; j < this.size; ++j) {
        this.#boardArr[i][j] = 0; // Assign initial value, such as 0, to each board element
      }
    }
    // set board style and clear existing cells
    this.#board.style.setProperty("--grid-size", this.size);
    this.#board.innerHTML = "";
    for (var i = 0; i < this.size * this.size; i++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      this.#board.appendChild(cell);
    }

    // Generate random tiles
    var numToGenerate;
    if (this.size >= 4 && this.size <= 6) numToGenerate = 2;
    else numToGenerate = 3;

    for (var i = 0; i < numToGenerate; i++) {
      var x = Math.floor(Math.random() * this.size);
      var y = Math.floor(Math.random() * this.size);
      var tile = new Tile(x, y);
      this.#boardArr[x][y] = tile;
    }
  }

  moveUp() {
    console.log("Moving up");
  }

  moveDown() {
    console.log("Moving down");
  }

  moveLeft() {
    console.log("Moving left");
  }

  moveRight() {
    console.log("Moving right");
  }
}


export default Board
