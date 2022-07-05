import { useQuery } from '@apollo/client';

import { Heading, Loader, Tabs } from '@rtgs-global/components';
import { AddBankPartnerTab, BankPartnersTab } from './components';
import { GET_CURRENT_BANK } from './gql/queries';

const { Tab } = Tabs;

// mock bank DID
const currentBankDid = 'Test-bank-did';

const Banks = () => {
  const {
    loading: currentBankLoading,
    error: currentBankError,
    data: currentBank,
  } = useQuery(GET_CURRENT_BANK, {
    variables: { bankDid: currentBankDid },
  });

  if (currentBankLoading) {
    return <Loader />;
  }

  if (currentBankError) {
    return 'Error getting current bank data';
  }

  const { currency } = currentBank.getCurrentBank;

  return (
    <>
      <Heading headingLevel={1} text="Banks" />
      <Tabs initialIndex={1} testId="banks-tabs">
        <Tab name="Bank partners" index={1}>
          <Heading headingLevel={2} text="Manage Members Banks" />
          <BankPartnersTab />
        </Tab>
        <Tab name="New Bank" index={2}>
          <Heading text="Add bank partner" headingLevel={2} />
          <AddBankPartnerTab
            currentBankDid={currentBankDid}
            currency={currency}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default Banks;
