import { Injectable } from '@nestjs/common';
import resetPasswordTemplate from './resetPasswordTemplate';
import { SENDMAIL } from './mail';

@Injectable()
export class MailService {
  async sendResetPasswordEmail(user, token, id) {
    SENDMAIL(
      {
        from: 'mallory@animadigitalmarketing.com',
        to: 'mallory@animadigitalmarketing.com',
        subject: 'Reset Your Password',
        attachments: [
          // {
          //   filename: 'logo.png',
          //   path: './honey-Do.png',
          //   cid: 'logo',
          // },
        ],
        html: resetPasswordTemplate(token, id),
      },
      () => {
        console.log('reset password email sent.');
      },
    );
  }
}
