type CellValue = number | null;

const shuffle = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateSolvedBoard = (): CellValue[][] => {
  const board: CellValue[][] = Array.from({ length: 9 }, () => Array(9).fill(null));

  const fillBoard = (row: number, col: number): boolean => {
    if (row === 9) return true; 

    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = (col + 1) % 9;

    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const num of nums) {
      if (isValidMove(board, row, col, num)) {
        board[row][col] = num;
        if (fillBoard(nextRow, nextCol)) return true;
        board[row][col] = null; 
      }
    }

    return false;
  };

  fillBoard(0, 0);
  return board;
};

const isValidMove = (board: CellValue[][], row: number, col: number, value: number): boolean => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === value || board[i][col] === value) return false;

    const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(col / 3) + (i % 3);
    if (board[boxRow][boxCol] === value) return false;
  }
  return true;
};

const generatePuzzle = (solvedBoard: CellValue[][], clues: number): CellValue[][] => {
  const puzzle = solvedBoard.map((row) => [...row]);
  const cellsToRemove = 81 - clues;

  for (let i = 0; i < cellsToRemove; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== null) {
      puzzle[row][col] = null;
    } else {
      i--;
    }
  }

  return puzzle;
};

export { generateSolvedBoard, generatePuzzle };
