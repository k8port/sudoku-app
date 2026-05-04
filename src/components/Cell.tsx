import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { updateCell } from "../store/gameSlice";
import { setSelectedCell } from "../store/gameSlice";

interface CellProps {
  row: number;
  col: number;
  cell: {
    value: number | null;
    notes: number[];
    isInitial: boolean;
    error?: boolean;
  };
}

const CellComponent: React.FC<CellProps> = ({ row, col, cell }: CellProps) => {
  const dispatch = useDispatch();
  const pencilMode = useSelector((state: RootState) => state.game.pencilMode);
  const cellRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    dispatch(setSelectedCell({ row, col }));
    cellRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (cell.isInitial) {
      return;
    }

    const num = parseInt(e.key, 10);

    if (num >= 1 && num <= 9) {
      e.preventDefault();

      if (pencilMode) {
        const hasNote = cell.notes.includes(num);
        const updatedNotes = hasNote
          ? cell.notes.filter((note) => note !== num)
          : [...cell.notes, num].sort((a, b) => a - b);

        dispatch(updateCell({ row, col, value: null, notes: updatedNotes }));
      } else {
        dispatch(updateCell({ row, col, value: num, notes: [] }));
      }
    } else if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();

      if (pencilMode) {
        dispatch(updateCell({ row, col, value: null, notes: [] }));
      } else {
        dispatch(updateCell({ row, col, value: null }));
      }
    }
  };

  const handleMouseEnter = () => {
    // optional: implement hover state
  };

  const handleMouseLeave = () => {
    // optional: implement hover state
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Keep focus on the cell so keyboard entry works consistently after a click.
    e.preventDefault();
    dispatch(setSelectedCell({ row, col }));
    cellRef.current?.focus();
  };

  const handleMouseUp = () => {
    // optional: implement mouse up state
  };

  const borderStyle: React.CSSProperties = {
    borderTopWidth: row % 3 === 0 ? 2 : 1,
    borderLeftWidth: col % 3 === 0 ? 2 : 1,
    borderRightWidth: col === 8 ? 2 : 1,
    borderBottomWidth: row === 8 || row % 3 === 2 ? 2 : 1,
  };

  const className = `cell ${cell.isInitial ? "cell-initial" : ""} ${
    cell.error ? "cell-error" : ""
  }`;

  return (
    <div
      ref={cellRef}
      tabIndex={0}
      className={className}
      style={borderStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {cell.value ? (
        <span className="cell-value">{cell.value}</span>
      ) : (
        <div className="cell-note">{cell.notes.join(" ")}</div>
      )}
    </div>
  );
};

export default CellComponent;
