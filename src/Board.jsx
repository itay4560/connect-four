import "./Board.css";

export default function Board({ grid, onDrop }) {
  return (
    <div className="board">
      {grid.map((row, r) => (
        <div className="row" key={r}>
          {row.map((cell, c) => (
            <button
              key={c}
              className="cell"
              onClick={() => onDrop(c)}
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
    </div>
  );
}
