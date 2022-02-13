import { OmitType } from "@nestjs/mapped-types";
import { Task } from "../entities/task.entity";

export class CreateTaskDto extends OmitType(Task, ['id'] as const) {}