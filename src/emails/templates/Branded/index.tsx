import React from 'react';

import { Props } from './types';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import Footer from '../../components/Footer';
import Main from '../../components/Main';
import Header from '../../components/Header';
import Mail from '../../components/Mail';
import Unsubscribe from '../../components/Unsubscribe';

const Branded: React.FC<Props> = (props) => {
  const { name } = props.data;
  return (
    <Mail preheader="This is preheader text. Some clients will show this text as a preview.">
      <Header />

      <Main>
        <h1>
          {name
            ? `Hello ${name}!`
            : 'Hello!'
          }
        </h1>
        <p>Example of an email with image asset.</p>
        <p>You should upload your email images to a CDN.</p>
        <p>Should come in handy for branded transactional emails or promotional type emails.</p>

        <Divider />

        <Button
          title="Click here for CTA"
          type="primary"
          to="https://google.com"
        >
          Click here for CTA
        </Button>
      </Main>

      <Footer>
        <Unsubscribe />
      </Footer>
    </Mail>
  );
};

export default Branded;