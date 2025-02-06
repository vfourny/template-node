import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../common/prisma.service';
import { Todo } from '@prisma/client';
import { NOT_FOUND_ERRORS } from '../common/common.types';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async findOneById(todoId: string): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });
    if (!todo) {
      throw new NotFoundException(NOT_FOUND_ERRORS.TODO);
    }
    return todo;
  }

  async update(todoId: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: updateTodoDto,
    });
  }

  async remove(todoId: string): Promise<Todo> {
    return this.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
  }
}
