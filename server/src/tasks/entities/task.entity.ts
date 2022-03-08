import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { User } from  '../../users/entities/user.entity'
import { TaskDay } from './task.day.entity';

@Entity()
export class Task extends CoreEntity {
  @ApiProperty({
    example: '2022-02-12',
    description: '할 일 날짜 설정',
  })
  @Column()
  @IsDateString()
  date: Date;

  @ApiProperty({
    example: 'Docker 마스터하기',
    description: '할 일 종합 계획',
  })
  @Column()
  @IsString()
  plan: string;

  @ApiProperty({
    example: 'image.png',
    description: '한 일 인증 사진 등록',
  })
  @Column({nullable: true})
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    example: '1',
    description: '유저 ID',
  })
  @Column({nullable: false})
  @IsNumber()
  userId: number;

  @ManyToOne(() => User, user => user.tasks)
  user: User

  @OneToMany(type => TaskDay, taskDay => taskDay.task)
  taskDays: TaskDay[];

}
