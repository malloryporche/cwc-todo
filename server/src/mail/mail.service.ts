import { Injectable } from '@nestjs/common';
import resetPasswordTemplate from './resetPasswordTemplate';
import { SENDMAIL } from './mail';
import { User } from 'src/user/user.entity';
import passwordResetNotification from './passwordResetConfirmation';

@Injectable()
export class MailService {
  async sendResetPasswordEmail(user: User, token: string, id: number) {
    SENDMAIL(
      {
        from: 'mallory@animadigitalmarketing.com',
        to: user.email,
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

  async sendPasswordResetNotification(user: User) {
    SENDMAIL(
      {
        from: 'mallory@animadigitalmarketing.com',
        to: user.email,
        subject: 'Your Password Was Recently Reset',
        html: passwordResetNotification(),
      },
      () => {
        console.log('password reset notification sent.');
      },
    );
  }
}
