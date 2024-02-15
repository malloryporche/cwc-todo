import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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

    return await this.jwtService.sign(payload, {
      secret: `${user.pass}`,
    });
  }
}
