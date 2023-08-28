const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

console.log(canvas);
console.log("width: " + canvas.clientWidth);
console.log("height: " + canvas.clientHeight);

const CELL_LENGTH = 10;

ctx.rect(0, 0, CELL_LENGTH, CELL_LENGTH);
ctx.stroke();
