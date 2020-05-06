import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Props } from './types';
import styles from './styles.module.scss';

const Button: React.FC<Props> = (props: any) => {
  const { children, className, disabled, modifiers, to } = props as Props;
  const Element = to ? Link : 'button';
  return (
    <Element
      {...props}
      aria-disabled={!!disabled}
      className={classNames(
        modifiers ? modifiers.split(' ').map((m: string) => styles[m]) : null,
        styles.button,
        className,
        { [styles.disabled]: disabled }
      )}
      draggable={false}
    >
      <span className={styles.inner}>
        {children}
      </span>
    </Element>
  );
};

export default Button;