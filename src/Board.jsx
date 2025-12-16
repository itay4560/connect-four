import { useState } from "react";
import "./Board.css";

const ROWS = 6;
const COLS = 7;

export default function Board() {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );
  const [current, setCurrent] = useState("R");

  const drop = (col) => {
    const next = grid.map((row) => [...row]);
    for (let r = ROWS - 1; r >= 0; r -= 1) {
      if (!next[r][col]) {
        next[r][col] = current;
        setGrid(next);
        setCurrent(current === "R" ? "Y" : "R");
        break;
      }
    }
  };

  return (
    <div className="board">
      {grid.map((row, r) => (
        <div className="row" key={r}>
          {row.map((cell, c) => (
            <button
              key={c}
              className="cell"
              onClick={() => drop(c)}
              aria-label={`column ${c + 1}`}
            >
              <span
                className={`disc ${
                  cell === "R" ? "red" : cell === "Y" ? "yellow" : ""
                }`}
              />
            </button>
          ))}
        </div>
      ))}
      <div className="status">תור של {current === "R" ? "אדום" : "צהוב"}</div>
    </div>
  );
}
