import { AddBank } from '@rtgs-global/components';

const AddBankTab = () => {
  // dummy props
  const bank = null;
  const conflictingFields = [];
  const timeZones = ['EUR'];
  const createBank = () => {};
  const resetStatus = () => {};
  const bankSummaries = [
    {
      csleid: '1234',
      name: 'test-bank',
      country: 'GBRs',
    },
  ];
  const onBankSearch = () => {};
  const bankInformation = {
    did: 'test-did',
    name: 'test-bank',
    sic: 'test-sic',
    bic: 'test-bic',
    lei: 'test-lei',
  };
  const onBankSelection = () => {};
  const loading = false;
  const bankSummariesLoading = false;
  const supportedCurrencies = ['Pound'];
  const resetBankInformation = () => {};
  const countries = [];
  // end

  return (
    <AddBank
      bank={bank}
      conflictingFields={conflictingFields}
      countries={countries}
      timeZones={timeZones}
      createBank={createBank}
      resetStatus={resetStatus}
      bankSummaries={bankSummaries}
      onBankSearch={onBankSearch}
      bankInformation={bankInformation}
      onBankSelection={onBankSelection}
      loading={loading}
      bankSummariesLoading={bankSummariesLoading}
      supportedCurrencies={supportedCurrencies}
      resetBankInformation={resetBankInformation}
    />
  );
};

export default AddBankTab;
