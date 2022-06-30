import { gql } from '@apollo/client';

export const CREATE_BANK_PARTNER = gql`
  mutation CreateBankPartner($values: CreateBankPartnerInput!) {
    createBankPartner(values: $values) {
      status
    }
  }
`;
