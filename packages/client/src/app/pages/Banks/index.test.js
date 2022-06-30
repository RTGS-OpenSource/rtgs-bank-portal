import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { GET_CURRENT_BANK } from './gql/queries';

import Banks from './';

const getCurrentBankCall = jest.fn();

const mocks = [
  {
    request: {
      query: GET_CURRENT_BANK,
      variables: {
        bankDid: 'test-id',
      },
    },
    result: () => {
      getCurrentBankCall();
      return {
        data: {
          getCurrentBank: {
            currency: 'GBP',
          },
        },
      };
    },
  },
];

const renderComponent = () => {
  render(
    <MockedProvider mocks={mocks}>
      <Banks />
    </MockedProvider>
  );
};

describe('banks page', () => {
  it('should render page', () => {
    renderComponent();

    waitFor(() => expect(screen.getByText('Banks')).toBeInTheDocument());
  });

  it('should query GET_CURRENT_BANK on load', () => {
    renderComponent();

    waitFor(() => expect(getCurrentBankCall).toHaveBeenCalled());
  });

  it('should render tabs', () => {
    renderComponent();

    waitFor(() => expect(screen.getByTestId('banks-tabs')).toBeInTheDocument());
  });
});
