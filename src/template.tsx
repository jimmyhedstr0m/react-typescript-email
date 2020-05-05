import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import express, { Router } from 'express';
import juice, { juiceResources } from 'juice';

import BrandedTemplate from './emails/BrandedTemplate';

const router: Router = express.Router();

router.post('/', (req, res) => {
  const data = {
    subject: 'Subject'
  };

  const markup = renderToStaticMarkup(<BrandedTemplate name="Jimmy" />);
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>${data.subject}</title>
      <link href="src/css/main.css" media="all" rel="stylesheet" type="text/css" />
    </head>
    <body itemscope itemtype="http://schema.org/EmailMessage">
      <table class="body">
        <tr>
          <td></td>
          <td class="container">
            <div class="content">${markup}</div>
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
      res.sendStatus(500);
    }

    res.send(inlined);
  });

});

export default router;