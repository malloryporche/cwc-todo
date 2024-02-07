import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUsername(username);
    if (user && (await bcrypt.compare(password, user.pass))) {
      const { pass, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
        id: user.id,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
