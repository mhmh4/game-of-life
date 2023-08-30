class Cell {
  state;

  constructor() {
    this.state = 0;
  }

  makeAlive = () => (this.state = 1);
  makeDead = () => (this.state = 0);
  toggle = () => (this.state = this.state ? 0 : 1);
  isAlive = () => this.state === 1;
}

export default Cell;
