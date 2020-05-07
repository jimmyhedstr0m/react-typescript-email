import React from 'react';

import { Template } from '../../models/Template';
import { TemplateType } from '../../models/TemplateType';
import { Callback } from './types';
import { renderTemplate } from '../../emails/helpers/render';
import Branded from '../../emails/templates/Branded';
import Transaction from '../../emails/templates/Transaction';

const templateMap: { [key in TemplateType]: { template: Template, component: React.FC<any> } } = {
  [TemplateType.BRANDED]: {
    template: {
      id: TemplateType.BRANDED,
      name: 'Branded Template',
      description: 'Example of an email with image asset.',
    },
    component: Branded,
  },
  [TemplateType.TRANSACTION]: {
    template: {
      id: TemplateType.TRANSACTION,
      name: 'Transaction Template',
      description: 'Simple responsive HTML email template.',
    },
    component: Transaction,
  }
};

export const getTemplates = (): Template[] => Object.keys(templateMap).map((key) => templateMap[key].template);

export const getTemplate = (name: string, subject: string, data: object, callback: Callback) => {
  const templateName = name as TemplateType;

  if (templateMap.hasOwnProperty(templateName)) {
    const component = React.createElement(templateMap[templateName].component, { data });
    return renderTemplate(subject, component, (err, inlined) => {
      if (err) {
        console.error(err);
        return callback(new Error(`Failed to inline CSS for template ${name}`), '');
      }
      return callback(undefined, inlined);
    });
  }

  return callback(new Error('Template not found'), '');
};