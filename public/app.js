import Cell from "./cell.js";

const canvas = document.getElementById("canvas");
const indicator = document.getElementById("indicator");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const clearButton = document.getElementById("clear-button");
const runningState = document.getElementById("running-state");

console.log(canvas);
console.log(`(width: ${canvas.clientWidth}, height: ${canvas.clientHeight})`);

const CELL_LENGTH = 20;

const m = canvas.clientWidth / CELL_LENGTH;
const n = canvas.clientHeight / CELL_LENGTH;

let intervalId;

let grid = [...Array(m)].map(() => Array(n));

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    grid[i][j] = new Cell();
  }
}

drawCells(grid);

const copy = [];
for (let i = 0; i < grid.length; i++) {
  const innerArray = [];
  for (let j = 0; j < grid[i].length; j++) {
    innerArray.push(grid[i][j]);
  }
  copy.push(innerArray);
}

startButton.addEventListener("click", () => {
  runningState.innerText = "running";
  intervalId = setInterval(() => {
    createNextGeneration(grid);
    drawCells(grid);
  }, 100);
});

stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
  runningState.innerText = "idle";
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

canvas.addEventListener("mousemove", (event) => {
  indicator.innerText = getMousePosition(event);
});

function drawCells(grid) {
  ctx.strokeStyle = "#bbb";
  for (let j = 0; j < grid[0].length; j++) {
    for (let i = 0; i < grid.length; i++) {
      ctx.beginPath();
      const cell = grid[i][j];
      ctx.rect(
        j * CELL_LENGTH,
        i * CELL_LENGTH,
        j * CELL_LENGTH + CELL_LENGTH,
        i * CELL_LENGTH + CELL_LENGTH
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

function getCellContainingPosition(x, y) {
  const targetTopLeftCornerX = Math.floor(x / CELL_LENGTH) * CELL_LENGTH;
  const targetTopLeftCornerY = Math.floor(y / CELL_LENGTH) * CELL_LENGTH;
  return [targetTopLeftCornerY, targetTopLeftCornerX];
}

function getMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  const x =
    ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
  const y =
    ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
  return [x, y];
}

function countAliveNeighborCells(cells, i, j) {
  const d = [-1, 0, 1];
  let count = 0;
  for (const x of d) {
    for (const y of d) {
      if (x === 0 && y === 0) continue;
      const dx = i + x;
      const dy = j + y;
      const isInvalidPosition = dx < 0 || dx == m || dy < 0 || dy == n;
      if (isInvalidPosition) {
        continue;
      }
      if (cells[dx][dy].isAlive()) {
        count++;
      }
    }
  }
  return count;
}

function createNextGeneration(grid) {
  console.log(copy);

  for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy[i].length; j++) {
      const isAlive = grid[i][j].isAlive();
      const aliveNeighbors = countAliveNeighborCells(grid, i, j);

      copy[i][j] = new Cell();
      copy[i][j].state = grid[i][j].state;

      if (isAlive) {
        if (aliveNeighbors === 2 || aliveNeighbors === 3) {
          // stays alive
        } else {
          copy[i][j].makeDead();
        }
      } else {
        if (aliveNeighbors === 3) {
          copy[i][j].makeAlive();
        } else {
          // stays dead
        }
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j].state = copy[i][j].state;
    }
  }
}
