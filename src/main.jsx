import ErrorBoundary from '@components/common/ErrorBoundry';
import '@styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './locales/i18n';
import './main.css';
import Routes from './routes';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
