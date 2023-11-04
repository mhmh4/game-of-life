import { useEffect } from "react";

import Cell from "./Cell";

export default function Grid({ isRunning, grid, setGrid }) {
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
      setGrid((curGrid) => {
        const newGrid = structuredClone(curGrid);
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[i].length; j++) {
            const aliveNeighbors = countAliveNeighbors(i, j);
            const isAlive = grid[i][j];
            console.log(i, j, aliveNeighbors);
            if (isAlive) {
              if (aliveNeighbors === 2 || aliveNeighbors == 3) {
                newGrid[i][j] = true;
              } else {
                newGrid[i][j] = false;
              }
            } else {
              if (aliveNeighbors === 3) {
                newGrid[i][j] = true;
              } else {
                newGrid[i][j] = false;
              }
            }
          }
        }

        return newGrid;
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [grid, isRunning]);

  return (
    <>
      {grid.map((row, i) => {
        return (
          <div key={i} className="flex">
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
