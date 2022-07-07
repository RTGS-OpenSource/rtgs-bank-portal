import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

import Routes from './routes';

const API_URL = process.env.API_URL || 'http://localhost:4000';

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getBankPartners: offsetLimitPagination(),
        },
      },
    },
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router basename="/">
      <App>
        <Routes />
      </App>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
