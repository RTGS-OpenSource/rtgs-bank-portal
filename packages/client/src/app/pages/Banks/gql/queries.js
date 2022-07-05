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

export const GET_BANK_PARTNERS = gql`
  query GetBankPartners(
    $bankDid: String!
    $filter: String!
    $offset: Int
    $limit: Int
  ) {
    getBankPartners(
      bankDid: $bankDid
      filter: $filter
      offset: $offset
      limit: $limit
    ) {
      holdingBankDid
      holdingBankName
      owningBankDid
      owningBankName
      iban
      currency
    }
  }
`;
