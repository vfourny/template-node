import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithoutPassword } from './users.type';
import { NOT_FOUND_ERRORS } from '../common/common.types';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserPayload: CreateUserDto): Promise<UserWithoutPassword> {
    const hashedPassword = await hash(createUserPayload.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserPayload,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });
  }

  findAll(): Promise<UserWithoutPassword[]> {
    return this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOneById(userId: string): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException(NOT_FOUND_ERRORS.USER);
    }
    return user;
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
    });
  }

  async remove(userId: string): Promise<UserWithoutPassword> {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    });
  }
}
