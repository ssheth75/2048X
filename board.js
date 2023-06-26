import Tile from "./tile.js";

function waitForTransitionEnd(element) {
  return new Promise((resolve) => {
    const listener = () => {
      resolve();
    };
    element.addEventListener("animationend", listener, { once: true });

    // Set a timeout as a fallback to ensure the Promise resolves even if the animationend event doesn't fire
    setTimeout(() => {
      resolve();
    }, getAnimationDuration(element) * 1000); // Adjust the delay based on the animation duration
  });
}

function getAnimationDuration(element) {
  const styles = window.getComputedStyle(element);
  const duration = parseFloat(styles.animationDuration) || 0;
  const delay = parseFloat(styles.animationDelay) || 0;
  return duration + delay;
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

    // for (var i = 0; i < numToGenerate; i++) {
    // var x = Math.floor(Math.random() * this.size);
    // var y = Math.floor(Math.random() * this.size);
    // var val = Math.random() < 0.5 ? 2 : 4;

    // var background = val == 2 ? "80%" : "65%";
    // var text = val == 2 ? "30%" : "20%";

    var tile = new Tile(0, 0, 2, "80%", "20%");
    var tile2 = new Tile(1, 0, 2, "80%", "20%");
    var tile3 = new Tile(2, 0, 2, "80%", "20%");
    var tile4 = new Tile(3, 0, 2, "80%", "20%");

    this.#boardArr[0][0] = tile;
    this.#boardArr[1][0] = tile2;
    this.#boardArr[2][0] = tile3;
    this.#boardArr[3][0] = tile4;

    // if (this.#boardArr[x][y] == 0) this.#boardArr[x][y] = tile;
    // else i--;
    //}
    console.table(this.#boardArr);
  }

  generateRandomTiles() {
    while (true) {
      var x = Math.floor(Math.random() * this.size);
      var y = Math.floor(Math.random() * this.size);
      var val = Math.random() < 0.5 ? 2 : 4;

      var background = val == 2 ? "80%" : "65%";
      var text = val == 2 ? "30%" : "20%";

      var tile = new Tile(x, y, 2, background, text);
      if (this.#boardArr[x][y] == 0) {
        this.#boardArr[x][y] = tile;
        break;
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
    for (var i = 0; i < this.size; ++i) {
      for (var j = 0; j < this.size; ++j) {
        if (this.#boardArr[i][j] != 0) {
          var tile = this.#boardArr[i][j];
          var x = i;
          var y = j;
          // ...
          this.breakFlag = false;
          while (x > 0) {
            // this.slide(tile, x, y, x - 1, y, "horizontal");
            if (this.#boardArr[x - 1][y] == 0) {
              this.#boardArr[x - 1][y] = tile;
              this.#boardArr[x][y] = 0;
              tile.x = x - 1;
              tile.setX(); // Call updateX() to update the CSS attribute
              x--;
            } else if (this.#boardArr[x - 1][y].canMerge(tile)) {
              tile.setValue();

              // Remove the tile from the board on screen

              tile.x = x - 1;
              await tile.setX(); // Call updateX() to update the CSS attribute

              this.#boardArr[x][y] = 0;
              this.#boardArr[x - 1][y].remove();
              this.#boardArr[x - 1][y] = tile;
              x--;
            } else {
              break;
            }
            // if (this.breakFlag) {
            //   this.breakFlag = false;
            //   break;
            // }
            // else x--;
          }
        }
      }
    }
    console.table(this.#boardArr);
    this.generateRandomTiles();
  }

  async moveRight() {
    console.log("Moving right");
    // for (var i = this.size - 1; i >= 0; --i) {
    //   for (var j = this.size - 1; j >= 0; --j) {
    //     if (this.#boardArr[i][j] != 0) {
    //       var tile = this.#boardArr[i][j];
    //       var x = i;
    //       var y = j;
    //       // ...
    //       this.breakFlag = false;

    //       while (x < this.size - 1) {
    //         if (this.#boardArr[x + 1][y] == 0) {
    //           this.#boardArr[x + 1][y] = tile;
    //           this.#boardArr[x][y] = 0;
    //           tile.x = x + 1;
    //           tile.setX(); // Call updateX() to update the CSS attribute
    //           x++;
    //         } else if (this.#boardArr[x + 1][y].canMerge(tile)) {
    //           tile.setValue();

    //           // Remove the tile from the board on screen

    //           tile.x = x + 1;
    //           await tile.setX(); // Call updateX() to update the CSS attribute

    //           // I want to wait for the transition to end before removing the tile from the board
    //           // Pause until the transition ends
    //           this.#boardArr[x][y] = 0;

    //           this.#boardArr[x + 1][y].remove();
    //           this.#boardArr[x + 1][y] = tile;

    //           x++;
    //         } else {
    //           break;
    //         }
    //         // this.slide(tile, x, y, x + 1, y, "horizontal");
    //         // if (this.breakFlag) {
    //         //   this.breakFlag = false;
    //         //   break;
    //         // }
    //         // else x++;
    //       }
    //     }
    //   }
    // }

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
              x++;
            } else if (this.#boardArr[x + 1][y].canMerge(tile)) {
              tile.setValue();
              tile.x = x + 1;
              await tile.setX(); // Call updateX() to update the CSS attribute
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
    console.table(this.#boardArr);
    this.generateRandomTiles();
  }

  async moveUp() {
    console.log("Moving up");
    for (var i = 0; i < this.size; ++i) {
      for (var j = 0; j < this.size; ++j) {
        if (this.#boardArr[i][j] != 0) {
          var tile = this.#boardArr[i][j];
          var x = i;
          var y = j;
          this.breakFlag = false;

          while (y > 0) {
            if (this.#boardArr[x][y - 1] == 0) {
              this.#boardArr[x][y - 1] = tile;
              this.#boardArr[x][y] = 0;
              tile.y = y - 1;
              tile.setY(); // Call updateY() to update the CSS attribute
              y--;
            } else if (this.#boardArr[x][y - 1].canMerge(tile)) {
              tile.setValue();

              tile.y = y - 1;

              await tile.setY(); // Call updateY() to update the CSS attribute
              this.#boardArr[x][y] = 0;

              this.#boardArr[x][y - 1].remove();
              this.#boardArr[x][y - 1] = tile;

              y--;
            } else {
              break;
            }
            // this.slide(tile, x, y, x, y - 1, "vertical");
            // if (this.breakFlag) {
            //   this.breakFlag = false;
            //   break;
            // } else y--;
          }
        }
      }
    }
    console.log(this.#boardArr);
    this.generateRandomTiles();
  }

  async moveDown() {
    console.log("Moving down");
    for (var i = 0; i < this.size; ++i) {
      for (var j = this.size - 1; j >= 0; --j) {
        if (this.#boardArr[i][j] != 0) {
          var tile = this.#boardArr[i][j];
          var x = i;
          var y = j;
          this.breakFlag = false;

          while (y < this.size - 1) {
            if (this.#boardArr[x][y + 1] == 0) {
              this.#boardArr[x][y + 1] = tile;
              this.#boardArr[x][y] = 0;
              tile.y = y + 1;
              tile.setY(); // Call updateY() to update the CSS attribute
              y++;
            } else if (this.#boardArr[x][y + 1].canMerge(tile)) {
              tile.setValue();

              tile.y = y + 1;
              await tile.setY();

              this.#boardArr[x][y] = 0;

              this.#boardArr[x][y + 1].remove();
              this.#boardArr[x][y + 1] = tile;

              y++;
            } else {
              break;
            }
            // this.slide(tile, x, y, x, y + 1, "vertical");
            // if (this.breakFlag) {
            //   this.breakFlag = false;
            //   break;
            // } else y++;
          }
        }
      }
    }
    console.table(this.#boardArr);
    this.generateRandomTiles();
  }

  slide(tile, x, y, newX, newY, direction) {
    if (this.#boardArr[newX][newY] == 0) {
      this.#boardArr[newX][newY] = tile;
      this.#boardArr[x][y] = 0;
      if (direction == "horizontal") {
        tile.x = newX;
        tile.setX();
      } else if (direction == "vertical") {
        tile.y = newY;
        tile.setY();
      }
    } else if (this.#boardArr[newX][newY].canMerge(tile)) {
      tile.setValue();
      this.#boardArr[x][y] = 0;
      if (direction == "horizontal") {
        tile.x = newX;
        tile.setX();
      } else if (direction == "vertical") {
        tile.y = newY;
        tile.setY();
      }

      const removePromise = new Promise((resolve) => {
        waitForTransitionToEnd(tile.element).then(() => {
          this.#boardArr[newX][newY].remove();
          resolve();
        });
      });
      removePromise.then(() => {
        this.#boardArr[newX][newY] = tile;
        // --x;
      });
    } else {
      this.breakFlag = true;
    }
  }
}
export default Board;
