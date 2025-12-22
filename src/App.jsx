import "./App.css";
import Game from "./Game";

export default function App() {
  return (
    <div className="app-shell">
      <h1>ארבע בשורה</h1>
      <p>
        משחק לשני שחקנים. (בהמשך פה נכתוב גם את התוספות שמימשנו – לפי דרישת
        המטלה)
      </p>

      <Game />
    </div>
  );
}
