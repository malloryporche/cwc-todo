import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, pass: string) {
    const user = await this.authService.validateUser(email, pass);

    if (!user) {
      this.logger.log('hi');
      throw new UnauthorizedException();
    }
    return user;
  }
}
