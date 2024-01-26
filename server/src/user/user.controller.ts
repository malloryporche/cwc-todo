import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  addUser(): string {
    return 'Hello users!!';
  }
}
