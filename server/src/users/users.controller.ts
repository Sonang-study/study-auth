import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get()
  async getUserList(){
    return await this.usersService.getAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id:number) {
    return await this.usersService.getOne(id);
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id:number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id:number) {
    return await this.usersService.getOne(id);
  }
}
