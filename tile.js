class Tile {
  size;
  #board;
  x;
  y;
  val;


  constructor(x, y) {
    this.size = document.getElementById("gridSizeIn").value;
    this.#board = document.getElementById("board");
    // set css text to its value
    this.text = 5;
    this.element = document.createElement("div");
    this.element.classList.add("tile");
    this.element.style.setProperty("--x", x);
    this.element.style.setProperty("--y", y);
    this.#board.appendChild(this.element);

  }

  set x(xVal) {
    this.element.style.setProperty("--x", xVal);
  }

  set y(yVal) {
    this.element.style.setProperty("--y", yVal);
  }
}
export default Tile;
