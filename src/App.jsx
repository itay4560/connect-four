import { useState } from "react";

import "./App.css";

import Board from "./Board";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Board />
    </div>
  );
}
