import { PickType } from "@nestjs/swagger";
import { Group } from "../entities/group.entity";

export class CreateGroupDto extends PickType(Group, ['name'] as const) {}