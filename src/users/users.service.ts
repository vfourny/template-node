import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Prisma} from "@prisma/client";
import {hash} from "bcrypt";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async getUsers(){
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
    }

    async getUserById(id: string){
        return this.prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
    }

    async createUser(data: Prisma.UserCreateInput){
        const hashedPassword = await hash(data.password, 10);
        return this.prisma.user.create(
            {
                data: {
                    ...data,
                    password: hashedPassword
                }
            }
        );
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput){
        return this.prisma.user.update({
            where: {
                id: id
            },
            data
        });
    }

    async deleteUser(id: string){
        return this.prisma.user.delete({
            where: {
                id: id
            }
        });
    }
}
