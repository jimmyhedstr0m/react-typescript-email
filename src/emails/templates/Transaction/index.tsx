import React from 'react';

import { Props } from './types';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Preheader from '../../components/Preheader';

const Transaction: React.FC<Props> = (props) => {
  return (
    <>
      <Preheader text="This is preheader text. Some clients will show this text as a preview." />
      <table className="main">
        <tr>
          <td className="wrapper">
            <table>
              <tr>
                <td>
                  <h1 className="align-center">Simple responsive HTML email template</h1>
                  <p>Hi there,</p>
                  <p>Sometimes you just want to send a simple HTML email with a basic design.</p>
                  <p>This is a really simple email template. It's sole purpose is to get you to click the button below.</p>
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
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <Footer>
        <p>
          {`Don't like these annoying emails? `}
          <a href="https://google.com">
            <unsubscribe>
              Unsubscribe
            </unsubscribe>
          </a>.
        </p>
      </Footer>
    </>
  );
};

export default Transaction;