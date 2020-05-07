import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { http } from '../../helpers/http';
import { Template } from '../../../models/Template';
import { Props } from './types';
import styles from './styles.module.scss';
import IFrame from '../../components/IFrame';

const Preview: React.FC<Props> = (props) => {
  const { className, template } = props;
  const [innerHTML, setInnerHTML] = useState<string>();

  useEffect(() => {
    http(`/api/v1/templates/${template.id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          subject: 'Subject',
          data: {
            name: 'Jimmy'
          }
        })
      })
      .then((res) => res.text())
      .then((html) => setInnerHTML(html))
      .catch((err) => {
        console.log(err);
      });
  }, [template]);

  return (
    <div
      className={classNames(
        styles.block,
        className
      )}
    >
      <IFrame
        className={styles.preview}
        innerHTML={innerHTML}
      />
    </div>
  );
};

export default Preview;