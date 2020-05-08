import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { http } from '../../helpers/http';
import { Props } from './types';
import { KeyType } from '../../../models/KeyType';
import styles from './styles.module.scss';
import Button from '../Button';
import IFrame from '../../components/IFrame';
import Editor from '../Editor';

import DeviceIcon from '!svg-react-loader?name=DeviceIcon!../../assets/icons/device.svg';

const Preview: React.FC<Props> = (props) => {
  const { className, template } = props;
  const [innerHTML, setInnerHTML] = useState<string>();
  const [isDesktop, setIsDesktop] = useState(true);
  const [mock, setMock] = useState(JSON.stringify(template.mock, null, 2));

  const requestTemplate = (jsonStr: string) => {
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (_err) {
      parsed = {};
    }

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

    if (code === KeyType.ENTER && event.metaKey) {
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
        <div className={styles.preview}>
          <div className={styles.bar}>
            <Button
              onClick={() => setIsDesktop(!isDesktop)}
              title="Toggle device"
            >
              <DeviceIcon className={styles.device} />
            </Button>
          </div>

          <IFrame
            className={isDesktop ? styles.desktop : styles.mobile}
            innerHTML={innerHTML}
          />
        </div>

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