import "./Board.css";

export default function Board() {
  const rows = 6;
  const cols = 7;

  const cells = [];
  for (let i = 0; i < rows * cols; i++) {
    cells.push(i);
  }

  return (
    <div className="board-card">
      <div className="board-top-bar">
        <span className="title">Gravity Grid</span>
        <span className="pill">Ready to drop</span>
      </div>
      <div className="board-frame">
        <div className="board-grid">
          {cells.map((cell) => (
            <div key={cell} className="board-cell" />
          ))}
        </div>
      </div>
      <div className="board-base" />
    </div>
  );
}
