import React, { useState } from 'react';
import Square from './Square';

function ConnectFour() {
    const ROWS = 6;
    const COLS = 7;

    // יצירת לוח ריק
    const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    const [isRedNext, setIsRedNext] = useState(true);
    const [winner, setWinner] = useState(null);

    function checkWinner(grid) {
        // בדיקת רצפים (אופקי, אנכי ואלכסוני)
        // זו לוגיקה מקוצרת לבדיקה
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const player = grid[r][c];
                if (!player) continue;

                // בדיקה ימינה, למטה, ובאלכסונים
                if (c + 3 < COLS && player === grid[r][c+1] && player === grid[r][c+2] && player === grid[r][c+3]) return player;
                if (r + 3 < ROWS) {
                    if (player === grid[r+1][c] && player === grid[r+2][c] && player === grid[r+3][c]) return player;
                    if (c + 3 < COLS && player === grid[r+1][c+1] && player === grid[r+2][c+2] && player === grid[r+3][c+3]) return player;
                    if (c - 3 >= 0 && player === grid[r+1][c-1] && player === grid[r+2][c-2] && player === grid[r+3][c-3]) return player;
                }
            }
        }
        return null;
    }

    function handleClick(col) {
        if (winner) return;

        const newBoard = board.map(row => [...row]);
        // מציאת השורה הכי נמוכה פנויה בעמודה
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!newBoard[row][col]) {
                newBoard[row][col] = isRedNext ? "Red" : "Yellow";
                setBoard(newBoard);

                const gameWinner = checkWinner(newBoard);
                if (gameWinner) {
                    setWinner(gameWinner);
                } else {
                    setIsRedNext(!isRedNext);
                }
                return;
            }
        }
    }

    return (
        <div className="game-container">
            <h1>ארבע בשורה</h1>
            <h3>
                {winner ? "המנצח הוא: " + winner : "תור השחקן: " + (isRedNext ? "אדום" : "צהוב")}
            </h3>

            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="board-row">
                        {row.map((cell, colIndex) => (
                            <Square
                                key={colIndex}
                                value={cell}
                                onClick={() => handleClick(colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <button className="reset-btn" onClick={() => window.location.reload()}>אתחול משחק</button>
        </div>
    );
}

export default ConnectFour;