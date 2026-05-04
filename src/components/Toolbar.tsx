import React from "react";
import { useDispatch } from "react-redux";
import { redo } from "../store/gameSlice";
import { undo } from "../store/gameSlice";
import { togglePencilMode } from "../store/gameSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { generateSudoku } from "../utils/sudokuGenerator";
import { setBoard } from "../store/gameSlice";
import { updateCell } from "../store/gameSlice";

const Toolbar = () => {
  const dispatch = useDispatch();
  const pencilMode = useSelector((state: RootState) => state.game.pencilMode);
  const selectedCell = useSelector(
    (state: RootState) => state.game.selectedCell,
  );
  const board = useSelector((state: RootState) => state.game.board);

  const applyNumber = (value: number) => {
    if (!selectedCell) {
      return;
    }

    const { row, col } = selectedCell;
    const targetCell = board[row]?.[col];

    if (!targetCell || targetCell.isInitial) {
      return;
    }

    if (pencilMode) {
      const hasNote = targetCell.notes.includes(value);
      const updatedNotes = hasNote
        ? targetCell.notes.filter((note) => note !== value)
        : [...targetCell.notes, value].sort((a, b) => a - b);

      dispatch(updateCell({ row, col, value: null, notes: updatedNotes }));
      return;
    }

    dispatch(updateCell({ row, col, value, notes: [] }));
  };

  const clearSelectedCell = () => {
    if (!selectedCell) {
      return;
    }

    const { row, col } = selectedCell;
    const targetCell = board[row]?.[col];
    if (!targetCell || targetCell.isInitial) {
      return;
    }

    if (pencilMode) {
      dispatch(updateCell({ row, col, value: null, notes: [] }));
      return;
    }

    dispatch(updateCell({ row, col, value: null }));
  };

  return (
    <div className="toolbar">
      <button className="toolbar-btn" onClick={() => dispatch(undo())}>
        Undo
      </button>
      <button className="toolbar-btn" onClick={() => dispatch(redo())}>
        Redo
      </button>
      <button
        className={`toolbar-btn ${pencilMode ? "active" : ""}`}
        onClick={() => dispatch(togglePencilMode())}
      >
        Pencil
      </button>
      <button
        className="toolbar-btn"
        onClick={() => dispatch(setBoard(generateSudoku()))}
      >
        New Puzzle
      </button>
      <div className="toolbar-numberpad" aria-label="Number pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
          <button
            key={value}
            className="toolbar-btn toolbar-btn-small"
            onClick={() => applyNumber(value)}
            disabled={!selectedCell}
          >
            {value}
          </button>
        ))}
        <button
          className="toolbar-btn toolbar-btn-small"
          onClick={clearSelectedCell}
          disabled={!selectedCell}
        >
          Clear
        </button>
      </div>
      {/* TODO: add checks? */}
      {/* TODO: add Save/Resume buttons */}
    </div>
  );
};

export default Toolbar;
