import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// TODO: add validation, to check for errors

export interface Cell {
  value: number | null;
  notes: number[];
  isInitial: boolean; // is cell value part of original puzzle
  error?: boolean; // for error handling
}

export type Board = Cell[][];

interface GameState {
  board: Board;
  pencilMode: boolean;
  selectedCell: { row: number; col: number } | null;
  history: Board[];
  future: Board[];
  error: boolean;
}
const initialState: GameState = {
  board: [], // initialize later with puzzle generator
  pencilMode: false,
  selectedCell: null,
  history: [],
  future: [],
  error: false,
};

// TODO: create helper functions to serialize and deserialize board state
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<Board>) {
      state.board = action.payload;
      state.history = [action.payload];
      state.future = [];
    },
    updateCell(
      state,
      action: PayloadAction<{
        row: number;
        col: number;
        value: number | null;
        notes?: number[];
      }>
    ) {
      // create deep copy for history
      const newBoard = state.board.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      const { row, col, value, notes } = action.payload;

      newBoard[row][col].value = value;
      if (notes) {
        newBoard[row][col].notes = notes;
      }

      // add new state to history and reset future
      state.history.push(newBoard);
      state.future = [];
      state.board = newBoard;
    },
    undo(state) {
      if (state.history.length > 1) {
        const previousState = state.history[state.history.length - 2];
        state.future.push(state.history.pop()!);
        state.board = previousState;
      }
    },
    redo(state) {
      if (state.future.length > 0) {
        const nextState = state.future.pop()!;
        state.history.push(nextState);
        state.board = nextState;
      }
    },
    togglePencilMode(state) {
      state.pencilMode = !state.pencilMode;
    },
    setSelectedCell(
      state,
      action: PayloadAction<{ row: number; col: number } | null>
    ) {
      state.selectedCell = action.payload;
    },
    addNote(
      state,
      action: PayloadAction<{ row: number; col: number; note: number }>
    ) {
      const { row, col, note } = action.payload;
      const newBoard = state.board.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      newBoard[row][col].notes.push(note);
      state.board = newBoard;
    },
    clearNotes(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;
      const newBoard = state.board.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      newBoard[row][col].notes = [];
      state.board = newBoard;
    },
    clearCell(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;
      const newBoard = state.board.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      newBoard[row][col].value = null;
      state.board = newBoard;
    },
    toggleError(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;
      const newBoard = state.board.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      newBoard[row][col].error = !newBoard[row][col].error;
      state.board = newBoard;
    },
    resetGame(state) {
      state.board = [];
      state.history = [];
      state.future = [];
    },
  },
});

export const {
  setBoard,
  updateCell,
  undo,
  redo,
  togglePencilMode,
  setSelectedCell,
  addNote,
  clearNotes,
  clearCell,
  toggleError,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
