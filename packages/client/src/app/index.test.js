import { render, screen } from '@testing-library/react';
import App from '.';

test('renders page header', () => {
  render(<App />);
  const text = screen.getByText(/Home/i);
  expect(text).toBeInTheDocument();
});
