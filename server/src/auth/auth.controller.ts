import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '../decorators/public.decorator';
// import RegisterDto from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('auth/register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() email: string) {
    console.log(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfileData(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
