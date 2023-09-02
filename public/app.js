import Cell from "./cell.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_LENGTH, DELAY } from "./settings.js";

const canvas = document.getElementById("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");

const runningState = document.getElementById("running-state");

const mouseIndicator = document.getElementById("mouse-indicator");
const generationIndicator = document.getElementById("generation-indicator");

console.log(canvas);
console.log(`(width: ${canvas.clientWidth}, height: ${canvas.clientHeight})`);

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

let copy = [...Array(m)].map(() => Array(n));

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    copy[i][j] = new Cell();
  }
}

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  runningState.innerText = "running";
  intervalId = setInterval(() => {
    createNextGeneration(grid);
    let aliveCount = countAliveCells(grid);
    console.log(aliveCount);
    drawCells(grid);
    generationIndicator.innerText = parseInt(generationIndicator.innerText) + 1;
  }, DELAY);
});

pauseButton.addEventListener("click", () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  runningState.innerText = "idle";
});

resetButton.addEventListener("click", () => {
  pauseButton.click();
  generationIndicator.innerText = "0";
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

    const [a, b] = indicesOfCellContainingPosition(x, y);
    let c = grid[a][b];

    c.makeAlive();
    drawCells(grid);
  }
});

canvas.addEventListener("mousemove", (event) => {
  mouseIndicator.innerText = getMousePosition(event);
});

function drawCells(grid) {
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      ctx.beginPath();
      const cell = grid[i][j];
      ctx.rect(
        i * CELL_LENGTH,
        j * CELL_LENGTH,
        i * CELL_LENGTH + CELL_LENGTH,
        j * CELL_LENGTH + CELL_LENGTH
      );
      if (cell.isAlive()) {
        ctx.fillStyle = "#65743A";
        ctx.fill();
      } else {
        ctx.fillStyle = "#2A3C24";
        ctx.fill();
        ctx.strokeStyle = "#243010";
        ctx.stroke();
      }
    }
  }
}

function indicesOfCellContainingPosition(x, y) {
  return [Math.floor(x / CELL_LENGTH), Math.floor(y / CELL_LENGTH)];
}

function getMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(
    ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
  );
  const y = Math.floor(
    ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
  );
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

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const isAlive = grid[i][j].isAlive();
      const aliveNeighbors = countAliveNeighborCells(grid, i, j);

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

function countAliveCells(grid) {
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j].isAlive()) {
        count++;
      }
    }
  }
  return count;
}
