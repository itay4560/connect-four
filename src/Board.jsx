import "./Board.css";

export default function Board({ grid, onDrop, winningCells, lastMove }) {
  return (
    <div className="board">
      {grid.map((row, r) => (
        <div className="row" key={r}>
          {row.map((cell, c) => {
            const isWin = winningCells?.some((p) => p.r === r && p.c === c);

            const isLast = lastMove && lastMove.r === r && lastMove.c === c;

            return (
              <button
                key={c}
                className="cell"
                onClick={() => onDrop(c)}
                aria-label={`column ${c + 1}`}
              >
                <span
                  className={`disc ${
                    cell === "R" ? "red" : cell === "Y" ? "yellow" : ""
                  } ${isWin ? "win" : ""} ${isLast ? "dropped" : ""}`}
                />
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
