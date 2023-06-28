import Tile from "./tile.js";
import Queue from "./queue.js";
import { showGameOver } from "./main.js";

// Structure to store coordinates and to run bfs for checking game over
function coords(x, y) {
  this.x = x;
  this.y = y;
}

// Board class where all game logic and processng is handled
class Board {
  size;
  #board;
  #boardArr;
  breakFlag = false;
  score = 0;
  scoreValue = document.getElementById("scoreValue");

  // setup board and initial game state
  constructor() {
    this.size = document.getElementById("gridSizeIn").value;
    this.#board = document.getElementById("board");
    this.#boardArr = [];

    // Initialize the game score on the screen as 0
    this.updateScore();

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
    console.table(this.#boardArr);
  }

  // Update the score on the screen after each move
  updateScore() {
    this.scoreValue.textContent = this.score;
  }

  // Use BFS to check if there are any possible moves
  checkGameOver() {
    // The directions matrix to move all 4 directions
    var directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    // Create a visited matrix to keep track of visited cells
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

        // Check if the cell is out of bounds
        if (row < 0 || col < 0 || row == this.size || col == this.size) {
          continue;
        }
        // Check if adjacent cells can merge
        if (
          this.#boardArr[curr.x][curr.y].val == this.#boardArr[row][col].val
        ) {
          return false;
        }
        //Push adjacent cells to queue for further searching
        else if (!visited[row][col]) {
          q.push(new coords(row, col));
        }
      }
    }
    // No possible moves can be made if queue is empty
    return true;
  }

  // Logic to generate random tiles on the board after each move
  generateRandomTiles() {
    var openCells = [];
    var numOpenCells = 0;

    // Search for open cells
    for (var r = 0; r < this.size; ++r) {
      for (var c = 0; c < this.size; ++c) {
        if (this.#boardArr[r][c] == 0) {
          openCells.push(new coords(r, c));
          ++numOpenCells;
        }
      }
    }

    // Generate new tile if there are open cells
    if (numOpenCells > 0) {
      var newTileLoc = Math.floor(Math.random() * numOpenCells);

      // Generate either a 2 or 4 tile
      var x = openCells[newTileLoc].x;
      var y = openCells[newTileLoc].y;
      var val = Math.random() < 0.5 ? 2 : 4;
      var background = val == 2 ? "90%" : "85%";
      var text = val == 2 ? "30%" : "20%";

      var tile = new Tile(x, y, val, background, text);
      this.#boardArr[x][y] = tile;
      numOpenCells--;
    }

    // Check if game is over after inserting the new tile
    if (numOpenCells == 0) {
      if (this.checkGameOver()) {
        console.log("Game Over");
        showGameOver(this.score);
        return;
      }
    }
  }

  // After each move remove all merged flags to false for next move processing
  removeMergedFlag() {
    for (var i = 0; i < this.size; ++i) {
      for (var j = 0; j < this.size; ++j) {
        if (this.#boardArr[i][j] != 0) {
          this.#boardArr[i][j].merged = false;
        }
      }
    }
  }

  // Move tiles left on the board
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
            if (this.#boardArr[x - 1][y] == 0) {
              this.#boardArr[x - 1][y] = tile;
              this.#boardArr[x][y] = 0;
              tile.x = x - 1;
              tile.setX(); // Call setX() to update the CSS attribute
              changed = true;
              x--;
            } else if (this.#boardArr[x - 1][y].canMerge(tile)) {
              this.score += tile.setValue();
              console.log(this.score);
              tile.x = x - 1;
              await tile.setX(); // Call setX() to update the CSS attribute
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
    this.updateScore();
    // Only generate new tiles if the board has changed
    if (changed) {
      this.generateRandomTiles();
    }
    console.table(this.#boardArr);
  }

  // Move tiles right on the board
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
              this.score += tile.setValue();
              console.log(this.score);
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
    this.updateScore();

    if (changed) {
      this.generateRandomTiles();
    }
    console.table(this.#boardArr);
  }

  // Move tiles up on the board
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
              this.score += tile.setValue();
              console.log(this.score);
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
    this.updateScore();

    if (changed) {
      this.generateRandomTiles();
    }
    console.table(this.#boardArr);
  }

  // Move tiles down on the board
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
              tile.setY(); // Call setY() to update the CSS attribute
              changed = true;

              y++;
            } else if (this.#boardArr[x][y + 1].canMerge(tile)) {
              this.score += tile.setValue();
              console.log(this.score);
              tile.y = y + 1;
              await tile.setY(); // Call setY() to update the CSS attribute
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
    this.updateScore();

    if (changed) {
      this.generateRandomTiles();
    }
    console.table(this.#boardArr);
  }
}

export default Board;
