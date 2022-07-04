import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';

import { GET_BANK_PARTNER_DATA } from '../gql/queries';

import { AddBankPartnerTab } from './';

const bankPartnerCall = jest.fn();

const props = {
  currentBankDid: 'test-did',
  currency: 'GBP',
};

const defaultMocks = [
  {
    request: {
      query: GET_BANK_PARTNER_DATA,
      variables: {
        bankDid: 'test-did',
        currency: 'GBP',
      },
    },
    result: () => {
      bankPartnerCall();
      return {
        data: {
          getForeignBanks: [
            {
              bankDid: 'RTGS:B:GB13951280',
              bankName: 'cypressTestBank678362',
              currency: 'GBP',
            },
          ],
          getUser: {
            supportedCurrencies: ['GBP', 'USD', 'JPY', 'EUR'],
          },
        },
      };
    },
  },
];

const renderComponent = (mocks = defaultMocks) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AddBankPartnerTab {...props} />
    </MockedProvider>
  );
};

describe('AddBankPartnerTab', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should query GET_BANK_PARTNER_DATA on load', async () => {
    renderComponent();
    await waitFor(() => expect(bankPartnerCall).toHaveBeenCalled());
  });

  it('should render add bank partner form', async () => {
    renderComponent();

    await waitFor(() =>
      expect(screen.getByText('Add Bank Partner')).toBeInTheDocument()
    );
  });

  it('should render loader when bank partner data is loading', () => {
    renderComponent();

    expect(screen.getByTestId('add-bank-partner-loader')).toBeInTheDocument();
  });

  it('should render error message when bank partner data query fails', async () => {
    const mocks = [
      {
        request: {
          query: GET_BANK_PARTNER_DATA,
          variables: {
            bankDid: 'test-did',
            currency: 'GBP',
          },
        },
        error: new Error('An error occurred'),
      },
    ];

    renderComponent(mocks);

    await waitFor(() =>
      expect(screen.getByText('Error retrieving form data')).toBeInTheDocument()
    );
  });
});
