import { ApolloError } from 'apollo-server-errors';

const createBank = (bank: any) => {
  if (!bank) {
    throw new ApolloError('No bank supplied', 'BAD_USER_INPUT');
  }

  // call api to create bank

  return {
    status: 'Success',
  };
};

const createBankPartner = (values: any) => {
  if (!values) {
    throw new ApolloError('No values supplied', 'BAD_USER_INPUT');
  }

  // call api to create bank partner

  return {
    status: 'Success',
  };
};

const getBankSummaries = (term: string) => {
  if (!term) {
    throw new ApolloError('No term supplied', 'BAD_USER_INPUT');
  }

  // call endpoint to get summaries from supplied term

  return [
    {
      country: 'Cn',
      csleid: 'some-csleid',
      name: 'Test bank',
    },
  ];
};

const getCountries = () => {
  // get countries
  return [
    {
      code: 'JP',
      name: 'Japan',
    },
    {
      code: 'GB',
      name: 'United Kingdom',
    },
    {
      code: 'US',
      name: 'United States of America',
    },
  ];
};

const getTimezones = () => {
  // get timezones
  return ['Asia/Tokyo', 'Europe/London', 'America/New_York'];
};

const getForeignBanks = (bankDid: string, currency: string) => {
  if (!bankDid || !currency) {
    throw new ApolloError('No bankDid or currency supplied', 'BAD_USER_INPUT');
  }

  return [
    {
      bankDid: 'RTGS:B:GB13951280',
      bankName: 'cypressTestBank678362',
      currency: 'GBP',
    },
    {
      bankDid: 'RTGS:B:GB20027710',
      bankName: 'cypressTestBank405236',
      currency: 'GBP',
    },
    {
      bankDid: 'RTGS:B:GB32490351',
      bankName: 'cypressTestBank447676',
      currency: 'GBP',
    },
    {
      bankDid: 'RTGS:B:GB33652306',
      bankName: 'MK Test Bank',
      currency: 'GBP',
    },
  ];
};

const getCurrentBank = (bankDid: string) => {
  if (!bankDid) {
    throw new ApolloError('No bankDid supplied', 'BAD_USER_INPUT');
  }

  return {
    bankCheckCredentialsIssued: true,
    currency: 'USD',
    holdingBankDid: 'AL:USD',
    holdingBankName: 'Absolutely Loaded',
    iban: 'AL12345678',
    isLiquidity: true,
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    participantCredentialsIssued: true,
    status: 'Online',
  };
};

export {
  createBank,
  createBankPartner,
  getBankSummaries,
  getCountries,
  getCurrentBank,
  getForeignBanks,
  getTimezones,
};
