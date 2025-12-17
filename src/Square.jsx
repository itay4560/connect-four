import React from 'react';

function Square({ value, onClick }) {
    // יצירת שם המחלקה בעזרת שרשור רגיל במקום סימן דולר
    let className = "circle";
    if (value === "Red") className = "circle red";
    if (value === "Yellow") className = "circle yellow";

    return (
        <div className="square" onClick={onClick}>
            <div className={className}></div>
        </div>
    );
}

export default Square;