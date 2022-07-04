import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CREATE_BANK_PARTNER } from '../gql/mutations';
import { GET_BANK_PARTNER_DATA } from '../gql/queries';

import { AddBankPartnerTab } from './';

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
    result: {
      data: {
        getForeignBanks: [
          {
            bankDid: 'RTGS:B:EU13951280',
            bankName: 'cypressTestBank678362',
            currency: 'EUR',
          },
        ],
        getUser: {
          supportedCurrencies: ['GBP', 'USD', 'JPY', 'EUR'],
        },
      },
    },
  },
  {
    request: {
      query: CREATE_BANK_PARTNER,
      variables: {
        values: {
          currency: 'GBP',
          bankPartner: {
            approvingBankDid: 'RTGS:B:EU13951280',
            iban: 'GB14567456',
            requestingBankDid: 'test-did',
          },
        },
      },
    },
    result: { data: { createBankPartner: { status: 'Success' } } },
  },
];

const renderComponent = (mocks = defaultMocks) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AddBankPartnerTab {...props} />
    </MockedProvider>
  );
};

const completeAndSubmitForm = async () => {
  const currencyField = screen.getByTestId('currency-input');
  const availableBanksField = screen.getByTestId('bank-input');
  const ibanField = screen.getByTestId('bank-iban-input');

  userEvent.type(currencyField, 'E');
  await userEvent.click(screen.getByTestId('currency-input-optionEUR'));

  await userEvent.type(availableBanksField, 'cypress');
  await userEvent.click(
    screen.getByTestId('bank-input-optionRTGS:B:EU13951280')
  );

  await userEvent.type(ibanField, 'GB14567456');

  userEvent.click(screen.getByRole('button', { name: 'Add Bank Partner' }));
};

describe('AddBankPartnerTab', () => {
  it('should render add bank partner form', async () => {
    renderComponent();

    await waitFor(() =>
      expect(screen.getByText('Add Bank Partner')).toBeInTheDocument()
    );
  });

  it('should populate dropdowns with GET_BANK_PARTNER_DATA query data', async () => {
    renderComponent();

    await waitFor(() =>
      expect(
        screen.queryByTestId('add-bank-partner-loader')
      ).not.toBeInTheDocument()
    );

    userEvent.click(screen.getByTestId('currency-input'));

    expect(screen.getByTestId('currency-input-optionEUR')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('currency-input-optionEUR'));
    await userEvent.type(screen.getByTestId('bank-input'), 'cypress');

    expect(
      screen.getByTestId('bank-input-optionRTGS:B:EU13951280')
    ).toBeInTheDocument();
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

  describe('when submitting form', () => {
    it('should display success modal on successful response', async () => {
      renderComponent();

      await waitFor(() =>
        expect(
          screen.queryByTestId('add-bank-partner-loader')
        ).not.toBeInTheDocument()
      );

      await completeAndSubmitForm();

      await waitFor(() => {
        expect(
          screen.getByTestId('success-bank-partner-alert')
        ).toBeInTheDocument();
      });
    });

    it('should display error modal on error response', async () => {
      const createBankPartnerErrorMock = {
        request: {
          query: CREATE_BANK_PARTNER,
          variables: {
            values: {
              currency: 'GBP',
              bankPartner: {
                approvingBankDid: 'RTGS:B:EU13951280',
                iban: 'GB14567456',
                requestingBankDid: 'test-did',
              },
            },
          },
        },
        result: { data: { createBankPartner: { status: 'Failed' } } },
      };

      renderComponent([defaultMocks[0], createBankPartnerErrorMock]);

      await waitFor(() =>
        expect(
          screen.queryByTestId('add-bank-partner-loader')
        ).not.toBeInTheDocument()
      );

      await completeAndSubmitForm();

      await waitFor(() => {
        expect(
          screen.getByTestId('error-bank-partner-alert')
        ).toBeInTheDocument();
      });
    });
  });
});
