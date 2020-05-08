import React from 'react';
import classNames from 'classnames';

import { Props } from './types';

const Mail: React.FC<Props> = (props) => {
  const { children, className, preheader } = props;
  return (
    <table
      className={classNames(
        'body',
        className
      )}
    >
      <tr>
        <td />
        <td className="container">
          <div className="content">
            <span className="preheader">
              {preheader}
            </span>

            {children}
          </div>
        </td>
        <td />
      </tr>
    </table>
  );
};

export default Mail;