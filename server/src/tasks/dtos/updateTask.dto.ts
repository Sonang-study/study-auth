import { PickType } from "@nestjs/swagger";
import { Task } from "../entities/task.entity";

export class UpdateTaskDto extends PickType(Task, ['plan', 'image'] as const) {}