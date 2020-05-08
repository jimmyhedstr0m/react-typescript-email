import React from 'react';
import classNames from 'classnames';

import { Props } from './types';

const Header: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <div
      className={classNames(
        'header',
        className
      )}
    >
      <table>
        <tr>
          <td className="align-center">
            <a href="http://www.mailgun.com">
              <img
                alt="Mailgun"
                height="50"
                src="https://raw.githubusercontent.com/mailgun/media/master/Mailgun_Primary.png"
              />
            </a>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Header;