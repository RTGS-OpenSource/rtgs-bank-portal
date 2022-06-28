import { getUser } from './user';

describe('user resolver', () => {
  describe('getUser', () => {
    it('should return user', () => {
      const result = getUser();

      expect(result).toEqual({
        role: 'ADMIN',
        supportedCurrencies: ['JPY', 'GBP', 'EUR', 'USD'],
      });
    });
  });
});
