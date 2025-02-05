import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {AuthBody} from "./auth.controller";
import {hash, compare} from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService:JwtService) {}

    async validateUser(authBody:AuthBody): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: authBody.email
            }
        });

        if(!user){
            return new NotFoundException('User not found');
        }
        const isPasswordMatching = await this.isPasswordMatching(authBody.password, user.password);
        if (!isPasswordMatching) {
            return new NotFoundException('Wrong password');
        }
        return this.authenticateUser(user);
    }

    private async isPasswordMatching(password: string, hash: string) {
        return compare(password, hash);
    }

    private authenticateUser(user: any) {
        const payload = { userId: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
