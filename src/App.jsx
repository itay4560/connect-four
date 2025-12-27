import { useState } from "react";
import "./App.css";
import Game from "./Game";
import StartScreen from "./StartScreen";

export default function App() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  const handleBackToStart = () => {
    // חוזרים למסך ההתחלה
    setStarted(false);
  };

  return (
    <div className="app-shell">
      <h1 className="title">ארבע בשורה</h1>
      <p className="subtitle">משחק לשני שחקנים</p>

      {!started ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <Game onBackToStart={handleBackToStart} />
      )}
    </div>
  );
}
