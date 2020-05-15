import { renderToStaticMarkup } from 'react-dom/server';
import juice, { juiceResources } from 'juice';

export const renderTemplate = (subject: string, element: JSX.Element, callback: juice.Callback) => {
  const stylePath = process.env.NODE_ENV === 'production'
    ? 'build/main.css'
    : 'src/emails/styles/main.css';

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>${subject}</title>
        <link href="${stylePath}" media="all" rel="stylesheet" type="text/css" />
      </head>
      <body itemscope itemtype="http://schema.org/EmailMessage">
        ${renderToStaticMarkup(element)}
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
  }, callback);
};