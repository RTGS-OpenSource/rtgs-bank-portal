import { render, screen } from '@testing-library/react';

import { BankPartnerRequestsTab } from './';

describe('BankPartnerRequestsTab', () => {
  it('should render bank partner requests', () => {
    render(<BankPartnerRequestsTab />);

    expect(screen.getByText('Bank Partner Requests')).toBeInTheDocument();
  });
});
