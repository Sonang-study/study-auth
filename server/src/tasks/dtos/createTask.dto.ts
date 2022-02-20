import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Task } from "../entities/task.entity";

export class CreateTaskDto extends PickType(Task, ['date', 'plan'] as const) {
  @ApiProperty({
    example: '1',
    description: '사용자 id',
  })
  @IsNumber()
  userId: number;
}