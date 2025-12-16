export default function Board() {
  const rows = 6;
  const cols = 7;

  const cells = [];
  for (let i = 0; i < rows * cols; i++) {
    cells.push(i);
  }

  return (
    <div style={{ border: "6px solid black", padding: 50 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 20,
          width: 800,
        }}
      >
        {cells.map((cell) => (
          <div
            key={cell}
            style={{
              width: 60,
              height: 50,
              borderRadius: "50%",
              border: "1px solid black",
            }}
          />
        ))}
      </div>
    </div>
  );
}
