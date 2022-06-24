import { render, screen } from '@testing-library/react';
import App from '.';

jest.mock('@rtgs-global/components', () => ({
  // eslint-disable-next-line react/prop-types
  Layout: ({ children }) => <div>{children}</div>,
  Tabs: {
    tab: '',
  },
}));

test('renders children', () => {
  render(
    <App>
      <div>child</div>
    </App>
  );

  const text = screen.getByText('child');
  expect(text).toBeInTheDocument();
});
