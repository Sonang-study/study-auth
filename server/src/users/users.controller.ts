import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @ApiOperation({summary:'사용자 리스트'})
  @Get()
  async getUserList(){
    return await this.usersService.getAll();
  }

  @ApiOperation({summary:'회원가입'})
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({summary:'사용자 상세정보'})
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id:number) {
    return await this.usersService.getOne(id);
  }

  @ApiOperation({summary:'사용자 정보 수정'})
  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id:number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateOne(id, updateUserDto);
  }

  @ApiOperation({summary:'회원탈퇴'})
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id:number) {
    return await this.usersService.getOne(id);
  }
}
