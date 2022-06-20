import { Heading, Layout } from '@rtgs-global/components';

import { routesConfig } from '../routes';

const routes = routesConfig();

const App = () => {
  const role = 'admin';

  return (
    <Layout routes={routes} role={role}>
      <Heading headingLevel={1} text={'Home'} />
    </Layout>
  );
};

export default App;
