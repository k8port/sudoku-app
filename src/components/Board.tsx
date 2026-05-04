import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setBoard } from "../store/gameSlice";
import { generateSudoku } from "../utils/sudokuGenerator";
import CellComponent from "./Cell";
import { getConflictCells } from "../utils/validation";

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.game.board);
  const conflictCells = useMemo(() => getConflictCells(board), [board]);

  // initialize board on mount
  useEffect(() => {
    if (board.length === 0) {
      dispatch(setBoard(generateSudoku()));
    }
  }, [board, dispatch]);

  return (
    <div className="board-grid">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          // Error style is computed from live board conflicts.
          <CellComponent
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            cell={{
              ...cell,
              error: conflictCells.has(`${rowIndex}-${colIndex}`),
            }}
          />
        )),
      )}
    </div>
  );
};

export default Board;
