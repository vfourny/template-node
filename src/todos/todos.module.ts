import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, UsersService, PrismaService],
})
export class TodosModule {}
