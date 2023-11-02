import { useState } from "react";

function Cell() {
  const [isAlive, setIsAlive] = useState(false);

  function handleClick() {
    setIsAlive(true);
  }

  return (
    <>
      <div
        className={`inline-flex w-8 border border-slate-500 select-none ${
          isAlive ? "bg-slate-500" : "bg-white"
        }`}
        onClick={handleClick}
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
        row.push(<Cell />);
      }
      array.push(row);
    }
    return array;
  });

  return (
    <>
      {grid.map((row) => {
        return (
          <div>
            {row.map((isAlive) => {
              return <Cell />;
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
