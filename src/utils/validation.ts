import { Board } from "../store/gameSlice";

const getCellKey = (row: number, col: number): string => `${row}-${col}`;

const getCellValue = (board: Board, row: number, col: number): number | null => {
  const rowData = board[row];
  if (!Array.isArray(rowData)) {
    return null;
  }

  const cell = rowData[col];
  if (!cell || typeof cell.value !== "number") {
    return null;
  }

  return cell.value;
};

export const getConflictCells = (board: Board): Set<string> => {
  const conflicts = new Set<string>();

  for (let row = 0; row < 9; row++) {
    const seenInRow = new Map<number, number>();

    for (let col = 0; col < 9; col++) {
      const value = getCellValue(board, row, col);
      if (!value) {
        continue;
      }

      const previousCol = seenInRow.get(value);
      if (previousCol !== undefined) {
        conflicts.add(getCellKey(row, previousCol));
        conflicts.add(getCellKey(row, col));
      } else {
        seenInRow.set(value, col);
      }
    }
  }

  for (let col = 0; col < 9; col++) {
    const seenInCol = new Map<number, number>();

    for (let row = 0; row < 9; row++) {
      const value = getCellValue(board, row, col);
      if (!value) {
        continue;
      }

      const previousRow = seenInCol.get(value);
      if (previousRow !== undefined) {
        conflicts.add(getCellKey(previousRow, col));
        conflicts.add(getCellKey(row, col));
      } else {
        seenInCol.set(value, row);
      }
    }
  }

  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const seenInBox = new Map<number, string>();

      for (let rowOffset = 0; rowOffset < 3; rowOffset++) {
        for (let colOffset = 0; colOffset < 3; colOffset++) {
          const row = boxRow + rowOffset;
          const col = boxCol + colOffset;
          const value = getCellValue(board, row, col);
          if (!value) {
            continue;
          }

          const cellKey = getCellKey(row, col);
          const previousCellKey = seenInBox.get(value);
          if (previousCellKey) {
            conflicts.add(previousCellKey);
            conflicts.add(cellKey);
          } else {
            seenInBox.set(value, cellKey);
          }
        }
      }
    }
  }

  return conflicts;
};

export const isBoardComplete = (board: Board): boolean => {
  if (board.length !== 9) {
    return false;
  }

  return board.every(
    (row) =>
      Array.isArray(row) &&
      row.length === 9 &&
      row.every((cell) => cell && typeof cell.value === "number"),
  );
};

export const isBoardSolved = (board: Board): boolean => {
  if (!isBoardComplete(board)) {
    return false;
  }

  return getConflictCells(board).size === 0;
};
