export default function Status({ current, onReset }) {
  return (
    <div className="status-bar">
      <div className="status-text">
        תור של{" "}
        <span className={current === "R" ? "r" : "y"}>
          {current === "R" ? "אדום" : "צהוב"}
        </span>
      </div>

      <button className="reset-btn" onClick={onReset}>
        משחק חדש
      </button>
    </div>
  );
}
