import { Route, Switch } from 'react-router-dom';

import { Banks, Home } from './app/pages';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/banks">
      <Banks />
    </Route>
  </Switch>
);

export default Routes;
