import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { GroupService } from './group.service';

@UseGuards(JwtAuthGuard)
@Controller('group')
export class GroupController {
  constructor (private groupService: GroupService) {}

  @ApiOperation({ summary: '그룹 생성'})
  @Post("")
  async createGroup(@Body() createGroup, @User() user){
    return await this.groupService.createGroup(createGroup, user)
  }
}
