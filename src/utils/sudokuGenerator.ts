import { Board, Cell } from "../store/gameSlice";

export const generateSudoku = (): Board => {
  // Placeholder: Replace with actual Sudoku generation logic
  const board: Board = [];
  for (let i = 0; i < 9; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < 9; j++) {
      row.push({ value: null, notes: [], isInitial: false });
    }
    board.push(row);
  }
  return board;
};

export const isBoardValid = (board: Board): boolean => {
  return true;
};
