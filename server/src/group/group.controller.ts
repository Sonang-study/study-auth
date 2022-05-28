import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {ApiBody, ApiOperation} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { User } from "src/users/user.decorator";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dtos/createGroup.dto";
import { InviteGroupDto } from "./dtos/inviteGroup.dto";

@UseGuards(JwtAuthGuard)
@Controller("group")
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOperation({ summary: "그룹 전체 리스트" })
  @Get("")
  async AllGroupList() {
    return await this.groupService.getAllGroup();
  }

  @ApiOperation({ summary: "그룹 생성" })
  @Post("")
  async createGroup(@Body() createGroup: CreateGroupDto, @User() user) {
    return await this.groupService.createGroup(createGroup, user);
  }

  @ApiOperation({ summary: "사용자 그룹 초대" })
  @ApiBody({ type: InviteGroupDto })
  @Post("invite")
  async inviteUser(@Body() invite: InviteGroupDto) {
    return await this.groupService.inviteUser(invite.groupId, invite.userId);
  }

  @ApiOperation({ summary: "내가 속한 그룹 확인" })
  @Get("my")
  async myGroup(@User() user) {
    return this.groupService.getMyGroup(user);
  }

  @ApiOperation({ summary: "그룹 이름 변경" })
  @Put(":id")
  async updateGroup(
    @Body() updateGroup,
    @User() user,
    @Param("id", ParseIntPipe) groupId: number
  ) {
    return await this.groupService.updateGroup(updateGroup.name, groupId, user);
  }

  @ApiOperation({ summary: "그룹 맴버 확인" })
  @Get(":id")
  async getGroupMember(@Param("id", ParseIntPipe) groupId) {
    return this.groupService.getGroupMembers(groupId);
  }

  @ApiOperation({ summary: "그룹 삭제" })
  @Delete(":id")
  async deleteGroup(@Param("id", ParseIntPipe) groupId, @User() user) {
    return this.groupService.deleteGroup(groupId, user);
  }
}
