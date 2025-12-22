import { useState } from "react";
import Board from "./Board";
import Status from "./Status";

const ROWS = 6;
const COLS = 7;

const createEmptyGrid = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

export default function Game() {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [current, setCurrent] = useState("R");

  const drop = (col) => {
    // יוצרים עותק של הלוח כדי לא לשנות את המקור
    const next = grid.map((row) => [...row]);

    // מחפשים מקום פנוי מלמטה למעלה באותה עמודה
    for (let r = ROWS - 1; r >= 0; r -= 1) {
      if (next[r][col] === null) {
        next[r][col] = current; // שמים אסימון
        setGrid(next); // מעדכנים את הלוח
        setCurrent(current === "R" ? "Y" : "R"); // מחליפים תור
        break;
      }
    }
  };

  const resetGame = () => {
    setGrid(createEmptyGrid());
    setCurrent("R");
  };

  return (
    <div>
      <Status current={current} onReset={resetGame} />
      <Board grid={grid} onDrop={drop} />
    </div>
  );
}
