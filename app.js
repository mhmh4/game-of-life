const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

console.log(canvas);
console.log("width: " + canvas.clientWidth);
console.log("height: " + canvas.clientHeight);

const CELL_LENGTH = 25;

ctx.strokeStyle = "#bbb";

for (let i = 0; i < canvas.clientWidth; i += CELL_LENGTH) {
  for (let j = 0; j < canvas.clientHeight; j += CELL_LENGTH) {
    ctx.beginPath();
    ctx.rect(i, j, CELL_LENGTH, CELL_LENGTH);
    ctx.stroke();
  }
}

function getCellContainingPosition(x, y) {}

function getMouseClickPosition(event) {
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
  console.log("clicked canvas at " + getMouseClickPosition(event));
});
