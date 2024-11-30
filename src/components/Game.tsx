import React, { useState } from "react";
import Board from "./Board";
import { generateSolvedBoard, generatePuzzle } from "../utills/sudoku";

type CellValue = number | null;

const Game: React.FC = () => {
  const getCluesCount = (level: "easy" | "medium" | "hard"): number => {
    return level === "easy" ? 40 : level === "medium" ? 30 : 20;
  };

  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [solvedBoard, setSolvedBoard] = useState<CellValue[][]>(generateSolvedBoard());
  const [puzzleBoard, setPuzzleBoard] = useState<CellValue[][]>(() =>
    generatePuzzle(solvedBoard, getCluesCount("medium"))
  );
  const [userBoard, setUserBoard] = useState<CellValue[][]>(() =>
    JSON.parse(JSON.stringify(puzzleBoard))
  );

  const handleCellChange = (row: number, col: number, value: number) => {
    const newBoard = userBoard.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? value : cell
      )
    );
    setUserBoard(newBoard);
  };

  const checkSolution = () => {
    if (JSON.stringify(userBoard) === JSON.stringify(solvedBoard)) {
      alert("Congratulations! You solved it correctly.");
    } else {
      alert("The solution is incorrect. Keep trying!");
    }
  };

  const resetPuzzle = () => {
    setUserBoard(JSON.parse(JSON.stringify(puzzleBoard)));
  };

  const newPuzzle = (level: "easy" | "medium" | "hard") => {
    setDifficulty(level);
    const newSolved = generateSolvedBoard();
    setSolvedBoard(newSolved);
    const clues = getCluesCount(level);
    const newPuzzleBoard = generatePuzzle(newSolved, clues);
    setPuzzleBoard(newPuzzleBoard);
    setUserBoard(JSON.parse(JSON.stringify(newPuzzleBoard)));
  };

  const solvePuzzle = () => {
    const confirmSolve = window.confirm(
      "Are you sure you want to solve the puzzle? This will reveal the solution."
    );
    if (confirmSolve) {
      setUserBoard(JSON.parse(JSON.stringify(solvedBoard))); // Reveal the solution
    }
  };

  return (
    <div className="container">
      <h1>Sudoku</h1>
      <div className="difficulty-buttons">
        <button
          className={difficulty === "easy" ? "active" : ""}
          onClick={() => newPuzzle("easy")}
        >
          Easy
        </button>
        <button
          className={difficulty === "medium" ? "active" : ""}
          onClick={() => newPuzzle("medium")}
        >
          Medium
        </button>
        <button
          className={difficulty === "hard" ? "active" : ""}
          onClick={() => newPuzzle("hard")}
        >
          Hard
        </button>
      </div>
      <Board board={userBoard} onCellChange={handleCellChange} />
      <div>
        <button onClick={checkSolution}>Check Solution</button>
        <button onClick={resetPuzzle}>Reset Puzzle</button>
        <button onClick={solvePuzzle}>Solve</button>
      </div>
    </div>
  );
};

export default Game;
