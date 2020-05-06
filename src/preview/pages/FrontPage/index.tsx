import React from 'react';
import classNames from 'classnames';

import { Props } from './types';
import styles from './styles.module.scss';

const FrontPage: React.FC<Props> = () => {
  return (
    <div className={styles.block}>
      FrontPage
    </div>
  );
};

export default FrontPage;