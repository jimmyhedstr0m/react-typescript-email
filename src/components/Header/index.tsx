import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="header">
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