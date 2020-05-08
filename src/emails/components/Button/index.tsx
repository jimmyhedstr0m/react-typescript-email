import React from 'react';
import classNames from 'classnames';

import { Props } from './types';

const Button: React.FC<Props> = (props) => {
  const { align, children, className, title, to, type } = props;
  return (
    <table
      className={classNames(
        'btn',
        'btn-' + type,
        className
      )}
      cellPadding="0"
      cellSpacing="0"
    >
      <tr>
        <td align={align}>
          <table
            cellPadding="0"
            cellSpacing="0"
          >
            <tr>
              <td>
                <a
                  href={to}
                  title={title}
                >
                  {children}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
};

export default Button;