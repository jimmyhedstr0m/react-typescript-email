import express from 'express';

import * as service from './service';
import { EmailRequest } from './types';

export const send = (req: express.Request, res: express.Response) => {
  const params = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    template: req.body.template,
    data: req.body.data
  };

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const element = params[key];
      if (!element) {
        return res
          .status(400)
          .json({
            detail: `Missing value property "${key}"`
          });
      }
    }
  }

  return service.send(params as EmailRequest)
    .then((response) => {
      return res.send(response);
    })
    .catch((err: Error) => {
      return res
        .status(500)
        .json({
          detail: err.message
        });
    });
};