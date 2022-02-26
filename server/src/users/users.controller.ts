import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/role/role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from './user.decorator';
import { UsersService } from './users.service';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Roles(Role.Admin, Role.User)
  @ApiOperation({summary:'사용자 리스트'})
  @Get()
  @Roles(Role.User)
  async getUserList(){
    return await this.usersService.getAll();
  }

  @ApiOperation({summary:'사용자 상세정보'})
  @Get(':id')
  @Roles(Role.User)
  async getUser(@Param('id', ParseIntPipe) id:number) {
    return await this.usersService.getOne(id);
  }

  @ApiOperation({summary:'사용자 정보 수정'})
  @Put(':id')
  @Roles(Role.User)
  async updateUser(@Param('id', ParseIntPipe) id:number, @Body() updateUserDto: UpdateUserDto, @User() user) {
    return await this.usersService.updateOne(id, updateUserDto, user);
  }

  @ApiOperation({summary:'회원탈퇴'})
  @Delete(':id')
  @Roles(Role.User)
  async deleteUser(@Param('id', ParseIntPipe) id:number, @User() user) {
    return await this.usersService.getOne(id, user);
  }
}
