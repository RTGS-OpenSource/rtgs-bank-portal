import { render, screen } from '@testing-library/react';

import Banks from './';

describe('banks page', () => {
  it('should render page', () => {
    render(<Banks />);

    expect(screen.getByText('Banks')).toBeInTheDocument();
  });

  it('should render tabs', () => {
    render(<Banks />);

    expect(screen.getByTestId('banks-tabs')).toBeInTheDocument();
  });
});
