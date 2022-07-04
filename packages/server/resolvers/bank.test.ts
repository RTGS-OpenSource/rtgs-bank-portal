import {
  createBank,
  createBankPartner,
  getBankSummaries,
  getCountries,
  getCurrentBank,
  getForeignBanks,
  getTimezones,
} from './bank';

describe('bank resolver', () => {
  describe('createBank', () => {
    it('should throw if no bank supplied', () => {
      expect(() => createBank()).toThrow();
    });

    it(`should return 'Success' on success`, () => {
      const bank = {
        bankName: 'test-bank',
        bic: 'test-bic',
        countryCode: 'GB',
        currencyCode: 'GBP',
        iban: 'test-iban',
        lei: 'test-lei',
        sic: 'test-sic',
        timeZone: 'europe/london',
      };

      const result = createBank(bank);

      expect(result).toEqual({ status: 'Success' });
    });
  });

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

      const result = createBank(values);

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
