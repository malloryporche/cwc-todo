import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrpyt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneWithUsername(username);
    if (user && (await bcrpyt.compare(pass, user.pass))) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }
}
