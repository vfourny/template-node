import { BadRequestException, Injectable } from '@nestjs/common'
import { AuthBody } from './auth.controller'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { AUTH_ERROR, LoginResponse } from './auth.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(authBody: AuthBody): Promise<LoginResponse> {
    const userFound = await this.usersService.findOneByEmail(authBody.email)
    const isPasswordMatching = await compare(
      authBody.password,
      userFound.password,
    )
    if (!isPasswordMatching) {
      throw new BadRequestException(AUTH_ERROR.WRONG_PASSWORD)
    }
    const payload = { userId: userFound.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
