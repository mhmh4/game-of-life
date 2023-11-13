const canvas = document.getElementById("canvas");

// Canvas colors
const DEAD_CELL_COLOR = "#104f55";
const GRID_LINE_COLOR = "#0d4146";
const LIVE_CELL_COLOR = "#bee5bf";

// const CANVAS_HEIGHT = 400;
// const CANVAS_WIDTH = 900;

const CELL_LENGTH = 20;

const CANVAS_HEIGHT =
  Math.ceil(canvas.clientHeight / CELL_LENGTH) * CELL_LENGTH;
const CANVAS_WIDTH = Math.ceil(canvas.clientWidth / CELL_LENGTH) * CELL_LENGTH;

const DELAY = 200;

export {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CELL_LENGTH,
  DEAD_CELL_COLOR,
  DELAY,
  GRID_LINE_COLOR,
  LIVE_CELL_COLOR,
};
