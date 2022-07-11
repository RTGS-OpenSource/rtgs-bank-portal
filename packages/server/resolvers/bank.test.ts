import {
  createBankPartner,
  getBankPartnerRequests,
  getBankSummaries,
  getCountries,
  getCurrentBank,
  getForeignBanks,
  getTimezones,
} from './bank';

describe('bank resolver', () => {
  describe('createBankPartner', () => {
    it('should throw if no values supplied', () => {
      expect(() => createBankPartner()).toThrow();
    });

    it(`should return 'Success' on success`, () => {
      const values = {
        currency: 'GBP',
        bankPartner: {
          approvingBankDid: 'test-approver-did',
          iban: 'test-iban',
          requestingBankDid: 'test-requesting-bank-did',
        },
      };

      const result = createBankPartner(values);

      expect(result).toEqual({ status: 'Success' });
    });
  });

  describe('getCurrentBank', () => {
    it('should throw if no bankDid supplied', () => {
      expect(() => getCurrentBank()).toThrow();
    });

    it('should return current bank on success', () => {
      const result = getCurrentBank('testBankDid');

      expect(result).toEqual({
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
      });
    });
  });

  describe('getBankPartnerRequests', () => {
    it('should throw if no bankDid supplied', () => {
      expect(() => getBankPartnerRequests(null, 'GBP')).toThrow();
    });

    it('should return bank partner requests on success', () => {
      const result = getBankPartnerRequests('testBankDid');

      expect(result).toEqual([
        {
          holdingBankDid: 'RTGS:GB368650GBPCYPRESS',
          holdingBankName: 'Jason Test Bank GBP 2',
          owningBankDid: 'Test-bank-did',
          owningBankName: 'Absolutely Loaded',
          iban: 'GB83BARC20037824333683',
          currency: 'GBP',
        },
        {
          holdingBankDid: 'RTGS:GB1444312B',
          holdingBankName: 'BankCheck Test Bank',
          owningBankDid: 'Test-bank-did',
          owningBankName: 'Absolutely Loaded',
          iban: 'fsdflkj2423',
          currency: 'USD',
        },
        {
          holdingBankDid: 'RTGS:GB802834GBPCYPRESS',
          holdingBankName: 'Jason Test Bank GBP 3',
          owningBankDid: 'Test-bank-did',
          owningBankName: 'Absolutely Loaded',
          iban: 'GB87BARC20037872988423',
          currency: 'GBP',
        },
        {
          holdingBankDid: 'Test-bank-did',
          holdingBankName: 'Absolutely Loaded',
          owningBankDid: 'RTGS:B:GB19857663',
          owningBankName: 'cypressTestBank299542',
          iban: 'DE11700500000002529873',
          currency: 'USD',
        },
        {
          holdingBankDid: 'Test-bank-did',
          holdingBankName: 'Absolutely Loaded',
          owningBankDid: 'RTGS:B:GB22150197',
          owningBankName: 'cypressTestBank395359',
          iban: 'DE62700500000001140594',
          currency: 'USD',
        },
        {
          holdingBankDid: 'Test-bank-did',
          holdingBankName: 'Absolutely Loaded',
          owningBankDid: 'RTGS:B:GB80072010',
          owningBankName: 'cypressTestBank642175',
          iban: 'DE22700500000005921280',
          currency: 'USD',
        },
        {
          holdingBankDid: 'Test-bank-did',
          holdingBankName: 'Absolutely Loaded',
          owningBankDid: 'RTGS:B:GB94379716',
          owningBankName: 'cypressTestBank260704',
          iban: 'DE74700500000004532953',
          currency: 'USD',
        },
        {
          holdingBankDid: 'Test-bank-did',
          holdingBankName: 'Absolutely Loaded',
          owningBankDid: 'RTGS:GB08022022B',
          owningBankName: 'Bank GBP',
          iban: 'JH389889898',
          currency: 'USD',
        },
        {
          holdingBankDid: 'Test-bank-did',
          holdingBankName: 'Absolutely Loaded',
          owningBankDid: 'RTGS:GB230220221B',
          owningBankName: 'Mo 21',
          iban: 'HG768768768768976',
          currency: 'USD',
        },
      ]);
    });
  });

  describe('getForeignBanks', () => {
    it('should throw if no bankDid supplied', () => {
      expect(() => getForeignBanks(null, 'GBP')).toThrow();
    });

    it('should throw if no currency supplied', () => {
      expect(() => getForeignBanks('testBankDid', null)).toThrow();
    });

    it('should return foreign banks on success', () => {
      const result = getForeignBanks('testBankDid', 'GBP');

      expect(result).toEqual([
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
      ]);
    });
  });

  describe('getBankSummaries', () => {
    it('should throw if no term supplied', () => {
      expect(() => getBankSummaries()).toThrow();
    });

    it('should return bank summaries on success', () => {
      const result = getBankSummaries('some bank');

      expect(result).toEqual([
        {
          country: 'Cn',
          csleid: 'some-csleid',
          name: 'Test bank',
        },
      ]);
    });
  });

  describe('getTimezones', () => {
    it('should return timezones', () => {
      const result = getTimezones();

      expect(result).toEqual([
        'Asia/Tokyo',
        'Europe/London',
        'America/New_York',
      ]);
    });
  });

  describe('getCountries', () => {
    it('should return countries', () => {
      const result = getCountries();

      expect(result).toEqual([
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
      ]);
    });
  });
});
