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

  async validateUser(email: string, pass: string) {
    console.log('hi');
    const user = await this.userService.findOneWithUsername(email);
    if (user && (await bcrypt.compare(pass, user.pass))) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
