import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, MailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
