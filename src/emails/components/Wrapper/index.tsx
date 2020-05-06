import React from 'react';

const Wrapper: React.FC = (props) => {
  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default Wrapper;