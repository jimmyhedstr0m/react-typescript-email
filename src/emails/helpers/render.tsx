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
        <title>${subject}</title>
        <link href="${stylePath}" media="all" rel="stylesheet" type="text/css" />
      </head>
      <body itemscope itemtype="http://schema.org/EmailMessage">
        <table class="body">
          <tr>
            <td></td>
            <td class="container">
              <div class="content">
                ${renderToStaticMarkup(element)}
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
  }, callback);
};