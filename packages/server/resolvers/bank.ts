const createBank = (bank: any) => {
  if (!bank) {
    return {
      status: 400,
      error: 'No bank supplied',
    };
  }

  // call api to create bank

  return {
    status: 200,
    error: '',
  };
};

const getBankSummaries = (term: string) => {
  if (!term) {
    return {
      status: 400,
      error: 'No search term supplied',
    };
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

export { createBank, getBankSummaries, getCountries, getTimezones };
