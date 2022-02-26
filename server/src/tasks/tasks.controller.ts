import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { CreateTaskDto } from './dtos/createTask.dto';
import { CreateTaskDayDto } from './dtos/createTaskDay.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { UpdateTaskDayDto } from './dtos/updateTaskDay.dto';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    ) {}

  @UseGuards(RolesGuard)
  @ApiOperation({summary: '하루 종합 목표 리스트'})
  @Get('')
  async getTaskList() {
    return await this.tasksService.getAll();
  }

  @ApiOperation({summary: '하루 종합 목표 설정'})
  @Post('')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.createTask(createTaskDto);
  }

  @ApiOperation({summary:'할일 상세정보'})
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id:number) {
    return await this.tasksService.getOne(id);
  }

  @ApiOperation({summary:'할일 종합 목표 수정 및 인증사진 추가'})
  @Put(':id')
  async updateTask(@Param('id', ParseIntPipe) id:number, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.updateTask(id, updateTaskDto);
  }

  @ApiOperation({summary: '할일 목표 리스트'})
  @Get(':id/task-day')
  async getTaskDayList(@Param('id', ParseIntPipe) taskId:number) {
    return await this.tasksService.getTaskDayList(taskId);
  }

  @ApiOperation({summary: '할일 목표 추가'})
  @Post(':id/task-day')
  async createTaskDay(@Param('id', ParseIntPipe) taskId:number, @Body() createTaskDayDto: CreateTaskDayDto) {
    return await this.tasksService.createTaskDay(taskId, createTaskDayDto);
  }

  @ApiOperation({summary: '할일 목표 상세정보'})
  @Get(':id/task-day/:taskDayId')
  async getTaskDay(@Param('id', ParseIntPipe) taskId:number, @Param('taskDayId', ParseIntPipe) taskDayId:number) {
    return await this.tasksService.getTaskDay(taskId, taskDayId);
  }

  @ApiOperation({summary: '할일 목표 수정 및 완료'})
  @Put(':id/task-day/:taskDayId')
  async updateTaskDay(@Param('id', ParseIntPipe) taskId:number, @Param('taskDayId', ParseIntPipe) taskDayId:number, @Body() updateTaskDayDto: UpdateTaskDayDto) {
    return await this.tasksService.updateTaskDay(taskId, taskDayId, updateTaskDayDto);
  }
}
