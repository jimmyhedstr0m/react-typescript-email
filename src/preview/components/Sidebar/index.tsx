import React from 'react';
import classNames from 'classnames';

import { Props } from './types';
import styles from './styles.module.scss';
import SidebarItem from '../SidebarItem';

const Sidebar: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <div
      className={classNames(
        styles.block,
        className
      )}
    >
      <ul className={styles.list}>
        <li className={styles.item}>
          <SidebarItem />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;