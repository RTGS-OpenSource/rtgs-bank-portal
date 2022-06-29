import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';

import { AddBankPartner, Loader } from '@rtgs-global/components';
import { CREATE_BANK_PARTNER } from '../gql/mutations';
import { GET_BANK_PARTNER_DATA } from '../gql/queries';

const AddBankPartnerTab = ({ currentBankDid, currency }) => {
  const {
    loading: bankPartnerDataLoading,
    error: bankPartnerDataError,
    data: bankPartnerData,
  } = useQuery(GET_BANK_PARTNER_DATA, {
    variables: { bankDid: currentBankDid, currency },
  });

  const [
    createBankPartnerMutation,
    {
      loading: createBankPartnerLoading,
      error: createBankPartnerError,
      data: createBankPartnerResponse,
    },
  ] = useMutation(CREATE_BANK_PARTNER);

  const [createBankPartnerResult, setCreateBankPartnerResult] = useState(null);
  const [foreignBanksResult, setForeignBanksResult] = useState(null);

  useEffect(() => {
    if (bankPartnerData && bankPartnerData.getForeignBanks) {
      setForeignBanksResult({
        successful: true,
        data: bankPartnerData.getForeignBanks,
      });
    }
  }, [bankPartnerData]);

  useEffect(() => {
    if (createBankPartnerResponse) {
      const success =
        createBankPartnerResponse.createBankPartner.status === 'Success';
      if (success) {
        setCreateBankPartnerResult({
          successful: true,
        });
      }

      if (!success || createBankPartnerError) {
        setCreateBankPartnerResult({
          successful: false,
          errorMessage: 'Error creating bank partner',
        });
      }
    }
  }, [createBankPartnerResponse, createBankPartnerError]);

  if (bankPartnerDataError) {
    return 'Error retrieving form data';
  }

  const createBankPartner = (formData) => {
    createBankPartnerMutation({ variables: { values: formData } });
  };

  if (bankPartnerDataLoading || createBankPartnerLoading) {
    return <Loader testId={'add-bank-partner-loader'} />;
  }

  const {
    getUser: { supportedCurrencies },
  } = bankPartnerData;

  return (
    <>
      <AddBankPartner
        getForeignBanks={() => {}}
        createBankPartner={createBankPartner}
        bankDid={currentBankDid}
        jurisdiction={currency}
        getForeignBanksResult={foreignBanksResult}
        createBankPartnerResult={createBankPartnerResult}
        createBankPartnerResultReceived={() => {}}
        supportedCurrencies={supportedCurrencies}
      />
    </>
  );
};

AddBankPartnerTab.propTypes = {
  currentBankDid: PropTypes.string,
  currency: PropTypes.string,
};

export default AddBankPartnerTab;
