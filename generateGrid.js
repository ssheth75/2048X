var board;
var size;

function createBoard(size) {
  var array = new Array(size);

  for (var i = 0; i < size; ++i) {
    array[i] = new Array(size);
    for (var j = 0; j < size; ++j) {
      array[i][j] = 0; // Assign initial value, such as 0, to each board element
    }
  }

  return array;
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");

  if (num > 0) {
    tile.innerText = num;
    if (num < 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

function initGame() {
  size = document.getElementById("gridSizeIn").value;
  board = createBoard(size);

  board[0][0] = 2;
  board[0][1] = 2;
  board[0][2] = 2;
  board[0][3] = 2;
  board[1][0] = 2;
  board[1][1] = 2;
  board[1][2] = 2;
  board[1][3] = 2;
  board[2][0] = 4;
  board[2][1] = 4;
  board[2][2] = 8;
  board[2][3] = 8;
  board[3][0] = 4;
  board[3][1] = 4;
  board[3][2] = 8;
  board[3][3] = 8;

  var boardContainer = document.getElementById("board");

  // Clear existing content of the board
  boardContainer.innerHTML = "";

  // Calculate the size of each tile
  var tileSize = 700 / size;

  // Update CSS grid-template-columns and grid-template-rows
  boardContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  boardContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (var row = 0; row < size; ++row) {
    for (var col = 0; col < size; ++col) {
      let tile = document.createElement("div");
      tile.id = row.toString() + "_" + col.toString();
      tile.className = "tile";
      tile.style.width = tileSize + "px";
      tile.style.height = tileSize + "px";

      let num = board[row][col];

      updateTile(tile, num);
      boardContainer.appendChild(tile);
    }
  }
}

document.addEventListener("keyup", (event) => {
  if (event.code == "ArrowUp") {
    moveUp();
  } else if (event.code == "ArrowDown") {
    moveDown();
  } else if (event.code == "ArrowLeft") {
    moveLeft();
  } else if (event.code == "ArrowRight") {
    moveRight();
  }
});

function clearRowZeroes(row) {
  var t_row = [];
  for (var col = 0; col < size; ++col) {
    if (board[row][col] != 0) {
      t_row.push(board[row][col]);
    }
  }

  console.log(t_row);
  //board[row] = t_row;

}

function moveUp() {}




function moveDown() {}



function moveLeft() {
  for (var row = 0; row < size; ++row) {
    clearRowZeroes(row);
  }

}



function moveRight() {}
