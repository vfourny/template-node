import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { UsersService } from '../users.service'

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userId = request.params.userId || request.body.userId

    await this.usersService.findOneById(userId)
    return true
  }
}
