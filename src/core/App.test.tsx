import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const projectTitle = screen.getByText(/project astrolog/i);
  expect(projectTitle).toBeInTheDocument();
});
