import React from 'react';
import classNames from 'classnames';

import { Props } from './types';

const Footer: React.FC<Props> = (props) => {
  const { children, className } = props;
  return (
    <div
      className={classNames(
        'footer',
        className
      )}
    >
      <table>
        <tr>
          <td className="align-center">
            {children}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Footer;