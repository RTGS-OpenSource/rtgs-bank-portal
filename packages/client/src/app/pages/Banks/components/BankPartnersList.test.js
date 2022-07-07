import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GET_BANK_PARTNERS } from '../gql/queries';
import { BankPartnersList } from './';

const defaultMocks = [
  {
    request: {
      query: GET_BANK_PARTNERS,
      variables: {
        bankDid: 'Test-bank-did',
        filter: '',
        offset: 0,
        limit: 99,
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
      <BankPartnersList bankDid={'Test-bank-did'} filter={''} />
    </MockedProvider>
  );
};

describe('BankPartnersList', () => {
  it('should render banks', async () => {
    renderComponent();

    await waitFor(() =>
      expect(screen.getByTestId('RTGS:GB54321GBP-name')).toBeInTheDocument()
    );
  });

  it('should render loader when loading bank partners data', () => {
    renderComponent();

    expect(screen.getByTestId('bank-partners-loader')).toBeInTheDocument();
  });

  it('should render error when error returned from getBankPartners query', async () => {
    const errorMock = [
      {
        request: {
          query: GET_BANK_PARTNERS,
          variables: {
            bankDid: 'Test-bank-did',
            filter: '',
            offset: 0,
            limit: 99,
          },
        },
        error: new Error('An error occurred'),
      },
    ];

    renderComponent(errorMock);

    await waitFor(() =>
      expect(
        screen.queryByTestId('bank-partners-loader')
      ).not.toBeInTheDocument()
    );

    expect(
      screen.getByText('Error retrieving bank partner data')
    ).toBeInTheDocument();
  });

  it('should render delete confirm when clicking delete', async () => {
    renderComponent();

    await waitFor(() =>
      expect(
        screen.queryByTestId('bank-partners-loader')
      ).not.toBeInTheDocument()
    );

    const deleteButton = await screen.getByTestId('RTGS:GB54321GBP-delete');
    userEvent.click(deleteButton);

    expect(
      screen.getByText('Are you sure you want to delete the bank partner?')
    ).toBeInTheDocument();
  });
});
