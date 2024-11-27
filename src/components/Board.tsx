import React from "react";

type CellValue = number | null;

interface BoardProps {
  board: CellValue[][];
  onCellChange: (row: number, col: number, value: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellChange }) => {
  const [activeCell, setActiveCell] = React.useState<{ row: number; col: number } | null>(null);

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isHighlighted =
            activeCell &&
            (rowIndex === activeCell.row ||
              colIndex === activeCell.col ||
              (Math.floor(rowIndex / 3) === Math.floor(activeCell.row / 3) &&
                Math.floor(colIndex / 3) === Math.floor(activeCell.col / 3)));

          return (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={cell || ""}
              maxLength={1}
              data-highlight={isHighlighted ? "true" : "false"}
              onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
              onBlur={() => setActiveCell(null)}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 1 && value <= 9) {
                  onCellChange(rowIndex, colIndex, value);
                }
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;
