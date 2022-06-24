import { render, screen } from '@testing-library/react';

import Home from './';

describe('home page', () => {
  it('should render page', () => {
    render(<Home />);

    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });
});
