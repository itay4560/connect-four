export default function Status({
  current,
  winner,
  canUndo,
  undoSecondsLeft,
  turnSecondsLeft,
  hintMessage,
  onHint,
  onUndo,
  onReset,
}) {
  const playerText = current === "R" ? "אדום" : "צהוב";
  const playerClass = current === "R" ? "r" : "y";

  let mainText;

  if (winner) {
    const winText = winner === "R" ? "אדום" : "צהוב";
    const winClass = winner === "R" ? "r" : "y";

    mainText = (
      <>
        ניצחון ל <span className={winClass}>{winText}</span>!
      </>
    );
  } else if (canUndo) {
    mainText = (
      <>
        {playerText} – אתה יכול לבטל את המהלך עוד <span>{undoSecondsLeft}</span>{" "}
        שניות
      </>
    );
  } else {
    mainText = (
      <>
        תור של <span className={playerClass}>{playerText}</span> · נשארו{" "}
        {turnSecondsLeft} שניות
      </>
    );
  }

  return (
    <div className="status-bar">
      <div className="status-text">
        {mainText}
        {hintMessage && <div className="hint-text">{hintMessage}</div>}
      </div>

      <div className="status-actions">
        {!winner && (
          <button className="hint-btn" onClick={onHint}>
            רמז
          </button>
        )}
        {canUndo && !winner && (
          <button className="hint-btn" onClick={onUndo}>
            ביטול מהלך
          </button>
        )}
        <button className="hint-btn" onClick={onReset}>
          משחק חדש
        </button>
      </div>
    </div>
  );
}
