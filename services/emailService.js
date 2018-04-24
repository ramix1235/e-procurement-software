/* eslint-disable import/prefer-default-export */
import { createTransport } from 'nodemailer';
import nconf from '../core/config';
import ejsLocals from 'ejs-locals';
import path from 'path';

const serviceSettings = nconf.get('emailService');
const transporter = createTransport({
  host: serviceSettings.smtpHost,
  port: serviceSettings.port,
  secure: false,
  auth: {
    user: serviceSettings.address,
    pass: serviceSettings.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

class EmailService {
  sendMail = (data) => {
    const options = data;

    options.engine = options.engine || 'ejs';

    const pathToTemplates = path.join(path.resolve(__dirname, '../views/email'), `${options.template}.ejs`);
    const dataForTemplate = {
      settings: {

      },
      data: Object.assign(
        {
          title: options.subject,
        },
        options.data
      ),
    };

    return new Promise((resolve, reject) => ejsLocals(
      pathToTemplates,
      dataForTemplate,
      (renderError, html) => {
        if (renderError) return reject(renderError);
        return resolve(html);
      }
    ))
      .then(html => this.sendMailPrivate(options, html))
      .catch(renderError => console.log(renderError));
  }

  sendMailPrivate = (options, html) => {
    const mailOptions = {
      from: options.from || serviceSettings.from,
      to: options.to,
      subject: options.subject,
      html,
    };

    return transporter.sendMail(mailOptions)
      .then((info) => {
        console.log(`Message sent (type: ${options.template}, to: ${options.to})`);
      })
      .catch(sendError => console.log(sendError));
  }
}

export default new EmailService();
