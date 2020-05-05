import React from 'react';

const Footer: React.FC = (props) => {
  const { children } = props;
  return (
    <div className="footer">
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