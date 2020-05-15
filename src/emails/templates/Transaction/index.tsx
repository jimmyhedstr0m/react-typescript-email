import React from 'react';

import { Props } from './types';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Mail from '../../components/Mail';
import Main from '../../components/Main';
import Unsubscribe from '../../components/Unsubscribe';

const Transaction: React.FC<Props> = (props) => {
  return (
    <Mail
      mode={props.mode}
      preheader="This is preheader text. Some clients will show this text as a preview."
    >
      <Main>
        <h1 className="align-center">Simple responsive HTML email template</h1>
        <p>Hi there,</p>
        <p>Sometimes you just want to send a simple HTML email with a basic design.</p>
        <p>
          This is a really simple email template.
          It's sole purpose is to get you to click the button below.
        </p>
        <p>All the information you need is on GitHub.</p>

        <Button
          align="center"
          title="View the source on GitHub"
          type="primary"
          to="https://github.com/userapan/react-typescript-email"
        >
          View the source on GitHub
        </Button>

        <p>Feel free to use, copy, modify this email template as you wish.</p>
        <p>Thanks, have a lovely day.</p>
      </Main>

      <Footer>
        <Unsubscribe />
      </Footer>
    </Mail>
  );
};

export default Transaction;