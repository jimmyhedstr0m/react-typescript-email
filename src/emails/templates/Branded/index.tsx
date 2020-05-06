import React from 'react';

import { Props } from './types';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Preheader from '../../components/Preheader';

const Branded: React.FC<Props> = (props) => {
  const { name } = props.data;
  return (
    <>
      <Preheader text="This is preheader text. Some clients will show this text as a preview." />

      <Header />

      <table className="main">
        <tr>
          <td className="wrapper">
            <table>
              <tr>
                <td>
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

export default Branded;