import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToOne } from 'typeorm'
import { Task } from './task.entity';

@Entity()
export class TaskDay extends CoreEntity {

  @ApiProperty({
    example: '2022-02-12 15:00:00',
    description: '한 일 날짜 시간',
  })
  @Column({nullable: true})
  @IsString()
  @IsOptional()
  finishedAt: string;

  @ApiProperty({
    example: 'Docker 강의 5개 수강',
    description: '할 일 세부 계획',
  })
  @Column()
  @IsString()
  dayPlan: string;

  @ManyToOne(() => Task, task => task.taskDays)
  task: Task
}
