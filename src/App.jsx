import { useState } from "react";

function Cell({ isAlive, onCellClick }) {
  // function handleClick() {
  //   setIsAlive(true);
  // }

  return (
    <>
      <div
        className={`inline-flex w-8 border border-slate-500 select-none ${
          isAlive ? "bg-slate-500" : "bg-white"
        }`}
        onClick={onCellClick}
      >
        &nbsp;
      </div>
    </>
  );
}

function Grid() {
  const [grid, setGrid] = useState(() => {
    const array = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(false);
      }
      array.push(row);
    }
    return array;
  });

  function handleClick(i, j) {
    console.log(i, j);
  }

  return (
    <>
      {grid.map((row, i) => {
        return (
          <div>
            {row.map((isAlive, j) => {
              return (
                <Cell isAlive={isAlive} onCellClick={() => handleClick(i, j)} />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default function App() {
  return (
    <>
      <Grid />
    </>
  );
}
