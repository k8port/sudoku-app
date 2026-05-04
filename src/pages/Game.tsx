import React, { useEffect, useMemo } from "react";
import Board from "../components/Board";
import Toolbar from "../components/Toolbar";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBoard } from "../store/gameSlice";
import SpotifyPlayer from "../components/SpotifyPlayer";
import { Link } from "react-router-dom";
import {
  getConflictCells,
  isBoardComplete,
  isBoardSolved,
} from "../utils/validation";

const isValidSavedBoard = (value: unknown): boolean => {
  if (!Array.isArray(value) || value.length !== 9) {
    return false;
  }

  return value.every(
    (row) =>
      Array.isArray(row) &&
      row.length === 9 &&
      row.every(
        (cell) =>
          cell &&
          typeof cell === "object" &&
          (cell.value === null || typeof cell.value === "number") &&
          Array.isArray(cell.notes) &&
          typeof cell.isInitial === "boolean",
      ),
  );
};

const Game = () => {
  const board = useSelector((state: RootState) => state.game.board);
  const dispatch = useDispatch();
  const conflicts = useMemo(() => getConflictCells(board), [board]);
  const hasConflicts = conflicts.size > 0;
  const boardComplete = useMemo(() => isBoardComplete(board), [board]);
  const solved = useMemo(() => isBoardSolved(board), [board]);

  const statusText = solved
    ? "Puzzle solved. Great work."
    : hasConflicts
      ? "Conflicts found. Highlighted cells break Sudoku rules."
      : boardComplete
        ? "Board is complete and valid."
        : "Fill the board. Conflicts will highlight in red.";

  const statusClassName = solved
    ? "game-status success"
    : hasConflicts
      ? "game-status error"
      : "game-status";

  // save board state to local storage when it changes
  useEffect(() => {
    localStorage.setItem("sudoku-board", JSON.stringify(board));
  }, [board]);

  // load board state from local storage when component mounts
  useEffect(() => {
    const savedBoard = localStorage.getItem("sudoku-board");
    if (!savedBoard) {
      return;
    }

    try {
      const parsedBoard = JSON.parse(savedBoard);
      if (isValidSavedBoard(parsedBoard)) {
        dispatch(setBoard(parsedBoard));
      } else {
        localStorage.removeItem("sudoku-board");
      }
    } catch {
      localStorage.removeItem("sudoku-board");
    }
  }, [dispatch]);

  return (
    <div className="game-page">
      <section className="game-panel">
        <header className="game-head">
          <h1 className="game-title">Sudoku</h1>
          <Link to="/" className="button-secondary">
            Back Home
          </Link>
        </header>
        <SpotifyPlayer />
        <p className={statusClassName}>{statusText}</p>
        <Board />
        <Toolbar />
      </section>
    </div>
  );
};

export default Game;
