import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { Props } from './types';
import styles from './styles.module.scss';

const IFrame: React.FC<Props> = (props) => {
  const { className, height, innerHTML, width } = props;
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframe && iframe.current && iframe.current.contentWindow && innerHTML) {
      iframe.current.contentWindow.document.open();
      iframe.current.contentWindow.document.write('');
      iframe.current.contentWindow.document.close();

      iframe.current.contentWindow.document.open();
      iframe.current.contentWindow.document.write(innerHTML);
      iframe.current.contentWindow.document.close();
    }
  }, [innerHTML]);

  return (
    <iframe
      className={classNames(
        styles.block,
        className
      )}
      ref={iframe}
    />
  );
};

export default IFrame;