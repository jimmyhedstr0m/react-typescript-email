import React from 'react';
import classNames from 'classnames';

import { Props } from './types';

const Divider: React.FC<Props> = (props) => {
  const { className, type } = props;
  return (
    <table
      className={classNames(
        'divider-wrapper',
        className
      )}
    >
      <tr>
        <td className="divider-spacer">
          <table
            className={'divider divider-' + type}
            cellPadding="0"
            cellSpacing="0"
          >
            <tr>
              <td />
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
};

export default Divider;