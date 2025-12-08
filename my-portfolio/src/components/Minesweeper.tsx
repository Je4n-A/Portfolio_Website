import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bomb, Flag, RefreshCw, Coins } from "lucide-react";
import { cn } from "../utils/cn";

interface Cell {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const GRID_SIZE = 8;
const MINES_COUNT = 10;

export function Minesweeper() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [points, setPoints] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("minesweeper_points") || "1000");
    }
    return 1000;
  });
  const [wager, setWager] = useState(100);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    localStorage.setItem("minesweeper_points", points.toString());
  }, [points]);

  const initializeGrid = () => {
    const newGrid: Cell[][] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      newGrid[x] = [];
      for (let y = 0; y < GRID_SIZE; y++) {
        newGrid[x][y] = {
          x,
          y,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        };
      }
    }

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[x][y].isMine) {
        newGrid[x][y].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbors
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        if (!newGrid[x][y].isMine) {
          let neighbors = 0;
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const nx = x + dx;
              const ny = y + dy;
              if (
                nx >= 0 &&
                nx < GRID_SIZE &&
                ny >= 0 &&
                ny < GRID_SIZE &&
                newGrid[nx][ny].isMine
              ) {
                neighbors++;
              }
            }
          }
          newGrid[x][y].neighborMines = neighbors;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setWin(false);
  };

  const startGame = () => {
    if (points < wager) {
      alert("Not enough points!");
      return;
    }
    setPoints((p) => p - wager);
    initializeGrid();
    setGameActive(true);
  };

  const revealCell = (x: number, y: number) => {
    if (gameOver || win || grid[x][y].isFlagged || grid[x][y].isRevealed) return;

    const newGrid = [...grid];
    const cell = newGrid[x][y];

    if (cell.isMine) {
      // Game Over
      cell.isRevealed = true;
      setGrid(newGrid);
      setGameOver(true);
      setGameActive(false);
      // Reveal all mines
      newGrid.forEach((row) =>
        row.forEach((c) => {
          if (c.isMine) c.isRevealed = true;
        })
      );
      return;
    }

    // Flood fill for empty cells
    const reveal = (cx: number, cy: number) => {
      if (
        cx < 0 ||
        cx >= GRID_SIZE ||
        cy < 0 ||
        cy >= GRID_SIZE ||
        newGrid[cx][cy].isRevealed ||
        newGrid[cx][cy].isFlagged
      )
        return;

      newGrid[cx][cy].isRevealed = true;

      if (newGrid[cx][cy].neighborMines === 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            reveal(cx + dx, cy + dy);
          }
        }
      }
    };

    reveal(x, y);
    setGrid(newGrid);
    checkWin(newGrid);
  };

  const toggleFlag = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (gameOver || win || grid[x][y].isRevealed) return;

    const newGrid = [...grid];
    newGrid[x][y].isFlagged = !newGrid[x][y].isFlagged;
    setGrid(newGrid);
  };

  const checkWin = (currentGrid: Cell[][]) => {
    let revealedCount = 0;
    currentGrid.forEach((row) =>
      row.forEach((cell) => {
        if (cell.isRevealed) revealedCount++;
      })
    );

    if (revealedCount === GRID_SIZE * GRID_SIZE - MINES_COUNT) {
      setWin(true);
      setGameActive(false);
      setPoints((p) => p + wager * 2); // 2x payout
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Royal Minesweeper</h3>
        <p className="text-zinc-500 dark:text-zinc-400">Wager your points and clear the field!</p>
      </div>

      <div className="flex items-center gap-4 rounded-full bg-white px-6 py-2 shadow-sm dark:bg-zinc-900">
        <div className="flex items-center gap-2 text-amber-500">
          <Coins className="h-5 w-5" />
          <span className="font-bold">{points}</span>
        </div>
        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500">Wager:</span>
          <input
            type="number"
            min="10"
            max={points}
            value={wager}
            onChange={(e) => setWager(Math.max(0, parseInt(e.target.value) || 0))}
            disabled={gameActive}
            className="w-20 rounded-md border border-zinc-200 bg-transparent px-2 py-1 text-right font-medium focus:border-emerald-500 focus:outline-none dark:border-zinc-800"
          />
        </div>
      </div>

      {!gameActive && !gameOver && !win ? (
        <button
          onClick={startGame}
          className="rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
        >
          Start Game
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div
            className="grid gap-1 rounded-lg bg-zinc-200 p-1 dark:bg-zinc-800"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
          >
            {grid.map((row, x) =>
              row.map((cell, y) => (
                <motion.button
                  key={`${x}-${y}`}
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => revealCell(x, y)}
                  onContextMenu={(e) => toggleFlag(e, x, y)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded text-sm font-bold transition-colors sm:h-10 sm:w-10",
                    cell.isRevealed
                      ? cell.isMine
                        ? "bg-red-500 text-white"
                        : "bg-white text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                      : "bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600",
                    cell.isFlagged && !cell.isRevealed && "bg-amber-100 dark:bg-amber-900/30"
                  )}
                  disabled={gameOver || win || (cell.isRevealed && !cell.isMine)}
                >
                  {cell.isRevealed && cell.isMine && <Bomb className="h-5 w-5" />}
                  {cell.isRevealed && !cell.isMine && cell.neighborMines > 0 && cell.neighborMines}
                  {!cell.isRevealed && cell.isFlagged && <Flag className="h-4 w-4 text-amber-600 dark:text-amber-500" />}
                </motion.button>
              ))
            )}
          </div>

          {(gameOver || win) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <p className={cn("text-lg font-bold", win ? "text-emerald-600" : "text-red-600")}>
                {win ? "Victory! Points Doubled!" : "Game Over! You lost your wager."}
              </p>
              <button
                onClick={() => {
                  setGameActive(false);
                  setGameOver(false);
                  setWin(false);
                }}
                className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
              >
                <RefreshCw className="h-4 w-4" /> Play Again
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
