import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Action } from "src/casl/action.enum";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory";
import { AlreadyExistError } from "src/common/errors/already-exist.error";
import { DoesNotExistError } from "src/common/errors/doesNot-exist.error";
import { UnAuthorizedError } from "src/common/errors/unAuthorized.error";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dtos/createTask.dto";
import { CreateTaskDayDto } from "./dtos/createTaskDay.dto";
import { UpdateTaskDto } from "./dtos/updateTask.dto";
import { UpdateTaskDayDto } from "./dtos/updateTaskDay.dto";
import { TaskDay } from "./entities/task.day.entity";
import { Task } from "./entities/task.entity";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  // signatureVersion: "v4",
  region: "ap-northeast-2",
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasks: Repository<Task>,
    @InjectRepository(TaskDay) private readonly taskDay: Repository<TaskDay>,
    @InjectRepository(User) private readonly users: Repository<User>,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async getAll(
    userId: number | null,
    date: string | null,
    user
  ): Promise<Task[]> {
    let nowDate;
    if (date) {
      nowDate = new Date(date);
    } else {
      nowDate = new Date();
      nowDate.setHours(9, 0, 0, 0);
    }

    const dayOfWeek = nowDate.getDay();
    const day = nowDate.getDate();
    const month = nowDate.getMonth();
    const year = nowDate.getFullYear();
    const monday = new Date(year, month, day - dayOfWeek);
    const week = [];

    for (let i = 0; i < 7; i++) {
      const days = new Date(year, month, day - dayOfWeek + i);
      days.setHours(9, 0, 0, 0);
      week.push(days);
    }

    if (!userId) {
      return this.tasks
        .createQueryBuilder("tasks")
        .leftJoinAndSelect("tasks.taskDays", "taskDays")
        .where("userId = :userId and date IN (:week)", {
          userId: user.id,
          week,
        })
        .getMany();
    }
    userId = +userId;
    return this.tasks
      .createQueryBuilder("tasks")
      .leftJoinAndSelect("tasks.taskDays", "taskDays")
      .where("userId = :userId and date IN (:week)", {
        userId,
        week,
      })
      .getMany();
  }

  async createTask({ date, plan }: CreateTaskDto, user): Promise<string> {
    const exist = await this.tasks.findOne({
      where: { date, userId: user.id },
    });

    if (exist) {
      throw new AlreadyExistError();
    }

    await this.tasks.save(
      this.tasks.create({
        date,
        plan,
        user,
      })
    );
    return "success create task";
  }

  async getOne(
    userId: number | null,
    date: string | null,
    user
  ): Promise<Task> {
    let nowDate;
    if (date) {
      nowDate = new Date(date);
    } else {
      nowDate = new Date();
      nowDate.setHours(9, 0, 0, 0);
    }

    if (!userId) {
      return await this.tasks.findOne({
        where: { userId: user.id, date: nowDate },
        relations: ["taskDays"],
      });
    }

    userId = +userId;

    return await this.tasks.findOne({
      where: { userId, date: nowDate },
      relations: ["taskDays"],
    });
  }

  async updateTask(
    id: number,
    { plan, image }: UpdateTaskDto,
    user
  ): Promise<Task> {
    const taskForUpdate = await this.tasks.findOne({ id });
    const ability = this.caslAbilityFactory.PermissionForTask(user);

    if (!ability.can(Action.Update, taskForUpdate)) {
      throw new UnAuthorizedError();
    }

    taskForUpdate.plan = plan;
    taskForUpdate.image = image;

    return await this.tasks.save(taskForUpdate);
  }

  async deleteTask(id: number, user): Promise<string> {
    const taskForDelete = await this.tasks.findOne({ id });
    const ability = this.caslAbilityFactory.PermissionForTask(user);

    if (!ability.can(Action.Delete, taskForDelete)) {
      throw new UnAuthorizedError();
    }

    await this.tasks.delete({ id });
    return "success delete Task";
  }

  //일일 할일 목표
  async getTaskDayList(taskId: number) {
    const task = await this.tasks.findOne({ id: taskId });
    return await this.taskDay.find({ task });
  }

  async createTaskDay(taskId: number, { dayPlan }: CreateTaskDayDto, user) {
    const task = await this.tasks.findOne({ id: taskId });

    if (!task) throw new DoesNotExistError();
    if (task.userId !== user.id) throw new UnAuthorizedError();

    await this.taskDay.save(this.taskDay.create({ dayPlan, task }));
    return "success create taskDay";
  }

  async getTaskDay(taskId: number, taskDayId: number): Promise<Task> {
    return await this.tasks.findOne({ id: taskDayId });
  }

  async updateTaskDay(
    taskId: number,
    taskDayId: number,
    { dayPlan, finishedAt }: UpdateTaskDayDto,
    user
  ) {
    const taskDayForUpdate = await this.taskDay.findOne({ id: taskDayId });
    const abilityForTask = this.caslAbilityFactory.PermissionForTaskDay(
      user,
      taskId
    );

    if (!abilityForTask.can(Action.Update, taskDayForUpdate)) {
      throw new DoesNotExistError();
    }

    const taskForUpdate = await this.tasks.findOne({ id: taskId });
    const abilityForUser = this.caslAbilityFactory.PermissionForTask(user);

    if (!abilityForUser.can(Action.Update, taskForUpdate)) {
      throw new UnAuthorizedError();
    }

    taskDayForUpdate.dayPlan = dayPlan;
    taskDayForUpdate.finishedAt = finishedAt;

    return await this.taskDay.save(taskDayForUpdate);
  }

  async deleteTaskDay(
    taskId: number,
    taskDayId: number,
    user
  ): Promise<string> {
    const taskDayForDelete = await this.taskDay.findOne({ id: taskDayId });
    const abilityForTask = this.caslAbilityFactory.PermissionForTaskDay(
      user,
      taskId
    );

    if (!abilityForTask.can(Action.Delete, taskDayForDelete)) {
      throw new DoesNotExistError();
    }

    const taskForDelete = await this.tasks.findOne({ id: taskId });
    const abilityForUser = this.caslAbilityFactory.PermissionForTask(user);

    if (!abilityForUser.can(Action.Delete, taskForDelete)) {
      throw new UnAuthorizedError();
    }

    await this.taskDay.delete({ id: taskDayId });
    return "success delete Task Day";
  }

  async getPreSignedUrl(taskId: number) {
    const BUCKET = "study-auth";

    // const s3 = new AWS.S3();
    const timeStamp = +new Date();
    return s3.getSignedUrl("putObject", {
      Bucket: BUCKET,
      Key: taskId + timeStamp,
      Expires: 900,
      ContentType: "image/png",
      ACL: "public-read",
    });

    // const signedUrl = s3.getSignedUrl("getObject", {
    //   Key: taskId + timeStamp,
    //   Bucket: BUCKET,
    //   Expires: 900,
    // });

    // return signedUrl;
  }
}
