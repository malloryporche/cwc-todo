import { Injectable } from '@nestjs/common';
import { transporter } from 'nodemailer';
import resetPasswordTemplate from './resetPasswordTemplate';
import { SENDMAIL } from './mail';

type Transporter = {
  sendMail(mailOptions: any): Promise<any>;
};

@Injectable()
export class MailService {
  async sendResetPasswordEmail(data) {
    SENDMAIL(
      {
        from: 'mallory@animadigitalmarketing.com',
        to: data.email,
        subject: 'Reset Password',
        attachments: [
          {
            filename: 'logo.png',
            path: 'server/src/mail/logo.png',
            cid: 'logo',
          },
        ],
        // html: resetPasswordTemplate(data),
      },
      () => {
        console.log('reset password email sent.');
      },
    );
  }
}
