import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Request,
  UseGuards,
  ParseIntPipe,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
// import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get() // GET /users
  findAll() {
    return this.usersService.findAll();
  }

  @Post() // POST /users
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    if (req.user) {
      const user = req.user;
      try {
        if (user.id === id) {
          return this.usersService.findOne(id);
        } else {
          throw new UnauthorizedException();
        }
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id') // PATCH /users/:id
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.body) {
      console.log(req.body);
      return this.usersService.updateUser(id, updateUserDto);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
