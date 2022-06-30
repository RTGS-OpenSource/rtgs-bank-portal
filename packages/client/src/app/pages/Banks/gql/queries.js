import { gql } from '@apollo/client';

export const GET_CURRENT_BANK = gql`
  query getCurrentBank($bankDid: String!) {
    getCurrentBank(bankDid: $bankDid) {
      iban
      currency
    }
  }
`;

export const GET_BANK_PARTNER_DATA = gql`
  query GetAddBankPartnerData($bankDid: String!, $currency: String!) {
    getForeignBanks(bankDid: $bankDid, currency: $currency) {
      bankDid
      bankName
      currency
    }
    getUser {
      supportedCurrencies
    }
  }
`;
