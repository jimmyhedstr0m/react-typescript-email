import React from 'react';
import classNames from 'classnames';

import { Props } from './types';
import styles from './styles.module.scss';

const Wrapper: React.FC<Props> = (props) => {
  const { as, children, className } = props;
  const Element = as || 'div';

  return (
    <Element
      className={classNames(
        styles.block,
        className
      )}
    >
      {children}
    </Element>
  );
};

export default Wrapper;