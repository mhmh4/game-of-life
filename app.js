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

const m = canvas.clientWidth / CELL_LENGTH;
const n = canvas.clientHeight / CELL_LENGTH;

const grid = [...Array(m)].map(() => Array(n));

const map = new Map();

startButton.addEventListener("click", (event) => {
  event.preventDefault();
});

function drawCells(cells) {
  ctx.strokeStyle = "#bbb";
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      ctx.beginPath();
      const cell = grid[i][j];
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
  // for (const cell of cells) {
  //   ctx.beginPath();
  //   ctx.rect(
  //     cell.topLeftPosition[0],
  //     cell.topLeftPosition[1],
  //     cell.bottomRightPosition[0],
  //     cell.bottomRightPosition[1]
  //   );
  //   if (cell.isAlive()) {
  //     ctx.fillStyle = "#bbb";
  //     ctx.fill();
  //   } else {
  //     ctx.fillStyle = "#fff";
  //     ctx.fill();
  //     ctx.strokeStyle = "#bbb";
  //     ctx.stroke();
  //     // ctx.stroke();
  //   }
  // }
}

for (let i = 0; i < canvas.clientWidth; i += CELL_LENGTH) {
  for (let j = 0; j < canvas.clientHeight; j += CELL_LENGTH) {
    ctx.beginPath();
    ctx.rect(i, j, i + CELL_LENGTH, j + CELL_LENGTH);
    const c = new Cell([i, j], [i + CELL_LENGTH, j + CELL_LENGTH]);
    grid[i / CELL_LENGTH][j / CELL_LENGTH] = c;
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

function countAliveNeighborCells(cells, i, j) {
  const d = [-1, 0, 1];
  let count = 0;
  for (const x of d) {
    for (const y of d) {
      if (x === 0 && y === 0) continue;
      const dx = i + x;
      const dy = j + y;
      if (!(0 <= dx && dx < m && 0 <= dy && dy < n)) {
        continue;
      }
      if (cells[i][j].isAlive()) {
        count++;
      }
    }
  }
  return count;
}

function createNextGeneration(cells) {
  const copy = [];

  for (let i = 0; i < cells.length; i++) {
    const innerArray = [];
    for (let j = 0; j < cells[i].length; j++) {
      cells.push(cells[i][j]);
    }
    copy.push(innerArray);
  }

  console.log(copy);

  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      const aliveNeighbors = countAliveNeighborCells(cells, i, j);
      console.log(aliveNeighbors);
    }
  }

  return copy;
}

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

createNextGeneration(cells);
