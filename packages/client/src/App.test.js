import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders RTGS-Global", () => {
  render(<App />);
  const text = screen.getByText(/RTGS-Global/i);
  expect(text).toBeInTheDocument();
});
