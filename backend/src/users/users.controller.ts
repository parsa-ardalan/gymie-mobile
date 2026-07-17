import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')

export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    createUser(@Body() body: any) {
        return this.usersService.create(body);
    }

    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() body: any) {
        return this.usersService.update(id, body);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}