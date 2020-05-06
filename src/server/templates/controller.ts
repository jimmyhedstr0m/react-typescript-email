import express from 'express';

import { EmailRequest } from './types';
import * as service from './service';

export const getTemplate = (req: express.Request, res: express.Response) => {
  const { data, subject } = (req.body as EmailRequest);
  const name = req.params.name;

  if (service.getTemplates().indexOf(name) === -1) {
    return res
      .status(404)
      .json({
        detail: `Email template ${name} does not exist`
      });
  }

  return service.getTemplate(name, subject, data, (err, html) => {
    if (err) {
      return res
        .status(500)
        .json({
          detail: err
        });
    }

    return res.send(html);
  });
};