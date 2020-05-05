import express from 'express';

import * as service from './service';

export const getTemplate = (req: express.Request, res: express.Response) => {
  const name = req.params.name;

  if (service.getTemplates().indexOf(name) === -1) {
    return res
      .status(404)
      .json({
        detail: `Email template ${name} does not exist`
      });
  }

  service.getTemplate(name, 'Branded Email Template', {}, (err, html) => {
    if (err) {
      return res
        .status(500)
        .json({
          detail: err
        });
    }

    res.send(html);
  });
};