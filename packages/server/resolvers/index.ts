import {
  createBank,
  createBankPartner,
  getBankSummaries,
  getCountries,
  getCurrentBank,
  getForeignBanks,
  getTimezones,
} from './bank';

import { getUser } from './user';

const resolvers = {
  Query: {
    getBankSummaries: (_: void, args: { term: string }) =>
      getBankSummaries(args.term),
    getCurrentBank: (_: void, args: { bankDid: string }) =>
      getCurrentBank(args.bankDid),
    getCountries,
    getForeignBanks: (
      _: void,
      { bankDid, currency }: { bankDid: string; currency: string }
    ) => getForeignBanks(bankDid, currency),
    getTimezones,
    getUser,
  },
  Mutation: {
    createBank: (_: void, args: { bank: any }) => createBank(args.bank),
    createBankPartner: (_: void, args: { values: any }) =>
      createBankPartner(args.values),
  },
};

export { resolvers };
