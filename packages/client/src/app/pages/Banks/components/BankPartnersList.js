import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useLazyQuery } from '@apollo/client';

import { BankPartnersTable, Dialog, Loader } from '@rtgs-global/components';
import { GET_BANK_PARTNERS } from '../gql/queries';

const BankPartnersList = ({ bankDid, filter }) => {
  const [partnerToDelete, setPartnerToDelete] = useState('');

  const [
    getBankPartners,
    {
      loading: bankPartnersLoading,
      error: bankPartnersError,
      data: bankPartners,
    },
  ] = useLazyQuery(GET_BANK_PARTNERS);

  useEffect(() => {
    getBankPartners({ variables: { bankDid, filter } });
  }, [filter]);

  if (bankPartnersError) {
    return 'Error retrieving bank partner data';
  }

  if (bankPartnersLoading || !bankPartners) {
    return <Loader testId={'bank-partners-loader'} />;
  }

  const { getBankPartners: bankPartnersResult } = bankPartners;

  return (
    <>
      <BankPartnersTable
        testId={'bank-partners-table'}
        bankPartners={bankPartnersResult}
        loading={bankPartnersLoading}
        showDelete
        onClickDelete={(bankPartner) => {
          setPartnerToDelete(bankPartner);
        }}
      />
      {!!partnerToDelete && (
        <Dialog
          // locked={deleting}
          show
          bodyText="Are you sure you want to delete the bank partner?"
          okButtonText="Yes"
          cancelButtonText="No"
          testId="bank-partner-delete-dialog"
          // onClick={() => {
          //   setDeleting(true);
          //   onDeleteBankPartner(partnerToDelete);
          // }}
          onClickClose={() => {
            setPartnerToDelete(undefined);
          }}
        />
      )}
    </>
  );
};

BankPartnersList.propTypes = {
  bankDid: PropTypes.string.isRequired,
  filter: PropTypes.string,
};

export default BankPartnersList;
