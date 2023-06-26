import Tile from "./tile.js";
import Queue from "./queue.js";
import { showGameOver } from "./main.js";

function coords(x, y) {
  this.x = x;
  this.y = y;
}

class Board {
  size;
  count;
  #board;
  #boardArr;
  breakFlag = false;

  // setup board and initial game state
  constructor() {
    this.count = 0;
    this.size = document.getElementById("gridSizeIn").value;
    this.#board = document.getElementById("board");
    this.#boardArr = [];

    // Create board array
    for (var i = 0; i < this.size; ++i) {
      this.#boardArr[i] = [];
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
      this.generateRandomTiles();
    }


    // var tile = new Tile(0, 0, 2, "80%", "20%");
    // var tile2 = new Tile(0, 1, 3, "80%", "20%");
    // var tile3 = new Tile(0, 2, 4, "80%", "20%");
    // var tile4 = new Tile(0, 3, 5, "80%", "20%");
    // var tile5 = new Tile(1, 0, 2, "80%", "20%");
    // var tile6 = new Tile(1, 1, 7, "80%", "20%");
    // var tile7 = new Tile(1, 2, 8, "80%", "20%");
    // var tile8 = new Tile(1, 3, 9, "80%", "20%");
    // var tile9 = new Tile(2, 0, 9, "80%", "20%");
    // var tile10 = new Tile(2, 1, 11, "80%", "20%");
    // var tile11 = new Tile(2, 2, 12, "80%", "20%");
    // var tile12 = new Tile(2, 3, 13, "80%", "20%");
    // var tile13 = new Tile(3, 0, 14, "80%", "20%");
    // var tile14 = new Tile(3, 1, 15, "80%", "20%");
    // var tile15 = new Tile(3, 2, 16, "80%", "20%");
    // var tile16 = new Tile(3, 3, 17, "80%", "20%");

    // this.#boardArr[0][0] = tile;
    // this.#boardArr[0][1] = tile2;
    // this.#boardArr[0][2] = tile3;
    // this.#boardArr[0][3] = tile4;
    // this.#boardArr[1][0] = tile5;
    // this.#boardArr[1][1] = tile6;
    // this.#boardArr[1][2] = tile7;
    // this.#boardArr[1][3] = tile8;
    // this.#boardArr[2][0] = tile9;
    // this.#boardArr[2][1] = tile10;
    // this.#boardArr[2][2] = tile11;
    // this.#boardArr[2][3] = tile12;
    // this.#boardArr[3][0] = tile13;
    // this.#boardArr[3][1] = tile14;
    // this.#boardArr[3][2] = tile15;
    // this.#boardArr[3][3] = tile16;

    console.table(this.#boardArr);
  }

  // Use bfs to check if there are any possible moves
  checkGameOver() {
    // The directions matrix to move all 4 directions
    var directions = [
      [-1, 0], // north (0)
      [0, 1], // east (1)
      [1, 0], // south (2)
      [0, -1],
    ]; // west (3)

    var visited = new Array(this.size);
    for (var i = 0; i < this.size; ++i) {
      visited[i] = new Array(this.size);
      for (var j = 0; j < this.size; ++j) {
        visited[i][j] = false;
      }
    }

    var q = new Queue();
    q.push(new coords(0, 0));

    while (!q.isEmpty()) {
      var curr = q.front();
      q.pop();
      visited[curr.x][curr.y] = true;

      for (var i = 0; i < 4; ++i) {
        var row = curr.x + directions[i][0];
        var col = curr.y + directions[i][1];

        if (row < 0 || col < 0 || row == this.size || col == this.size) {
          continue;
        }

        if (
          this.#boardArr[curr.x][curr.y].val == this.#boardArr[row][col].val
        ) {
          return false;
        } else if (!visited[row][col]) {
          q.push(new coords(row, col));
        }
      }
    }
    return true;
  }

  generateRandomTiles() {
    var openCells = [];
    var numOpenCells = 0;

    for (var r = 0; r < this.size; ++r) {
      for (var c = 0; c < this.size; ++c) {
        if (this.#boardArr[r][c] == 0) {
          openCells.push(new coords(r, c));
          ++numOpenCells;
        }
      }
    }
    if (numOpenCells > 0) {
      var newTileLoc = Math.floor(Math.random() * numOpenCells);

      var x = openCells[newTileLoc].x;
      var y = openCells[newTileLoc].y;
      var val = Math.random() < 0.5 ? 2 : 4;
      var background = val == 2 ? "90%" : "85%";
      var text = val == 2 ? "30%" : "20%";

      var tile = new Tile(x, y, val, background, text);
      this.#boardArr[x][y] = tile;
      numOpenCells--;
    }

    if (numOpenCells == 0) {
      if (this.checkGameOver()) {
        console.log("Game Over");
        showGameOver(10);
        return;
      }
    }
  }

  removeMergedFlag() {
    for (var i = 0; i < this.size; ++i) {
      for (var j = 0; j < this.size; ++j) {
        if (this.#boardArr[i][j] != 0) {
          this.#boardArr[i][j].merged = false;
        }
      }
    }
  }

  async moveLeft() {
    console.log("Moving left");
    var changed = false;

    for (var col = 0; col < this.size; ++col) {
      for (var row = 0; row < this.size; ++row) {
        if (this.#boardArr[row][col] != 0) {
          var tile = this.#boardArr[row][col];
          var x = row;
          var y = col;

          while (x > 0) {
            // this.slide(tile, x, y, x - 1, y, "horizontal");
            if (this.#boardArr[x - 1][y] == 0) {
              this.#boardArr[x - 1][y] = tile;
              this.#boardArr[x][y] = 0;
              tile.x = x - 1;
              tile.setX(); // Call updateX() to update the CSS attribute
              changed = true;
              x--;
            } else if (this.#boardArr[x - 1][y].canMerge(tile)) {
              tile.setValue();
              tile.x = x - 1;
              await tile.setX(); // Call updateX() to update the CSS attribute
              changed = true;
              this.#boardArr[x - 1][y].remove();
              this.#boardArr[x][y] = 0;
              tile.merged = true;
              this.#boardArr[x - 1][y] = tile;
              x--;
            } else {
              break;
            }
          }
        }
      }
    }
    this.removeMergedFlag();
    if (changed) {
      this.generateRandomTiles();
    }
    console.table(this.#boardArr);
  }

  async moveRight() {
    console.log("Moving right");
    var changed = false;

    for (var col = 0; col < this.size; ++col) {
      for (var row = this.size - 1; row >= 0; --row) {
        if (this.#boardArr[row][col] != 0) {
          var tile = this.#boardArr[row][col];
          var x = row;
          var y = col;
          while (x + 1 < this.size) {
            if (this.#boardArr[x + 1][y] == 0) {
              this.#boardArr[x + 1][y] = tile;
              this.#boardArr[x][y] = 0;
              tile.x = x + 1;
              tile.setX(); // Call updateX() to update the CSS attribute
              changed = true;
              x++;
            } else if (this.#boardArr[x + 1][y].canMerge(tile)) {
              tile.setValue();
              tile.x = x + 1;
              await tile.setX(); // Call updateX() to update the CSS attribute
              changed = true;
              this.#boardArr[x + 1][y].remove();
              this.#boardArr[x][y] = 0;
              tile.merged = true;
              this.#boardArr[x + 1][y] = tile;
              x++;
            } else {
              break;
            }
          }
        }
      }
    }

    this.removeMergedFlag();
    if (changed) {
      this.generateRandomTiles();
    }
    console.table(this.#boardArr);
  }

  async moveUp() {
    console.log("Moving up");
    var changed = false;
    for (var col = 0; col < this.size; ++col) {
      for (var row = 0; row < this.size; ++row) {
        if (this.#boardArr[row][col] != 0) {
          var tile = this.#boardArr[row][col];
          var x = row;
          var y = col;

          while (y > 0) {
            if (this.#boardArr[x][y - 1] == 0) {
              this.#boardArr[x][y - 1] = tile;
              this.#boardArr[x][y] = 0;
              tile.y = y - 1;
              tile.setY(); // Call updateY() to update the CSS attribute
              changed = true;
              y--;
            } else if (this.#boardArr[x][y - 1].canMerge(tile)) {
              tile.setValue();
              tile.y = y - 1;
              await tile.setY(); // Call updateY() to update the CSS attribute
              changed = true;
              this.#boardArr[x][y - 1].remove();
              this.#boardArr[x][y] = 0;
              tile.merged = true;
              this.#boardArr[x][y - 1] = tile;
              y--;
            } else {
              break;
            }
          }
        }
      }
    }
    this.removeMergedFlag();
    if (changed) {
      this.generateRandomTiles();
    }
    console.table(this.#boardArr);
  }

  async moveDown() {
    console.log("Moving down");
    var changed = false;

    for (var col = this.size - 1; col >= 0; --col) {
      for (var row = 0; row < this.size; ++row) {
        if (this.#boardArr[row][col] != 0) {
          var tile = this.#boardArr[row][col];
          var x = row;
          var y = col;

          while (y + 1 < this.size) {
            if (this.#boardArr[x][y + 1] == 0) {
              this.#boardArr[x][y + 1] = tile;
              this.#boardArr[x][y] = 0;
              tile.y = y + 1;
              tile.setY(); // Call updateY() to update the CSS attribute
              changed = true;

              y++;
            } else if (this.#boardArr[x][y + 1].canMerge(tile)) {
              tile.setValue();
              tile.y = y + 1;
              await tile.setY();
              changed = true;

              this.#boardArr[x][y + 1].remove();

              this.#boardArr[x][y] = 0;
              tile.merged = true;
              this.#boardArr[x][y + 1] = tile;

              y++;
            } else {
              break;
            }
          }
        }
      }
    }
    this.removeMergedFlag();
    if (changed) {
      this.generateRandomTiles();
    }
    console.table(this.#boardArr);
  }
}
export default Board;
