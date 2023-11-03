import { useEffect, useState } from "react";

function Cell({ isAlive, onCellClick }) {
  // function handleClick() {
  //   setIsAlive(true);
  // }

  return (
    <>
      <div
        className={`inline-flex w-8 border border-slate-500 select-none ${
          isAlive ? "bg-slate-500" : "bg-white hover:bg-slate-200"
        }`}
        onClick={onCellClick}
      >
        &nbsp;
      </div>
    </>
  );
}

function Grid() {
  const [isRunning, setIsRunning] = useState(false);

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

  function isValidIndex(i, j) {
    return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length;
  }

  function countAliveNeighbors(i, j) {
    let count = 0;

    for (const x of [-1, 0, 1]) {
      for (const y of [-1, 0, 1]) {
        if (x === 0 && y === 0) {
          continue;
        }
        const neighborI = i + x;
        const neighborJ = j + y;
        if (!isValidIndex(neighborI, neighborJ)) {
          continue;
        }
        if (grid[neighborI][neighborJ]) {
          count++;
        }
      }
    }

    return count;
  }

  function handleClick(i, j) {
    setGrid((curGrid) => {
      const newGrid = structuredClone(curGrid);
      newGrid[i][j] = true;
      return newGrid;
    });
  }

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          const aliveNeighbors = countAliveNeighbors(i, j);
          console.log(i, j, aliveNeighbors);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [grid, isRunning]);

  return (
    <>
      {grid.map((row, i) => {
        return (
          <div key={i}>
            {row.map((isAlive, j) => {
              return (
                <Cell
                  key={j}
                  isAlive={isAlive}
                  onCellClick={() => handleClick(i, j)}
                />
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
