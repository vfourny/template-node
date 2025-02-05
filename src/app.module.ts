import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, UsersModule, UsersModule, AuthModule, ConfigModule.forRoot(
    {
      isGlobal: true,
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
