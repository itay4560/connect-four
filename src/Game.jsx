import { useState, useEffect } from "react";
import Board from "./Board";
import Status from "./Status";

const ROWS = 6;
const COLS = 7;

const createEmptyGrid = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

// מחפשת רביעייה מנצחת ומחזירה מי ניצח + איזה תאים
const getWinningCells = (grid) => {
  const dirs = [
    { dr: 0, dc: 1 }, // אופקי
    { dr: 1, dc: 0 }, // אנכי
    { dr: 1, dc: 1 }, // אלכסון \
    { dr: 1, dc: -1 }, // אלכסון /
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const player = grid[r][c];
      if (!player) continue;

      for (const { dr, dc } of dirs) {
        const cells = [{ r, c }];

        for (let k = 1; k < 4; k++) {
          const rr = r + dr * k;
          const cc = c + dc * k;

          if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) break;
          if (grid[rr][cc] !== player) break;

          cells.push({ r: rr, c: cc });
        }

        if (cells.length === 4) return { winner: player, cells };
      }
    }
  }

  return null;
};

// בודקת האם לשחקן מסוים יש מהלך שמביא לניצחון מידי
const hasWinningMove = (grid, player) => {
  for (let col = 0; col < COLS; col++) {
    const temp = grid.map((row) => [...row]);

    let targetRow = -1;
    for (let r = ROWS - 1; r >= 0; r -= 1) {
      if (temp[r][col] === null) {
        targetRow = r;
        break;
      }
    }
    if (targetRow === -1) continue;

    temp[targetRow][col] = player;

    const result = getWinningCells(temp);
    if (result && result.winner === player) {
      return true;
    }
  }

  return false;
};

export default function Game({ onBackToStart }) {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [current, setCurrent] = useState("R");
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);

  // מהלך אחרון (להדגשה + אנימציית נפילה)
  const [lastMove, setLastMove] = useState(null);

  // UNDO
  const [canUndo, setCanUndo] = useState(false);
  const [undoSecondsLeft, setUndoSecondsLeft] = useState(0);

  // טיימר תור (10 שניות)
  const [turnSecondsLeft, setTurnSecondsLeft] = useState(10);

  // הודעת רמז
  const [hintMessage, setHintMessage] = useState("");

  const drop = (col) => {
    // אם יש כבר מנצח – המשחק נעול
    if (winner) return;

    // בזמן חלון UNDO – אסור לשחק (מחכים שיחליט אם לבטל)
    if (canUndo) return;

    const next = grid.map((row) => [...row]);

    for (let r = ROWS - 1; r >= 0; r -= 1) {
      if (next[r][col] === null) {
        next[r][col] = current;

        setLastMove({ r, c: col });
        setHintMessage("");

        const result = getWinningCells(next);

        if (result) {
          setWinner(result.winner);
          setWinningCells(result.cells);
          setCanUndo(false);
          setUndoSecondsLeft(0);
          setLastMove(null);
          setTurnSecondsLeft(0);
        } else {
          setCanUndo(true);
          setUndoSecondsLeft(5);
        }

        setGrid(next);
        break;
      }
    }
  };

  // ⏱️ טיימר ל־UNDO – יורד מ־5 עד 0
  useEffect(() => {
    if (!canUndo) return;

    if (undoSecondsLeft <= 0) {
      setCanUndo(false);
      setLastMove(null);
      setUndoSecondsLeft(0);
      setCurrent((prev) => (prev === "R" ? "Y" : "R"));
      setTurnSecondsLeft(10);
      return;
    }

    const id = setTimeout(() => {
      setUndoSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [canUndo, undoSecondsLeft]);

  // ⏱️ טיימר תור – 10 שניות לכל תור
  useEffect(() => {
    if (winner) return;
    if (canUndo) return;

    if (turnSecondsLeft <= 0) {
      setCurrent((prev) => (prev === "R" ? "Y" : "R"));
      setTurnSecondsLeft(10);
      setHintMessage("");
      return;
    }

    const id = setTimeout(() => {
      setTurnSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [turnSecondsLeft, winner, canUndo]);

  // כאן במקום לאפס את המשחק בפנים — מחזירים למסך ההתחלה
  const resetGame = () => {
    if (typeof onBackToStart === "function") {
      onBackToStart(); // App יחזיר אותנו למסך "התחל משחק"
    }
  };

  const handleUndo = () => {
    if (!canUndo || !lastMove || winner) return;

    const next = grid.map((row) => [...row]);
    const { r, c } = lastMove;

    next[r][c] = null;

    setGrid(next);
    setCanUndo(false);
    setUndoSecondsLeft(0);
    setLastMove(null);
    setTurnSecondsLeft(10);
    setHintMessage("");
  };

  const handleHint = () => {
    if (winner) return;

    if (canUndo) {
      setHintMessage("קודם תחליט אם לבטל את המהלך האחרון.");
      return;
    }

    const hasWin = hasWinningMove(grid, current);

    if (hasWin) {
      setHintMessage("יש לך אפשרות לניצחון במהלך הנוכחי!");
    } else {
      setHintMessage("אין לך כרגע מהלך שמבטיח ניצחון מידי.");
    }
  };

  return (
    <div>
      <Status
        current={current}
        winner={winner}
        canUndo={canUndo}
        undoSecondsLeft={undoSecondsLeft}
        turnSecondsLeft={turnSecondsLeft}
        hintMessage={hintMessage}
        onHint={handleHint}
        onUndo={handleUndo}
        onReset={resetGame}
      />
      <Board
        grid={grid}
        onDrop={drop}
        winningCells={winningCells}
        lastMove={lastMove}
      />
      <p className="created-by">Created by itay kendelker</p>
    </div>
  );
}
