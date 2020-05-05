import React from 'react';

import { Props } from './types';

const Divider: React.FC<Props> = (props) => {
  const { type } = props;
  return (
    <table className="divider-wrapper">
      <tr>
        <td className="divider-spacer">
          <table
            className={'divider divider-' + type}
            cellPadding="0"
            cellSpacing="0"
          >
            <tr>
              <td></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
};

export default Divider;