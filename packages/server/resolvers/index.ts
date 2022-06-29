import {
  createBank,
  getBankSummaries,
  getTimezones,
  getCountries,
} from './bank';

import { getUser } from './user';

const resolvers = {
  Query: {
    getBankSummaries: (_: void, args: { term: string }) =>
      getBankSummaries(args.term),
    getTimezones,
    getCountries,
    getUser,
  },
  Mutation: {
    createBank: (_: void, args: { bank: any }) => createBank(args.bank),
  },
};

export { resolvers };
