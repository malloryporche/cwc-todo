import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(user): Promise<User> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(user.pass, salt);
    const userWithHashPass = { ...user, pass: hashedPass, salt: salt };
    return await this.usersRepository.save(userWithHashPass);
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    return user || null;
  }

  async findOneWithUsername(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ email });
    return user || null;
  }
  async updateUser(id: number, body: Partial<User>): Promise<User> {
    let userToUpdate = await this.usersRepository.findOneBy({ id });
    userToUpdate = { ...userToUpdate, ...body };
    return await this.usersRepository.save(userToUpdate);
  }

  async delete(id: number): Promise<User | null> {
    const userToDelete = await this.usersRepository.findOneBy({ id });

    if (!userToDelete) {
      throw new Error(`User with ID ${id} not found`);
    }

    await this.usersRepository.delete(id);

    return userToDelete;
  }
}
