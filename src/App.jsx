import "./App.css";
import Game from "./Game";

export default function App() {
  return (
    <div className="app-shell">
      <h1>ארבע בשורה</h1>
      <p>משחק לשני שחקנים</p>
      <p>
        סימון גרפי של רצף הניצחון: הוספת הדגשה ברורה ויזואלית לרביעייה המנצחת
      </p>
      <p>כפתור לאפס את המשחק</p>

      <Game />
    </div>
  );
}
