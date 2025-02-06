import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { TodosService } from '../todos.service';

@Injectable()
export class TodoExistsGuard implements CanActivate {
  constructor(private readonly todosService: TodosService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const todoId = request.params.todoId || request.body.todoId;

    await this.todosService.findOneById(todoId);
    return true;
  }
}
