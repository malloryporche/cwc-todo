import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get() // GET /users
  findAll() {
    return this.usersService.findAll();
  }

  @Post() // POST /users
  async create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id') // PATCH /users/:id
  updateUser(@Param('id') id: string, @Body() userUpdate: Partial<User>) {
    return this.usersService.updateUser(+id, userUpdate);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
