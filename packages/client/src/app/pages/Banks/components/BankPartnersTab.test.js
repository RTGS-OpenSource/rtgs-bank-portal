import { render, screen } from '@testing-library/react';

import { BankPartnersTab } from '.';

jest.mock('./BankPartnersList', () => () => <div>Bank partner list</div>);

describe('bankPartnersTab', () => {
  it('should render search bar', () => {
    render(<BankPartnersTab bankDid={'Test-bank-did'} />);

    expect(
      screen.getByPlaceholderText('Search for a bank')
    ).toBeInTheDocument();
  });
});
