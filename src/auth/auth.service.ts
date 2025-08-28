import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findOneByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        return {
            token: await this.generateToken(user),
        };
    }

    private async generateToken(user: any) {
        const payload = { sub: user.id, email: user.email, role: user.role, name: user.name };
        return await this.jwtService.signAsync(payload);
    }

    async getUser(req: any) {
        const user = await this.usersService.findOneById(req.user.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
