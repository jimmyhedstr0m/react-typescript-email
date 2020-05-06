import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { juiceResources } from 'juice';

import Branded from '../../emails/templates/Branded';
import Transaction from '../../emails/templates/Transaction';

const TEMPLATES = [
  'Branded',
  'Transaction'
];

export const getTemplates = (): typeof TEMPLATES => {
  return TEMPLATES;
};

export const getTemplate =
  (name: string, subject: string, data: object, callback: (err: Error | undefined, html: string) => any) => {
    let template: JSX.Element;

    switch (name) {
      case 'Branded':
        template = <Branded data={data} />;
        break;
      case 'Transaction':
        template = <Transaction data={data} />;
        break;
      default:
        return callback(new Error('Template not found'), '');
    }

    const stylePath = process.env.NODE_ENV === 'production'
      ? 'build/main.css'
      : 'src/emails/styles/main.css';

    const html = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${subject}</title>
        <link href="${stylePath}" media="all" rel="stylesheet" type="text/css" />
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

      callback(undefined, inlined);
    });
  };