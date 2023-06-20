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
  var size = document.getElementById("gridSizeIn").value;
  var board = document.getElementById("board");
  board.style.setProperty("--grid-size", size);

  // Clear existing cells
  board.innerHTML = "";

  // Generate cells dynamically
  for (var i = 0; i < size * size; i++) {
    var cell = document.createElement("div");
    cell.className = "cell";
    board.appendChild(cell);
  }

     var tile = document.createElement("div");
    tile.className = "tile";
    board.appendChild(tile);

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
