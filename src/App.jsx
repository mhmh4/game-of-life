import { useState } from "react";

function Cell() {
  const [isAlive, setIsAlive] = useState(false);

  return (
    <>
      <span>cell</span>
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
        return <div>{row}</div>;
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
