import {
  createBankPartner,
  getBankPartnerRequests,
  getBankPartners,
  getBankSummaries,
  getCountries,
  getCurrentBank,
  getForeignBanks,
  getTimezones,
} from './bank';

import { getUser } from './user';

const resolvers = {
  Query: {
    getBankPartnerRequests: (_: void, args: { bankDid: string }) =>
      getBankPartnerRequests(args.bankDid),
    getBankPartners: (
      _: void,
      args: { bankDid: string; filter: string; offset: number; limit: number }
    ) => getBankPartners(args.bankDid, args.filter, args.offset, args.limit),
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
    createBankPartner: (_: void, args: { values: any }) =>
      createBankPartner(args.values),
  },
};

export { resolvers };
