import React from 'react';

import { Props } from './types';

const Preheader: React.FC<Props> = (props) => {
  const { text } = props;
  return (
    <span className="preheader">
      {text}
    </span>
  );
};

export default Preheader;