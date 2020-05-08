import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { http } from '../../helpers/http';
import { Props } from './types';
import styles from './styles.module.scss';
import Button from '../Button';
import IFrame from '../../components/IFrame';
import Editor from '../Editor';

const Preview: React.FC<Props> = (props) => {
  const { className, template } = props;
  const [innerHTML, setInnerHTML] = useState<string>();
  const [mock, setMock] = useState<string>(JSON.stringify(template.mock, null, 2));

  const requestTemplate = (jsonStr: string) => {
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (_err) {
      parsed = {};
    }
    console.log('request', parsed);
    http(`/api/v1/templates/${template.id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          subject: 'Subject',
          data: parsed.data || {}
        })
      })
      .then((res) => res.text())
      .then((html) => setInnerHTML(html))
      .catch((err) => {
        console.log(err);
      });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const code = event.keyCode || event.which;

    if (code === 13 && event.metaKey) {
      requestTemplate(mock);
    }
  };

  useEffect(() => {
    requestTemplate(JSON.stringify(template.mock));
    setMock(JSON.stringify(template.mock, null, 2));
  }, [template]);

  return (
    <div
      className={classNames(
        styles.block,
        className
      )}
    >
      <div className={styles.row}>
        <IFrame
          className={styles.preview}
          innerHTML={innerHTML}
        />

        <aside className={styles.editor}>
          <span className={styles.title}>
            JSON mock data
          </span>

          <Editor
            onChange={setMock}
            onKeyDown={onKeyDown}
            value={mock}
          />

          <Button
            className={styles.button}
            modifiers="primary rounded"
            onClick={() => requestTemplate(mock)}
          >
            Apply
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default Preview;