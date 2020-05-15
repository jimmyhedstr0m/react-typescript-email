import express from 'express';

import { EmailRequest } from './types';
import * as service from './service';
import { Template } from '../../models/Template';
import { TemplateType } from '../../models/TemplateType';

export const getTemplates = (_req: express.Request, res: express.Response) => {
  const templates = service.getTemplates();
  return res.json(templates);
};

export const getTemplate = (req: express.Request, res: express.Response) => {
  const { data, subject } = (req.body as EmailRequest);
  const mode: string = req.query.mode || 'light';
  const name = req.params.name as TemplateType;
  const templates = service.getTemplates();

  if (templates.findIndex((t: Template) => t.id === name) === -1) {
    return res
      .status(404)
      .json({
        detail: `Email template '${name}' does not exist`
      });
  }

  return service.getTemplate(name, subject, data, mode, (err, html) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({
          detail: err
        });
    }

    return res.send(html);
  });
};