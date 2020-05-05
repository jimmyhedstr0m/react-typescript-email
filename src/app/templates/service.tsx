import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import juice, { juiceResources } from 'juice';

import BrandedTemplate from '../../emails/BrandedTemplate';

const TEMPLATES = [
  'branded'
];

export const getTemplates = (): typeof TEMPLATES => {
  return TEMPLATES;
};

export const getTemplate = (name: string, subject: string, data: any, callback: juice.Callback) => {
  let template: JSX.Element;

  switch (name) {
    case 'branded':
      template = <BrandedTemplate name="Jimmy" />;
      break;
    default:
      return callback(new Error('Template not found'), '');
  }

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${subject}</title>
        <link href="src/css/main.css" media="all" rel="stylesheet" type="text/css" />
      </head>
      <body itemscope itemtype="http://schema.org/EmailMessage">
        <table class="body">
          <tr>
            <td></td>
            <td class="container">
              <div class="content">
                ${renderToStaticMarkup(template)}
              </div>
            </td>
            <td></td>
          </tr>
        </table>      
      </body>
    </html>
  `;

  juiceResources(html, {
    preserveMediaQueries: true,
    applyAttributesTableElements: true,
    applyWidthAttributes: true,
    preserveImportant: true,
    preserveFontFaces: true,
    webResources: {
      images: false
    }
  }, (err, inlined) => {
    if (err) {
      console.error(err);
      return callback(new Error(`Failed to inline CSS for template ${name}`), '');
    }

    callback(null, inlined);
  });
};