import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlreadyExistError } from 'src/common/errors/already-exist.error';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/createTask.dto';
import { CreateTaskDayDto } from './dtos/createTaskDay.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { UpdateTaskDayDto } from './dtos/updateTaskDay.dto';
import { TaskDay } from './entities/task.day.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasks:Repository<Task>,
    @InjectRepository(TaskDay) private readonly taskDay:Repository<TaskDay>,
    @InjectRepository(User) private readonly users:Repository<User>,
    ) {}

    async getAll(): Promise<Task[]> {
      return await this.tasks.find();
    }

    async createTask({userId, date, plan}: CreateTaskDto): Promise<string> {

      // const exist = await this.tasks.findOne({date});
      const user = await this.users.findOne({id: userId})

      // if(exist) {
      //   throw new AlreadyExistError();
      // }
      await this.tasks.save(this.tasks.create({
        date,
        plan,
        user}))
      return 'success create task'
    }

    async getOne(query): Promise<Task> {
      return await this.tasks.findOne(query, { relations: ['taskDays'] });
    }

    async updateTask(id: number, { plan, image }: UpdateTaskDto): Promise<Task> {
      const task = await this.tasks.findOne({id});
      task.plan = plan;
      task.image = image;

      return await this.tasks.save(task);
    }

    async getTaskDayList(taskId: number) {
      const task = await this.tasks.findOne({id:taskId})
      return await this.taskDay.find({task});
    }

    async createTaskDay(taskId: number, { dayPlan }: CreateTaskDayDto ) {

      const task = await this.tasks.findOne({id:taskId})
      await this.taskDay.save(this.taskDay.create({dayPlan, task}))
      return 'success create taskDay'
    }

    async getTaskDay(taskId: number , taskDayId: number): Promise<Task> {
      return await this.tasks.findOne({id:taskDayId});
    }

    async updateTaskDay(taskId: number , taskDayId: number, { dayPlan, finishedAt }: UpdateTaskDayDto) {
      const taskDay = await this.taskDay.findOne({ id: taskDayId });
      taskDay.dayPlan = dayPlan;
      taskDay.finishedAt = finishedAt;

      return await this.taskDay.save(taskDay);
    }
}
