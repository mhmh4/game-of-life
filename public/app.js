import Cell from "./cell.js";

const canvas = document.getElementById("canvas");
const indicator = document.getElementById("indicator");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const clearButton = document.getElementById("clear-button");

console.log(canvas);
console.log(`(width: ${canvas.clientWidth}, height: ${canvas.clientHeight})`);

const CELL_LENGTH = 20;

const m = canvas.clientWidth / CELL_LENGTH;
const n = canvas.clientHeight / CELL_LENGTH;

let grid = [...Array(m)].map(() => Array(n));

let intervalId;

startButton.addEventListener("click", () => {
  intervalId = setInterval(() => {
    grid = createNextGeneration(grid);
    drawCells(grid);
  }, 100);
});

stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
});

clearButton.addEventListener("click", () => {
  stopButton.click();
  drawCells(grid);
  for (const row of grid) {
    for (const cell of row) {
      cell.makeDead();
    }
  }
  drawCells(grid);
});

function drawCells(grid) {
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
      }
    }
  }
}

for (let i = 0; i < canvas.clientWidth; i += CELL_LENGTH) {
  for (let j = 0; j < canvas.clientHeight; j += CELL_LENGTH) {
    ctx.beginPath();
    ctx.rect(i, j, i + CELL_LENGTH, j + CELL_LENGTH);
    const c = new Cell([i, j], [i + CELL_LENGTH, j + CELL_LENGTH]);
    grid[i / CELL_LENGTH][j / CELL_LENGTH] = c;
  }
}

drawCells(grid);

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

canvas.addEventListener("mousemove", (event) => {
  if (event.buttons == 1) {
    const [x, y] = getMousePosition(event);
    console.log("clicked canvas at " + x + " " + y);

    const [a, b] = getCellContainingPosition(x, y);
    let c = grid[a / CELL_LENGTH][b / CELL_LENGTH];

    // c.toggle();
    c.makeAlive();
    drawCells(grid);
  }
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
      if (cells[dx][dy].isAlive()) {
        count++;
      }
    }
  }
  return count;
}

const copy = [];

for (let i = 0; i < grid.length; i++) {
  const innerArray = [];
  for (let j = 0; j < grid[i].length; j++) {
    innerArray.push(grid[i][j]);
  }
  copy.push(innerArray);
}

function createNextGeneration(grid) {
  console.log(copy);

  for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy[i].length; j++) {
      const alive = grid[i][j].isAlive();

      const aliveNeighbors = countAliveNeighborCells(grid, i, j);
      const has2AliveNeighbors = aliveNeighbors === 2;
      const has3AliveNeighbors = aliveNeighbors === 3;

      if (alive && !(has2AliveNeighbors || has3AliveNeighbors)) {
        copy[i][j].toggle();
      } else if (!alive && has3AliveNeighbors) {
        copy[i][j].toggle();
      }
    }
  }

  // grid = Array.apply(null, copy);
  return copy;
}

canvas.addEventListener("mousemove", (event) => {
  indicator.innerText = getMousePosition(event);
});

function main() {}

main();
