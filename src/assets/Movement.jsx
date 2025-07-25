import { useEffect, useState } from "react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];

const getRandomFood = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

export default function Movement({ onUpdate, isGameOver }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState(getRandomFood());

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "w") setDirection((d) => d.y !== 1 ? { x: 0, y: -1 } : d);
      if (e.key === "ArrowDown" || e.key === "s") setDirection((d) => d.y !== -1 ? { x: 0, y: 1 } : d);
      if (e.key === "ArrowLeft" || e.key === "a") setDirection((d) => d.x !== 1 ? { x: -1, y: 0 } : d);
      if (e.key === "ArrowRight" || e.key === "d") setDirection((d) => d.x !== -1 ? { x: 1, y: 0 } : d);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameOver) return;

      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        const hitWall = head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
        const hitSelf = prevSnake.some((segment) => segment.x === head.x && segment.y === head.y);

        if (hitWall || hitSelf) {
          onUpdate(prevSnake, food, false, true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];
        let ate = false;

        if (head.x === food.x && head.y === food.y) {
          setFood(getRandomFood());
          ate = true;
        } else {
          newSnake.pop();
        }

        onUpdate(newSnake, food, ate, false);
        return newSnake;
      });
    }, 130);

    return () => clearInterval(interval);
  }, [direction, food, isGameOver, onUpdate]);

  return null;
}
