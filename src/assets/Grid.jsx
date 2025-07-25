import React from "react";

const GRID_SIZE = 20;

export default function Grid({ snake, food }) {
  const getCellClass = (x, y) => {
    if (snake.some((segment) => segment.x === x && segment.y === y)) return "bg-green-400";
    if (food.x === x && food.y === y) return "bg-red-500";
    return "bg-gray-900";
  };

  return (
    <div
      className="grid gap-0.5"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        width: '400px',
        height: '400px',
        display: 'grid',
      }}
    >
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
        const x = i % GRID_SIZE;
        const y = Math.floor(i / GRID_SIZE);
        return (
          <div
            key={i}
            className={`w-full h-full ${getCellClass(x, y)} rounded-sm`}
          />
        );
      })}
    </div>
  );
}
