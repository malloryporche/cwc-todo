import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUsername(username);
    if (user && (await bcrypt.compare(password, user.pass))) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        id: user.id,
        darkMode: user.darkMode,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async resetPassword(email: string) {
    const user = await this.userService.findOneWithUsername(email);
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        id: user.id,
        darkMode: user.darkMode,
      },
    };
    if (!user) {
      throw new Error('User with this email not found');
    }

    const token = await this.jwtService.sign(payload, {
      secret: `${user.pass}`,
    });

    this.mailService.sendResetPasswordEmail(user, token, user.id);
  }

  async confirmResetPassword(
    userPassword: string,
    newPassword: string,
    token: string,
  ) {
    const payload = await this.jwtService.verify(token, {
      secret: userPassword,
    });
    const user = await this.userService.findOne(payload.sub.id);
    if (!user) {
      throw new Error('User with this email not found');
    }
    return this.userService.updatePassword(user, newPassword);
  }
}
