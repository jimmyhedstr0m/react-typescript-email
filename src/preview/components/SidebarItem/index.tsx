import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { format } from 'date-fns';

import { Props } from './types';
import styles from './styles.module.scss';

const SidebarItem: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <Link
      className={classNames(
        styles.block,
        className
        // { [styles.active]: location.pathname === '/' }
      )}
      to="/"
    >
      <div className={styles.header}>
        <span className={styles.from}>
          Branded Template
        </span>
        <span className={styles.date}>
          {format(new Date(), 'y-LL-dd')}
        </span>
      </div>
      <span className={styles.subject}>
        Branded
      </span>
      <span className={styles.summary}>
        Example of an email with image asset.

        You should upload your email images to a CDN.

        Should come in handy for branded transactional emails or promotional type emails.
      </span>
    </Link>
  );
};

export default SidebarItem;