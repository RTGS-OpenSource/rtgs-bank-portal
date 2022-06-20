import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

ReactDOM.render(
  <Router basename="/">
    <Switch>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
