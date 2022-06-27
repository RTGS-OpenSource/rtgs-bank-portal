import { Heading, Tabs } from '@rtgs-global/components';
import { AddBankTab } from './components';

const { Tab } = Tabs;

const Banks = () => {
  return (
    <>
      <Heading headingLevel={1} text="Banks" />
      <Tabs initialIndex={1} testId="banks-tabs">
        <Tab name="Member Banks" index={1}>
          <Heading headingLevel={2} text="Manage Members Banks" />
          <div>Content</div>
        </Tab>
        <Tab name="New Bank" index={2}>
          <Heading text="Add a new bank" headingLevel={2} />
          <AddBankTab />
        </Tab>
      </Tabs>
    </>
  );
};

export default Banks;
