import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { User } from "src/users/user.decorator";
import { CreateTaskDto } from "./dtos/createTask.dto";
import { CreateTaskDayDto } from "./dtos/createTaskDay.dto";
import { UpdateTaskDto } from "./dtos/updateTask.dto";
import { UpdateTaskDayDto } from "./dtos/updateTaskDay.dto";
import { TasksService } from "./tasks.service";

@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({
    summary: "1주일 목표 리스트",
    description: "날짜 입력하면 날짜가 속한 한주의 목표 리스트 나열",
  })
  @ApiQuery({
    name: "date",
    required: false,
    description: "검색하려고 하는 날짜 default = 오늘",
  })
  @ApiQuery({
    name: "userId",
    required: false,
    description: "검색하려고 하는 유저의ID default = 본인",
  })
  @Get("")
  async getTaskList(
    @Query("userId") userId: number | null,
    @Query("date") date: string | null,
    @User() user
  ) {
    return await this.tasksService.getAll(userId, date, user);
  }

  @ApiOperation({ summary: "하루 종합 목표 설정" })
  @Post("")
  async createTask(@Body() createTaskDto: CreateTaskDto, @User() user) {
    return await this.tasksService.createTask(createTaskDto, user);
  }

  @ApiOperation({ summary: "할일 상세정보" })
  @ApiQuery({
    name: "date",
    required: false,
    description: "검색하려고 하는 날짜 default = 오늘",
  })
  @ApiQuery({
    name: "userId",
    required: false,
    description: "검색하려고 하는 유저의ID default = 본인",
  })
  @Get("detail")
  async getTask(
    @Query("userId") userId: number | null,
    @Query("date") date: string | null,
    @User() user
  ) {
    return await this.tasksService.getOne(userId, date, user);
  }

  @ApiOperation({ summary: "할일 종합 목표 수정 및 인증사진 추가" })
  @Put(":id")
  async updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @User() user
  ) {
    return await this.tasksService.updateTask(id, updateTaskDto, user);
  }

  @ApiOperation({ summary: "할일 종합 목표 삭제" })
  @Delete(":id")
  async deleteTask(@Param("id", ParseIntPipe) id: number, @User() user) {
    return await this.tasksService.deleteTask(id, user);
  }

  @ApiOperation({ summary: "할일 목표 리스트" })
  @Get(":id/task-day")
  async getTaskDayList(@Param("id", ParseIntPipe) taskId: number) {
    return await this.tasksService.getTaskDayList(taskId);
  }

  @ApiOperation({ summary: "할일 목표 추가" })
  @Post(":id/task-day")
  async createTaskDay(
    @Param("id", ParseIntPipe) taskId: number,
    @Body() createTaskDayDto: CreateTaskDayDto,
    @User() user
  ) {
    return await this.tasksService.createTaskDay(
      taskId,
      createTaskDayDto,
      user
    );
  }

  @ApiOperation({ summary: "할일 목표 상세정보" })
  @Get(":id/task-day/:taskDayId")
  async getTaskDay(
    @Param("id", ParseIntPipe) taskId: number,
    @Param("taskDayId", ParseIntPipe) taskDayId: number
  ) {
    return await this.tasksService.getTaskDay(taskId, taskDayId);
  }

  @ApiOperation({ summary: "할일 목표 수정 및 완료" })
  @Put(":id/task-day/:taskDayId")
  async updateTaskDay(
    @Param("id", ParseIntPipe) taskId: number,
    @Param("taskDayId", ParseIntPipe) taskDayId: number,
    @Body() updateTaskDayDto: UpdateTaskDayDto,
    @User() user
  ) {
    return await this.tasksService.updateTaskDay(
      taskId,
      taskDayId,
      updateTaskDayDto,
      user
    );
  }

  @ApiOperation({ summary: "할일 목표 수정 및 삭제" })
  @Delete(":id/task-day/:taskDayId")
  async deleteTaskDay(
    @Param("id", ParseIntPipe) taskId: number,
    @Param("taskDayId", ParseIntPipe) taskDayId: number,
    @User() user
  ) {
    return await this.tasksService.deleteTaskDay(taskId, taskDayId, user);
  }

  @ApiOperation({ summary: "이미지 업로드 presignedUrl" })
  @Post(":id/imageUrl")
  async getPresignedUrl(
    @Param("id", ParseIntPipe) taskId: number,
    @User() user
  ) {
    return await this.tasksService.getPreSignedUrl(taskId);
  }
}
