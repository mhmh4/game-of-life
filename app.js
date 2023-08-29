class Cell {
  topLeftPosition;
  bottomRightPosition;
  state;

  constructor(topLeftPosition, bottomRightPosition) {
    this.topLeftPosition = topLeftPosition;
    this.bottomRightPosition = bottomRightPosition;
    this.state = 0;
  }

  toggle = () => (this.state = this.state ? 0 : 1);
  isAlive = () => this.state === 1;
}

const canvas = document.getElementById("canvas");
const indicator = document.getElementById("indicator");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");

console.log(canvas);
console.log("width: " + canvas.clientWidth);
console.log("height: " + canvas.clientHeight);

const CELL_LENGTH = 25;
const cells = [];

const map = new Map();

startButton.addEventListener("click", (event) => {
  event.preventDefault();
});

function drawCells(cells) {
  ctx.strokeStyle = "#bbb";
  for (const cell of cells) {
    ctx.beginPath();
    ctx.rect(
      cell.topLeftPosition[0],
      cell.topLeftPosition[1],
      cell.bottomRightPosition[0],
      cell.bottomRightPosition[1]
    );
    if (cell.isAlive()) {
      ctx.fillStyle = "#bbb";
      ctx.fill();
    } else {
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "#bbb";
      ctx.stroke();
      // ctx.stroke();
    }
  }
}

for (let i = 0; i < canvas.clientWidth; i += CELL_LENGTH) {
  for (let j = 0; j < canvas.clientHeight; j += CELL_LENGTH) {
    ctx.beginPath();
    ctx.rect(i, j, i + CELL_LENGTH, j + CELL_LENGTH);
    const c = new Cell([i, j], [i + CELL_LENGTH, j + CELL_LENGTH]);
    // const key = [i, j];
    map.set(`${i}-${j}`, c);
    cells.push(c);
    // ctx.stroke();
  }
}

drawCells(cells);

function getCellContainingPosition(x, y) {
  const targetTopLeftCornerX = Math.floor(x / CELL_LENGTH) * CELL_LENGTH;
  const targetTopLeftCornerY = Math.floor(y / CELL_LENGTH) * CELL_LENGTH;
  return [targetTopLeftCornerX, targetTopLeftCornerY];
}

function getMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  const x =
    ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
  const y =
    ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
  return [x, y];
}

canvas.addEventListener("click", (event) => {
  // const rect = canvas.getBoundingClientRect();
  // console.log(
  //   `clicked canvas at (${
  //     ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
  //   }, ${
  //     ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
  //   })`
  // );
  const [x, y] = getMousePosition(event);
  console.log("clicked canvas at " + x + " " + y);
  const [a, b] = getCellContainingPosition(x, y);
  // const k = [a, b];
  // console.log([a, b]);
  // console.log(map.get(`${a}-${b}`));
  const c = map.get(`${a}-${b}`);
  console.log("clicked: " + c);
  c.toggle();
  drawCells(cells);
});

// canvas.addEventListener("mousedown", (event) => {
//   const [x, y] = getMousePosition(event);
//   console.log("clicked canvas at " + x + " " + y);
//   const [a, b] = getCellContainingPosition(x, y);
//   // const k = [a, b];
//   // console.log([a, b]);
//   // console.log(map.get(`${a}-${b}`));
//   const c = map.get(`${a}-${b}`);
//   console.log("clicked: " + c);
//   c.toggle();
//   drawCells(cells);
// });

canvas.addEventListener("mousemove", (event) => {
  indicator.innerText = getMousePosition(event);
});

console.log(Cell);
