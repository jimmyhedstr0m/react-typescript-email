import React from 'react';
import classNames from 'classnames';

import { Props } from './types';

const Main: React.FC<Props> = (props) => {
  const { children, className } = props;
  return (
    <table
      className={classNames(
        'main',
        className
      )}
    >
      <tr>
        <td className="wrapper">
          <table>
            <tr>
              <td>
                {children}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
};

export default Main;