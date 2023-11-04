import { useState } from "react";

import Grid from "./Grid";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);

  const [grid, setGrid] = useState(() => {
    const array = [];
    for (let i = 0; i < 20; i++) {
      const row = [];
      for (let j = 0; j < 45; j++) {
        row.push(false);
      }
      array.push(row);
    }
    return array;
  });

  return (
    <>
      <Grid isRunning={isRunning} grid={grid} setGrid={setGrid} />
      <button
        type="button"
        onClick={() => {
          setIsRunning(true);
        }}
      >
        start
      </button>
      <button
        type="button"
        onClick={() => {
          setIsRunning(false);
        }}
      >
        pause
      </button>
      <button
        type="button"
        onClick={() => {
          setIsRunning(false);
          setGrid(() => {
            const array = [];
            for (let i = 0; i < grid.length; i++) {
              const row = [];
              for (let j = 0; j < grid[i].length; j++) {
                row.push(false);
              }
              array.push(row);
            }
            return array;
          });
        }}
      >
        reset
      </button>
    </>
  );
}
