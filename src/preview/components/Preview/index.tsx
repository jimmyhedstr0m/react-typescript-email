import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { http } from '../../helpers/http';
import { Props } from './types';
import { KeyType } from '../../../models/KeyType';
import styles from './styles.module.scss';
import Button from '../Button';
import Editor from '../Editor';
import IFrame from '../../components/IFrame';

import ModeIcon from '!svg-react-loader?name=ModeIcon!../../assets/icons/night.svg';
import DeviceIcon from '!svg-react-loader?name=DeviceIcon!../../assets/icons/device.svg';

const Preview: React.FC<Props> = (props) => {
  const { className, template } = props;
  const [innerHTML, setInnerHTML] = useState<string>();
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [isDesktop, setIsDesktop] = useState(true);
  const [mock, setMock] = useState(JSON.stringify(template.mock, null, 2));

  const requestTemplate = (jsonStr: string) => {
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (_err) {
      parsed = {};
    }

    http(`/api/v1/templates/${template.id}?mode=${mode}`,
      {
        method: 'POST',
        body: JSON.stringify({
          subject: 'Subject',
          data: parsed || {}
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

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    requestTemplate(JSON.stringify(template.mock));
    setMock(JSON.stringify(template.mock, null, 2));
  }, [template, mode]);

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
              modifiers="action"
              onClick={toggleMode}
              title="Toggle dark mode"
            >
              <ModeIcon className={styles.mode} />
            </Button>

            <Button
              modifiers="action"
              onClick={() => setIsDesktop(!isDesktop)}
              title="Toggle device"
            >
              <DeviceIcon className={styles.device} />
            </Button>
          </div>

          {isDesktop &&
            <IFrame
              className={styles.desktop}
              innerHTML={innerHTML}
            />
          }

          {!isDesktop &&
            <div className={styles.iphone}>
              <IFrame
                className={styles.mobile}
                innerHTML={innerHTML}
              />
            </div>
          }
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