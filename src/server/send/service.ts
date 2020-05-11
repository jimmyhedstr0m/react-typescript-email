import Mailgun from 'mailgun-js';

import { EmailRequest } from './types';
import * as templateService from '../templates/service';

let secrets: any;

const loadSecrets = () => {
  secrets = require('../../../secrets.json');
};
loadSecrets();

const mailgun = new Mailgun({
  apiKey: secrets.mailgun.api_key,
  domain: secrets.mailgun.domain
});

export const send = (req: EmailRequest): Promise<Mailgun.messages.SendResponse> => {
  const { from, to, subject, data, template } = req;

  return new Promise((resolve, reject) => {
    templateService.getTemplate(template, subject, data, (err, html) => {
      if (err) {
        reject(err);
      }

      const params = {
        from,
        to,
        subject,
        html,
      };

      mailgun.messages().send(params, (mailgunErr, body) => {
        if (mailgunErr) {
          reject(mailgunErr);
        }

        resolve(body);
      });
    });
  });
};