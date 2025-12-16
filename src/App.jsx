import "./App.css";
import Board from "./Board";

export default function App() {
  return (
    <div className="app-shell">
      <div className="app-glow" aria-hidden />
      <div className="content">
        <header className="app-header">
          <p className="eyebrow">adar test</p>
          <h1>Board refreshed with clean, modern lines</h1>
          <p className="subtitle">text</p>
        </header>
        <Board />
      </div>
    </div>
  );
}
