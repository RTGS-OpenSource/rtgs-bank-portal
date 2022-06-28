import { gql } from 'apollo-server';

const typeDefs = gql`
  enum UserRole {
    ADMIN
    SECURITY_OFFICER
  }

  enum Currency {
    GBP
    USD
    JPY
    EUR
  }

  type User {
    role: UserRole
    supportedCurrencies: [Currency]
  }

  type BankSummary {
    country: String
    csleid: String
    name: String
  }

  type Country {
    code: String
    name: String
  }

  type Query {
    getBankSummaries(term: String!): [BankSummary]
    getTimezones: [String]
    getCountries: [Country]
    getUser: User
  }

  type CreateBankResponse {
    status: Int
    error: String
  }

  input CreateBankInput {
    bankName: String
    bic: String
    countryCode: String
    currencyCode: String
    iban: String
    lei: String
    sic: String
    timeZone: String
  }

  type Mutation {
    createBank(bank: CreateBankInput!): CreateBankResponse
  }
`;

export { typeDefs };
