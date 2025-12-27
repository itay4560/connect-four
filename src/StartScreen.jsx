import "./StartScreen.css";

export default function StartScreen({ onStart }) {
  return (
    <div className="start-container">
      <p className="description">
        לחץ על &quot;התחל משחק&quot; כדי להתחיל משחק חדש.
      </p>
      <button className="start-btn" onClick={onStart}>
        התחל משחק
      </button>
    </div>
  );
}
