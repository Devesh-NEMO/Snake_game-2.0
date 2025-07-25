import React, { useState, useEffect } from "react";
import Grid from "./assets/Grid";
import Movement from "./assets/Movement";
import "./App.css";

function App() {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState({});
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  useEffect(() => {
    const preventScroll = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventScroll, { passive: false });
    return () => window.removeEventListener("keydown", preventScroll);
  }, []);

  const handleUpdate = (updatedSnake, updatedFood, ate, hitWall) => {
    setSnake(updatedSnake);
    setFood(updatedFood);
    if (ate) setScore((s) => s + 1);
    if (hitWall) setGameOver(true);
  };

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setResetTrigger((prev) => !prev); // forces Movement to reinitialize
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">🐍 Snake Game</h1>
      <div className="mb-4 flex gap-4 items-center">
        <span className="text-xl">Score: {score}</span>
        {gameOver && <span className="text-red-500 font-semibold">Game Over!</span>}
        <button
          onClick={restartGame}
          className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg text-white shadow"
        >
          Restart
        </button>
      </div>

      <div className="border border-gray-700 bg-gray-900 rounded-lg p-2">
        <Grid snake={snake} food={food} />
      </div>

      <Movement key={resetTrigger} onUpdate={handleUpdate} isGameOver={gameOver} />
    </div>
  );
}

export default App;
