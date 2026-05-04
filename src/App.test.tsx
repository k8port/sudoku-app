import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders sudoku home screen", () => {
  render(<App />);
  const titleElement = screen.getByText(/sudoku pow/i);
  expect(titleElement).toBeInTheDocument();
});
