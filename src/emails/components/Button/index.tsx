import React from 'react';

import { Props } from './types';

const Button: React.FC<Props> = (props) => {
  const { align, children, title, to, type } = props;
  return (
    <table
      className={'btn btn-' + type}
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