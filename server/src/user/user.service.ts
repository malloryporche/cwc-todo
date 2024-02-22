import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(user): Promise<User> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(user.pass, salt);
    const userWithHashPass = { ...user, pass: hashedPass };
    return await this.usersRepository.save(userWithHashPass);
  }

  async updatePassword(user, password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(password, salt);
    const userWithHashPass = { ...user, pass: hashedPass };
    await this.usersRepository.save(userWithHashPass);
    return await this.mailService.sendPasswordResetNotification(user);
  }
  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  async findOneWithUsername(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }
  async updateUser(id: number, body: Partial<User>): Promise<User> {
    console.log('body in service', body);
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
