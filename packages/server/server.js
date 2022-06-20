import http from 'http';
import { app } from './app.js';

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

const server = http.createServer(app);

try {
  console.log('Starting server...');

  server.listen(port, () => {
    // eslint-disable-next-line no-undef
    console.log('env : ', process.env.NODE_ENV || 'development');
    console.log(`App started on port ${port}`);
  });
} catch (e) {
  console.error('Startup error!', e);
}
