import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { http } from '../../helpers/http';
import { Template } from '../../../models/Template';
import { Props } from './types';
import styles from './styles.module.scss';
import Sidebar from '../../components/Sidebar';
import Preview from '../../components/Preview';

const FrontPage: React.FC<Props> = (props) => {
  const { location } = props;
  const [currentTemplate, setCurrentTemplate] = useState<Template>();
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    if (location.pathname !== '/') {
      const id = location.pathname.replace('/', '');
      const template = templates.find((t) => t.id === id);

      if (template && (!currentTemplate || template.id !== currentTemplate.id)) {
        setCurrentTemplate(template);
      }
    }
  }, [location, templates]);

  useEffect(() => {
    http('/api/v1/templates')
      .then((res) => res.json())
      .then((res: Template[]) => setTemplates(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.block}>
      <Sidebar templates={templates} />

      {currentTemplate &&
        <Preview template={currentTemplate} />
      }
    </div>
  );
};

export default FrontPage;