import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useQuery } from '@apollo/client';

import {
  BankPartnersTable,
  Dialog,
  Loader,
  SearchInput,
} from '@rtgs-global/components';
import { GET_BANK_PARTNERS } from '../gql/queries';

const mockBankPartners = [
  {
    holdingBankDid: 'RTGS:GB54321GBP',
    holdingBankName: 'MyBank',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'DEENE8OKE3FE6TS7WE8185GMBDF',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB826288GBP',
    holdingBankName: '406994',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'DET0YGE2Q9ISUY6JHHSX43',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB11235GBP',
    holdingBankName: 'Lewis 2022-04-21',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GB82LEWI20031897694326',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB1234512GBP',
    holdingBankName: 'newValue',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GB9K52IXJZTRVBDG9L009T',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:B:GB49620503',
    holdingBankName: 'cypressTestBank756536',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'DE04700500000003022274',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB938736G',
    holdingBankName: 'Jason third test bank',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GBH0IZ0',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB12521GBP',
    holdingBankName: 'GBP E2E tests Agent-3',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GBL83GBU457BE8OHAZAB2O',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB12346GBP',
    holdingBankName: 'Bank of Mario',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'SPL0I1TS4B',
    currency: 'NZD',
  },
  {
    holdingBankDid: 'RTGS:GB99996GBP',
    holdingBankName: 'Lewis Bank Four',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GB29LJI5E3BK9XCLRRRXE5MZ0UO',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB99998CAD',
    holdingBankName: 'BoBJCAD',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'CAJBUL4SEC7AUU8786O',
    currency: 'CAD',
  },
  {
    holdingBankDid: 'RTGS:GB12536H',
    holdingBankName: 'Jason fifth bank',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GB0FEBW',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB857205GBP',
    holdingBankName: '860776',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'DERPZ0XT37MP655JC7E13P',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB329460GBP',
    holdingBankName: 'cypresstestbank869987',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'DEISSR9YBJCAOC8YX2YJHW',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB12765F',
    holdingBankName: 'Jason fourth test bank',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GBSZXI5N',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB99994GBP',
    holdingBankName: 'Lewis Bank Six',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GB9LTH9TQ1HJAWCZF19NF93DFR1',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB12349CYPRESSGBP',
    holdingBankName: 'TestingCreating1',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GB5E8TGR1IPE4WO1K6DM14',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:GB179022GBPCYPRESS',
    holdingBankName: 'Jason Test Bank GBP 12',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GB75BARC20032694612696',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'RTGS:UK99999GBP',
    holdingBankName: 'LewisBank',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GBXLZT5D5T7UDXUYTRWNKT',
    currency: 'GBP',
  },
  {
    holdingBankDid: 'KM:JPY',
    holdingBankName: 'kanemochi',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'KMY2WTDBU2',
    currency: 'JPY',
  },
  {
    holdingBankDid: 'RTGS:GB99998GBP',
    holdingBankName: 'Lewis Bank',
    owningBankDid: 'AL:USD',
    owningBankName: 'Absolutely Loaded',
    iban: 'GBP98MDM3NL5GXEXM2G02T7V82G',
    currency: 'GBP',
  },
];

const BankPartnersTab = ({ bankDid }) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [partnerToDelete, setPartnerToDelete] = useState('');

  const {
    loading: bankPartnersLoading,
    error: bankPartnersError,
    data: bankPartners,
  } = useQuery(GET_BANK_PARTNERS, {
    variables: { bankDid, filter: searchFilter },
  });

  if (!bankPartnersError) {
    return 'Error retrieving bank partner data';
  }

  if (bankPartnersLoading) {
    return <Loader testId={'bank-partners-loader'} />;
  }

  return (
    <>
      <SearchInput
        testId="bank-partner-filter"
        placeholder={'Search for a bank'}
        onChange={setSearchFilter}
      />
      <BankPartnersTable
        testId={'bank-partners-table'}
        bankPartners={bankPartners || mockBankPartners}
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

BankPartnersTab.propTypes = {
  bankDid: PropTypes.string,
};

export default BankPartnersTab;
