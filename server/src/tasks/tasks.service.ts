import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
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
    private caslAbilityFactory: CaslAbilityFactory,
    ) {}

    async getAll(userId: number | null, user): Promise<Task[]> {
      if (!userId){
        return await this.tasks.find({where: {userId: user.id}});
      }
      return await this.tasks.find({where: {userId}});
    }

    async createTask({date, plan}: CreateTaskDto, user): Promise<string> {
      const exist = await this.tasks.findOne( {where: [{ date }, { userId: user.id }]});

      if(exist) {
        throw new AlreadyExistError();
      }

      await this.tasks.save(this.tasks.create({
        date,
        plan,
        user}))
      return 'success create task'
    }

    //해야 할 것
    async getOne(query): Promise<Task> {
      return await this.tasks.findOne(query, { relations: ['taskDays'] });
    }

    async updateTask(id: number, { plan, image }: UpdateTaskDto, user): Promise<Task> {
      const taskForUpdate = await this.tasks.findOne({id});
      const ability = this.caslAbilityFactory.PermissionForTask(user);
      taskForUpdate.plan = plan;
      taskForUpdate.image = image;

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
