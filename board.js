import Tile from "./tile.js";
class Board {
  size;
  count;
  #board;
  #boardArr;

  // setup board and initial game state
  constructor() {
    this.count = 0;
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
    console.log(this.#boardArr);
    // Generate random tiles
    var numToGenerate;
    if (this.size >= 4 && this.size <= 6) numToGenerate = 2;
    else numToGenerate = 3;

    for (var i = 0; i < numToGenerate; i++) {
      var x = Math.floor(Math.random() * this.size);
      var y = Math.floor(Math.random() * this.size);
      var val = Math.random() < 0.5 ? 2 : 4;

      var background = val == 2 ? "80%" : "65%";
      var text = val == 2 ? "30%" : "20%";

      var tile = new Tile(x, y, 2, background, text);
      this.#boardArr[x][y] = tile;
    }
  }

  generateRandomTiles() {}

  moveLeft() {
    console.log("Moving left");
    for (var i = 0; i < this.size; ++i) {
      for (var j = 0; j < this.size; ++j) {
        if (this.#boardArr[i][j] != 0) {
          var tile = this.#boardArr[i][j];
          var x = i;
          var y = j;
          // ...
          while (x > 0) {
            if (this.#boardArr[x - 1][y] == 0) {
              this.#boardArr[x - 1][y] = tile;
              this.#boardArr[x][y] = 0;
              tile.x = x - 1;
              tile.setX(); // Call updateX() to update the CSS attribute
              x--;
            } else if (this.#boardArr[x - 1][y].canMerge(tile)) {
              this.#boardArr[x - 1][y].value *= 2;

              // Remove the tile from the board on screen
              this.#boardArr[x][y].remove();

              this.#boardArr[x][y] = 0;
              tile.x = x - 1;
              tile.setX(); // Call updateX() to update the CSS attribute
              x--;
            } else {
              break;
            }
          }
          // ...
        }
      }
    }
    console.log(this.#boardArr);
  }

  moveRight() {
    console.log("Moving right");
    for (var i = 0; i < this.size; ++i) {
      for (var j = this.size - 1; j >= 0; --j) {
        if (this.#boardArr[i][j] != 0) {
          var tile = this.#boardArr[i][j];
          var x = i;
          var y = j;
          // ...
          while (x < this.size - 1) {
            if (this.#boardArr[x + 1][y] == 0) {
              this.#boardArr[x + 1][y] = tile;
              this.#boardArr[x][y] = 0;
              tile.x = x + 1;
              tile.setX(); // Call updateX() to update the CSS attribute
              x++;
            } else if (this.#boardArr[x + 1][y].canMerge(tile)) {
              this.#boardArr[x + 1][y].value *= 2;
              this.#boardArr[x][y].remove();

              this.#boardArr[x][y] = 0;
              tile.x = x + 1;
              tile.setX(); // Call updateX() to update the CSS attribute
              x++;
            } else {
              break;
            }
          }
          // ...
        }
      }
    }
  }

  moveUp() {
    console.log("Moving up");
    for (var i = 0; i < this.size; ++i) {
      for (var j = 0; j < this.size; ++j) {
        if (this.#boardArr[i][j] != 0) {
          var tile = this.#boardArr[i][j];
          var x = i;
          var y = j;
          // ...
          while (y > 0) {
            if (this.#boardArr[x][y - 1] == 0) {
              this.#boardArr[x][y - 1] = tile;
              this.#boardArr[x][y] = 0;
              tile.y = y - 1;
              tile.setY(); // Call updateY() to update the CSS attribute
              y--;
            } else if (this.#boardArr[x][y - 1].canMerge(tile)) {
              this.#boardArr[x][y - 1].value *= 2;
              this.#boardArr[x][y].remove();

              this.#boardArr[x][y] = 0;
              tile.y = y - 1;
              tile.setY(); // Call updateY() to update the CSS attribute
              y--;
            } else {
              break;
            }
          }
          // ...
        }
      }
    }
  }

  moveDown() {
    console.log("Moving down");
    for (var i = 0; i < this.size; ++i) {
      for (var j = this.size - 1; j >= 0; --j) {
        if (this.#boardArr[i][j] != 0) {
          var tile = this.#boardArr[i][j];
          var x = i;
          var y = j;
          // ...
          while (y < this.size - 1) {
            if (this.#boardArr[x][y + 1] == 0) {
              this.#boardArr[x][y + 1] = tile;
              this.#boardArr[x][y] = 0;
              tile.y = y + 1;
              tile.setY(); // Call updateY() to update the CSS attribute
              y++;
            } else if (this.#boardArr[x][y + 1].canMerge(tile)) {
              this.#boardArr[x][y + 1].value *= 2;
              this.#boardArr[x][y].remove();

              this.#boardArr[x][y] = 0;
              tile.y = y + 1;

  
              tile.element.addEventListener("transitionend", function () {


                // Proceed with your code here
                console.log("Transition finished!");
                tile.setY(); 
              });

              // Call updateY() to update the CSS attribute
              //   setTimeout(function () {
              //   }, 3000);

              y++;
            } else {
              break;
            }
          }
          // ...
        }
      }
    }
  }
}

export default Board;
