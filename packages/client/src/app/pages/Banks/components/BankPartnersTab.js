import { useState } from 'react';
import { PropTypes } from 'prop-types';
import debounce from 'lodash.debounce';

import { SearchInput } from '@rtgs-global/components';

import { BankPartnersList } from './';

const BankPartnersTab = ({ bankDid }) => {
  const [searchFilter, setSearchFilter] = useState('');

  const debouncedSearchTermUpdate = debounce((term) => {
    setSearchFilter(term);
  }, 700);

  return (
    <>
      <SearchInput
        testId="bank-partner-filter"
        placeholder={'Search for a bank'}
        onChange={debouncedSearchTermUpdate}
        value={searchFilter}
      />
      <BankPartnersList bankDid={bankDid} filter={searchFilter} />
    </>
  );
};

BankPartnersTab.propTypes = {
  bankDid: PropTypes.string,
};

export default BankPartnersTab;
