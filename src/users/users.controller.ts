import { Body, Controller, Get, Param, Post, Req, BadRequestException, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleAdminGuard } from 'src/auth/guards/role_admin.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @UseGuards(RoleAdminGuard)
    @Get('/')
    async findAll() {
        return await this.usersService.findAll();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @UseGuards(RoleAdminGuard)
    @Post('/')
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        if (user) {
            return {
                message: "User Created"
            };
        }
        throw new BadRequestException('User not created');
    }


    @ApiBearerAuth()
    @Get('/:id')
    @UseGuards(AuthGuard)
    @UseGuards(RoleAdminGuard)
    async findOne(@Param('id') id: string) {
        if (!id.match(/^[a-fA-F0-9]{24}$/)) {
            throw new BadRequestException('Invalid ObjectId format');
        }
        const user = await this.usersService.findOneById(id);
        if (!user) {
            throw new NotFoundException(`User not found for id ${id}`);
        }
        return user;
    }
}
