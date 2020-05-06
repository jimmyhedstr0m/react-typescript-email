import 'react-app-polyfill/ie11';
import 'ts-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import App from './preview/components/App';

if (process.env.NODE_ENV === 'production') {
  /* tslint:disable:no-empty */
  window.console.log = () => { };
  window.console.info = () => { };
  window.console.error = () => { };
}

hydrate(
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>,
  document.getElementById('app-root')
);

if (module.hot) {
  module.hot.accept('./preview/components/App', () => {
    hydrate(
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>,
      document.getElementById('app-root')
    );
  });
}
