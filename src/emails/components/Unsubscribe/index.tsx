import React from 'react';

import { Props } from './types';

const Unsubscribe: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <p className={className}>
      {`Don't like these annoying emails? `}
      <a href="https://google.com">
        <unsubscribe>
          Unsubscribe
        </unsubscribe>
      </a>.
    </p>
  );
};

export default Unsubscribe;