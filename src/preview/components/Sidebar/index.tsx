import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { Props } from './types';
import styles from './styles.module.scss';

const Sidebar: React.FC<Props> = (props) => {
  const { className, templates } = props;

  return (
    <nav
      className={classNames(
        styles.block,
        className
      )}
    >
      <ul>
        {templates.map((template) =>
          <li key={template.id}>
            <Link
              className={classNames(
                styles.item,
                { [styles.active]: location.pathname === '/' + template.id }
              )}
              to={`/${template.id}`}
            >
              <div className={styles.header}>
                <span className={styles.from}>
                  noreply@example.com
                </span>
                <span className={styles.date}>
                  {format(new Date(), 'y-LL-dd')}
                </span>
              </div>
              <span className={styles.subject}>
                {template.name}
              </span>
              <span className={styles.summary}>
                {template.description}
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;