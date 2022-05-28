import { ApiProperty } from "@nestjs/swagger";

export class InviteGroupDto {
  @ApiProperty({ description: "그룹 ID" })
  groupId: number;

  @ApiProperty({ description: "사용자 ID" })
  userId: number;
}
