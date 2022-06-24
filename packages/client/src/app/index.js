import { PropTypes } from 'prop-types';
import { Layout } from '@rtgs-global/components';

import { routesConfig } from '../routesConfig';

const routes = routesConfig();

const App = ({ children }) => {
  const role = 'admin';

  return (
    <Layout routes={routes} role={role}>
      {children}
    </Layout>
  );
};

App.propTypes = {
  children: PropTypes.object,
};

export default App;
