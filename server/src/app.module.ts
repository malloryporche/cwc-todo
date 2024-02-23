import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ListModule } from './list/list.module';
import { TodoModule } from './todo/todo.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { ProjectModule } from './project/project.module';
import { TagModule } from './tag/tag.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UserModule,
    AuthModule,
    ListModule,
    TodoModule,
    MailModule,
    ProjectModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
