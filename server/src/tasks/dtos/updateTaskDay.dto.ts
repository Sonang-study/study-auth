import { PickType } from "@nestjs/swagger";
import { TaskDay } from "../entities/task.day.entity";

export class UpdateTaskDayDto extends PickType(TaskDay, ['dayPlan', 'finishedAt'] as const) {}