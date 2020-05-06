import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { isArray } from 'util';

import App from '../preview/components/App';

const helmetContext: any = {};
let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const scriptTag = (script: string): string => {
  const crossorigin = process.env.NODE_ENV === 'production'
    ? ' crossorigin'
    : '';

  return `<script src="${script}" defer${crossorigin}></script>`;
};

const scripts = Object.keys(assets).reduce((str, key) => {
  const value = assets[key].js;
  if (value) {
    const script: string = isArray(value)
      ? value.reduce((acc: string, scriptPath: string) => {
        return acc + scriptTag(scriptPath);
      }, '')
      : scriptTag(value);

    return str + script;
  } else {
    return str;
  }
}, '');

const renderer = (req: express.Request, res: express.Response) => {
  const routerContext = {};
  const markup = renderToString(
    <StaticRouter location={req.url} context={routerContext}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </StaticRouter>
  );
  const { helmet } = helmetContext;

  const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        ${scripts}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="app-root">${markup}</div>
      </body>
    </html>
  `.replace(/\s{2,}/g, '');

  res.send(html);
};

export default renderer;