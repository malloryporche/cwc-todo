import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../dto/user/create-user.dto';
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
  @Post('forgot-password')
  async resetPassword(@Body('email') email: string) {
    return await this.authService.resetPassword(email);
  }

  @Public()
  @Post('reset-password')
  async confirmResetPassword(
    @Body('password') password: string,
    @Body('id', ParseIntPipe) id: number,
    @Body('token') token: string,
  ) {
    const user = await this.userService.findOne(id);
    return await this.authService.confirmResetPassword(
      user.pass,
      password,
      token,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfileData(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
