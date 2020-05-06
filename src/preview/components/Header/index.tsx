import React from 'react';
import classNames from 'classnames';

import { Props } from './types';
import styles from './styles.module.scss';
import Wrapper from '../Wrapper';

const Header: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <header
      className={classNames(
        styles.block,
        className
      )}
    >
      <Wrapper className={styles.wrapper}>
        <span className={styles.logo}>
          React Typescript Email
        </span>
      </Wrapper>
    </header>
  );
};

export default Header;