import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserWithoutPassword } from './users.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserExistsGuard } from './guards/user-exists.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserWithoutPassword[]> {
    return this.usersService.findAll();
  }

  @Get(':userId')
  async findOneById(
    @Param('userId') userId: string,
  ): Promise<UserWithoutPassword | null> {
    return this.usersService.findOneById(userId);
  }

  @Patch(':userId')
  @UseGuards(UserExistsGuard)
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @UseGuards(UserExistsGuard)
  async remove(@Param('userId') userId: string): Promise<UserWithoutPassword> {
    return this.usersService.remove(userId);
  }
}
