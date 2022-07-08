import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { BankPartnerRequests, Loader } from '@rtgs-global/components';

import { GET_BANK_PARTNER_REQUESTS } from '../gql/queries';

// mocked
const approveBankPartnerResult = null;
const rejectBankPartnerResult = null;
const approveBankPartner = () => {};
const rejectBankPartner = () => {};
// end

const BankPartnerRequestsTab = ({ bankDid, currency }) => {
  const {
    error: bankPartnerRequestsError,
    loading: bankPartnerRequestsLoading,
    data: bankPartnerRequests,
  } = useQuery(GET_BANK_PARTNER_REQUESTS, { variables: { bankDid } });

  if (bankPartnerRequestsError) {
    return 'Error retrieving bank partner requests data';
  }

  if (bankPartnerRequestsLoading || !bankPartnerRequests) {
    return <Loader testId={'bank-partners-loader'} />;
  }

  return (
    <BankPartnerRequests
      getBankPartnerRequests={() => {}}
      getBankPartnerRequestsResult={{
        data: bankPartnerRequests.getBankPartnerRequests,
      }}
      bankDid={bankDid}
      jurisdiction={currency}
      approveBankPartner={approveBankPartner}
      rejectBankPartner={rejectBankPartner}
      approveBankPartnerResult={approveBankPartnerResult}
      rejectBankPartnerResult={rejectBankPartnerResult}
    />
  );
};

BankPartnerRequestsTab.propTypes = {
  bankDid: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default BankPartnerRequestsTab;
