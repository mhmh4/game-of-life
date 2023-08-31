class Cell {
  state;

  constructor() {
    this.state = 0;
  }

  makeAlive = () => (this.state = 1);
  makeDead = () => (this.state = 0);
  isAlive = () => this.state === 1;
}

export default Cell;
