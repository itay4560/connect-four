import "./App.css";
import Board from "./Board";

export default function App() {
  return (
    <div className="app-shell">
      <div className="app-glow" aria-hidden />
      <div className="content">
        <header className="app-header">
          <p className="eyebrow">Connect Four</p>
          <h1>Board refreshed with clean, modern lines</h1>
          <p className="subtitle">
            A soft gradient, glassy frame, and crisp slots make the classic grid feel
            contemporary without losing its playful character.
          </p>
        </header>
        <Board />
      </div>
    </div>
  );
}
