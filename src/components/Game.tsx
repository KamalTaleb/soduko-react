import React, { useState } from "react";
import Board from "./Board";
import { generateSolvedBoard, generatePuzzle } from "../utills/sudoku";

type CellValue = number | null;

const Game: React.FC = () => {
  const [solvedBoard, setSolvedBoard] = useState<CellValue[][]>(
    generateSolvedBoard()
  );
  const [puzzleBoard, setPuzzleBoard] = useState<CellValue[][]>(() =>
    generatePuzzle(solvedBoard, 30)
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

  const newPuzzle = () => {
    const newSolved = generateSolvedBoard();
    setSolvedBoard(newSolved);
    const newPuzzleBoard = generatePuzzle(newSolved, 30);
    setPuzzleBoard(newPuzzleBoard);
    setUserBoard(JSON.parse(JSON.stringify(newPuzzleBoard)));
  };

  return (
    <div className="container">
      <h1>Sudoku</h1>
      <Board board={userBoard} onCellChange={handleCellChange} />
      <div>
        <button onClick={checkSolution}>Check Solution</button>
        <button onClick={resetPuzzle}>Reset Puzzle</button>
        <button onClick={newPuzzle}>New Puzzle</button>
      </div>
    </div>
  );
};

export default Game;
