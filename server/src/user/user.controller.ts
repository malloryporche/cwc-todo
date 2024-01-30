import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get() // GET /users
  findAll() {
    return this.usersService.findAll();
  }

  @Post() // POST /users
  async create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id') // PATCH /users/:id
  updateUser(@Param('id') id: string, @Body() userUpdate: Partial<User>) {
    return this.usersService.updateUser(+id, userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
