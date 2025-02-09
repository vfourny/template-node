import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../common/prisma.service'
import { hash } from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { USERS_ERROR, UserWithoutPassword } from './users.type'
import { User } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserPayload: CreateUserDto): Promise<UserWithoutPassword> {
    const hashedPassword = await hash(createUserPayload.password, 10)
    return this.prisma.user.create({
      data: {
        ...createUserPayload,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    })
  }

  findAll(): Promise<UserWithoutPassword[]> {
    return this.prisma.user.findMany({
      omit: {
        password: true,
      },
    })
  }

  async findOneById(userId: string): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    })

    if (!user) {
      throw new NotFoundException(USERS_ERROR.NOT_FOUND_BY_ID)
    }
    return user
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new NotFoundException(USERS_ERROR.NOT_FOUND_BY_EMAIL)
    }
    return user
  }

  async update(
    userId: string,
    updateUserPayload: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
      data: updateUserPayload,
    })
  }

  async remove(userId: string): Promise<UserWithoutPassword> {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    })
  }
}
