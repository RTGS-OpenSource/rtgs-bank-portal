import {
  createBank,
  getBankSummaries,
  getTimezones,
  getCountries,
} from './bank';

describe('bank resolver', () => {
  describe('createBank', () => {
    it('should return 400 if no bank supplied', () => {
      const result = createBank();

      expect(result).toEqual({
        status: 400,
        error: 'No bank supplied',
      });
    });

    it('should return 200 on success', () => {
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

      expect(result).toEqual({
        status: 200,
        error: '',
      });
    });
  });

  describe('getBankSummaries', () => {
    it('should return 400 if no term supplied', () => {
      const result = getBankSummaries();

      expect(result).toEqual({
        status: 400,
        error: 'No search term supplied',
      });
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
