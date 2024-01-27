import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get() // GET /users
  findAll() {
    return [];
  }

  @Post() // POST /users
  create(@Body() user: {}) {
    return user;
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Patch(':id') // PATCH /users/:id
  updateUser(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return { id };
  }
}
