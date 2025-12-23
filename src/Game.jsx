import { useState } from "react";
import Board from "./Board";
import Status from "./Status";

const ROWS = 6;
const COLS = 7;

const createEmptyGrid = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const getWinningCells = (grid) => {
  const dirs = [
    { dr: 0, dc: 1 }, // אופקי
    { dr: 1, dc: 0 }, // אנכי
    { dr: 1, dc: 1 }, // אלכסון \
    { dr: 1, dc: -1 }, // אלכסון /
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const player = grid[r][c];
      if (!player) continue;

      for (const { dr, dc } of dirs) {
        const cells = [{ r, c }];

        for (let k = 1; k < 4; k++) {
          const rr = r + dr * k;
          const cc = c + dc * k;

          if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) break;
          if (grid[rr][cc] !== player) break;

          cells.push({ r: rr, c: cc });
        }

        if (cells.length === 4) return { winner: player, cells };
      }
    }
  }

  return null;
};

export default function Game() {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [current, setCurrent] = useState("R");
  const [winner, setWinner] = useState(null); // "R" / "Y" / null
  const [winningCells, setWinningCells] = useState([]); // מערך של {r, c}

  const drop = (col) => {
    if (winner) return; // אם כבר ניצחו — לא ממשיכים לשחק

    const next = grid.map((row) => [...row]);

    for (let r = ROWS - 1; r >= 0; r -= 1) {
      if (next[r][col] === null) {
        next[r][col] = current;

        // בדיקת ניצחון על הלוח החדש
        const result = getWinningCells(next);
        if (result) {
          setWinner(result.winner);
          setWinningCells(result.cells);
        } else {
          setCurrent(current === "R" ? "Y" : "R");
        }

        setGrid(next);
        break;
      }
    }
  };

  const resetGame = () => {
    setGrid(createEmptyGrid());
    setCurrent("R");
    setWinner(null);
    setWinningCells([]);
  };

  return (
    <div>
      <Status current={current} onReset={resetGame} />
      <Board grid={grid} onDrop={drop} winningCells={winningCells} />
    </div>
  );
}
