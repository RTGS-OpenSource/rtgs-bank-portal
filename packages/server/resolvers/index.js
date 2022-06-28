import {
  createBank,
  getBankSummaries,
  getTimezones,
  getCountries,
} from './bank.js';

import { getUser } from './user.js';

const resolvers = {
  Query: {
    getBankSummaries: (_, args) => getBankSummaries(args.term),
    getTimezones,
    getCountries,
    getUser,
  },
  Mutation: {
    createBank: (_, args) => createBank(args.bank),
  },
};

export { resolvers };
