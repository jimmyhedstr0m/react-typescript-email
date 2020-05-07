import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import '../../assets/styles/styles.scss';
import styles from './styles.module.scss';
import Header from '../Header';
import FrontPage from '../../pages/FrontPage';

const App: React.FC = () => {
  return (
    <>
      <Helmet
        defaultTitle="react-typescript-email"
        htmlAttributes={{
          dir: 'ltr',
          lang: 'en',
        }}
      >
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Create and serve email templates on the fly with Node Express and React." />
      </Helmet>

      <Header />

      <main className={styles.main}>
        <Switch>
          <Route exact={true} path="/" component={FrontPage} />
          <Route exact={true} path="/:name" component={FrontPage} />
        </Switch>
      </main>
    </>
  );
};

export default App;