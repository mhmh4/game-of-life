// class Cell_ {
//   // i and j refers to its position in a 2d array, not the actual position on the canvas
//   i;
//   j;
//   // 0 denotes dead, 1 denotes alive
//   state;
// }

class Cell {
  topLeftPosition;
  bottomRightPosition;
  state;

  constructor(topLeftPosition, bottomRightPosition) {
    this.topLeftPosition = topLeftPosition;
    this.bottomRightPosition = bottomRightPosition;
    this.state = 0;
  }

  makeAlive = () => (this.state = 1);
  toggle = () => (this.state = this.state ? 0 : 1);
  isAlive = () => this.state === 1;
}

export default Cell;
