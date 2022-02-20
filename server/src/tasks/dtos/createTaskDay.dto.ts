import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { TaskDay } from "../entities/task.day.entity";

export class CreateTaskDayDto extends PickType(TaskDay, ['dayPlan'] as const) {
}