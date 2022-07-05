import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BankPartnersTab } from '.';
import { GET_BANK_PARTNERS } from '../gql/queries';

const defaultMocks = [
  {
    request: {
      query: GET_BANK_PARTNERS,
      variables: {
        bankDid: 'Test-bank-did',
        filter: '',
      },
    },
    result: {
      data: {
        getBankPartners: [
          {
            holdingBankDid: 'RTGS:GB54321GBP',
            holdingBankName: 'MyBank',
            owningBankDid: 'AL:USD',
            owningBankName: 'Absolutely Loaded',
            iban: 'DEENE8OKE3FE6TS7WE8185GMBDF',
            currency: 'GBP',
          },
          {
            holdingBankDid: 'RTGS:GB826288GBP',
            holdingBankName: '406994',
            owningBankDid: 'AL:USD',
            owningBankName: 'Absolutely Loaded',
            iban: 'DET0YGE2Q9ISUY6JHHSX43',
            currency: 'GBP',
          },
        ],
      },
    },
  },
];

const renderComponent = (mocks = defaultMocks) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BankPartnersTab bankDid={'Test-bank-did'} />
    </MockedProvider>
  );
};

describe('bankPartnersTab', () => {
  it('should render search bar', async () => {
    renderComponent();

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText('Search for a bank')
      ).toBeInTheDocument()
    );
  });

  it('should render banks', async () => {
    renderComponent();

    await waitFor(() =>
      expect(screen.getByTestId('RTGS:GB54321GBP-name')).toBeInTheDocument()
    );
  });

  it('should render delete confirm when clicking delete', async () => {
    renderComponent();

    const deleteButton = screen.getByTestId('RTGS:GB54321GBP-delete');
    userEvent.click(deleteButton);

    await waitFor(() =>
      expect(
        screen.getByText('Are you sure you want to delete the bank partner?')
      ).toBeInTheDocument()
    );
  });
});
