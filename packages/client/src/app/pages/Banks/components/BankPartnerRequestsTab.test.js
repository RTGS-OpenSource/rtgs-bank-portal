import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { BankPartnerRequestsTab } from './';
import { GET_BANK_PARTNER_REQUESTS } from '../gql/queries';

const defaultMocks = [
  {
    request: {
      query: GET_BANK_PARTNER_REQUESTS,
      variables: {
        bankDid: 'Test-bank-did',
      },
    },
    result: {
      data: {
        getBankPartnerRequests: [
          {
            holdingBankDid: 'RTGS:GB368650GBPCYPRESS',
            holdingBankName: 'Jason Test Bank GBP 2',
            owningBankDid: 'Test-bank-did',
            owningBankName: 'Absolutely Loaded',
            iban: 'GB83BARC20037824333683',
            currency: 'GBP',
          },
          {
            holdingBankDid: 'Test-bank-did',
            holdingBankName: 'Absolutely Loaded',
            owningBankDid: 'RTGS:B:GB94379716',
            owningBankName: 'cypressTestBank260704',
            iban: 'DE74700500000004532953',
            currency: 'USD',
          },
        ],
      },
    },
  },
];

const props = {
  bankDid: 'Test-bank-did',
  currency: 'GBP',
};

const renderComponent = (mocks = defaultMocks) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BankPartnerRequestsTab {...props} />
    </MockedProvider>
  );
};

describe('BankPartnerRequestsTab', () => {
  it('should render bank partner requests', async () => {
    renderComponent();

    await waitFor(() =>
      expect(screen.getByText('Jason Test Bank GBP 2')).toBeInTheDocument()
    );
  });
});
