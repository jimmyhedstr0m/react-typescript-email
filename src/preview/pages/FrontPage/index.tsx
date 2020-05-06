import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { http } from '../../helpers/http';
import { Props } from './types';
import styles from './styles.module.scss';
import IFrame from '../../components/IFrame';
import Sidebar from '../../components/Sidebar';

const FrontPage: React.FC<Props> = () => {
  const [template, setTemplate] = useState<string>('');

  useEffect(() => {
    const templateName = 'branded';
    http(`/api/v1/templates/${templateName}`,
      {
        method: 'POST',
        body: JSON.stringify({
          subject: 'Branded',
          data: {
            name: 'Jimmy'
          }
        })
      })
      .then((res) => res.text())
      .then((html) => {
        setTemplate(html);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.block}>
      <Sidebar />

      <IFrame
        className={styles.preview}
        innerHTML={template}
      />
    </div>
  );
};

export default FrontPage;