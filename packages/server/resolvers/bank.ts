import { ApolloError } from 'apollo-server-errors';

import { mockResponses } from './mocks';

const createBankPartner = (values: any) => {
  if (!values) {
    throw new ApolloError('No values supplied', 'BAD_USER_INPUT');
  }

  // call api to create bank partner

  return {
    status: 'Success',
  };
};

const getBankPartners = (
  bankDid: string,
  filter: string,
  offset: number,
  limit: number
) => {
  if (!bankDid) {
    throw new ApolloError('No bankDid supplied', 'BAD_USER_INPUT');
  }

  // get bankPartners by bankDid
  let results = mockResponses.bankPartners;

  if (filter) {
    results = mockResponses.bankPartners.filter(
      (partner) =>
        partner.holdingBankName.toLowerCase().includes(filter.toLowerCase()) ||
        partner.holdingBankDid.toLowerCase().includes(filter.toLowerCase()) ||
        partner.iban.toLowerCase().includes(filter.toLowerCase())
    );
  }

  if ((offset || offset === 0) && limit) {
    return results.slice(offset, offset + limit);
  }

  return results;
};

const getBankPartnerRequests = (bankDid: string) => {
  if (!bankDid) {
    throw new ApolloError('No bankDid supplied', 'BAD_USER_INPUT');
  }

  return mockResponses.bankPartnerRequests;
};

const getBankSummaries = (term: string) => {
  if (!term) {
    throw new ApolloError('No term supplied', 'BAD_USER_INPUT');
  }

  // call endpoint to get summaries from supplied term

  return mockResponses.bankSummaries;
};

const getCountries = () => {
  // get countries
  return mockResponses.countries;
};

const getTimezones = () => {
  // get timezones
  return ['Asia/Tokyo', 'Europe/London', 'America/New_York'];
};

const getForeignBanks = (bankDid: string, currency: string) => {
  if (!bankDid || !currency) {
    throw new ApolloError('No bankDid or currency supplied', 'BAD_USER_INPUT');
  }

  return mockResponses.foreignBanks;
};

const getCurrentBank = (bankDid: string) => {
  if (!bankDid) {
    throw new ApolloError('No bankDid supplied', 'BAD_USER_INPUT');
  }

  return mockResponses.currentBank;
};

export {
  createBankPartner,
  getBankPartnerRequests,
  getBankPartners,
  getBankSummaries,
  getCountries,
  getCurrentBank,
  getForeignBanks,
  getTimezones,
};
