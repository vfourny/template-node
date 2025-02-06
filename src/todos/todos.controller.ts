import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { UserExistsGuard } from '../users/guards/user-exists.guard';
import { TodoExistsGuard } from './guards/todo-exists.guard';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @UseGuards(UserExistsGuard)
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':todoId')
  findOneById(@Param('todoId') todoId: string): Promise<Todo | null> {
    return this.todosService.findOneById(todoId);
  }

  @Patch(':todoId')
  @UseGuards(TodoExistsGuard, UserExistsGuard)
  async update(
    @Param('todoId') todoId: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    if (updateTodoDto.userId) {
      const user = await this.usersService.findOneById(updateTodoDto.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }

    return this.todosService.update(todoId, updateTodoDto);
  }

  @Delete(':todoId')
  @UseGuards(TodoExistsGuard)
  remove(@Param('todoId') todoId: string): Promise<Todo> {
    return this.todosService.remove(todoId);
  }
}
