class Tile {
  size;
  #board;
  x;
  y;
  val;
  background;
  text;
  
  constructor(x, y, val, backgroundColor, textColor) {
    this.size = document.getElementById("gridSizeIn").value;
    this.#board = document.getElementById("board");
    this.val = val;
    this.text = textColor;
    this.x = x;
    this.y = y;

    this.element = document.createElement("div");
    this.element.classList.add("tile");
    this.element.style.setProperty("--x", x);
    this.element.style.setProperty("--y", y);
    this.element.style.setProperty("--background-lightness", backgroundColor);
    this.element.style.setProperty("--text-lightness", textColor);
    this.element.textContent = this.val;

    this.#board.appendChild(this.element);
  }

  setX() {
    this.element.style.setProperty("--x", this.x);
  }

  setY() {
    this.element.style.setProperty("--y", this.y);
  }
  setValue() {
    this.element.textContent = this.val; // Set the text content of the element
  }
  remove() {
    this.element.remove();
  }

  canMerge(tile) {
    if (this.val == tile.val) {
      return true;
    }
    return false;
  }
}

export default Tile;
