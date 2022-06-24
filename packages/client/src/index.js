import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

ReactDOM.render(
  <Router basename="/">
    <App>
      <Routes />
    </App>
  </Router>,
  document.getElementById('root')
);
