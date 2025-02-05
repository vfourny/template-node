import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {Prisma} from "@prisma/client";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers(){
        return this.usersService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string){
        return this.usersService.getUserById(id);
    }

    @Post()
    async createUser(@Body() data: CreateUserDto){
        return this.usersService.createUser(data);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput){
        return this.usersService.updateUser(id, data);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(id);
    }
}
