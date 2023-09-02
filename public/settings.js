// const CANVAS_HEIGHT = 400;
// const CANVAS_WIDTH = 900;

const CELL_LENGTH = 20;

const CANVAS_HEIGHT =
  Math.ceil((window.innerHeight * 0.8) / CELL_LENGTH) * CELL_LENGTH;
const CANVAS_WIDTH =
  Math.ceil((window.innerWidth * 0.96) / CELL_LENGTH) * CELL_LENGTH;

const DELAY = 200;

export { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_LENGTH, DELAY };
