import { IsEmail, isEmpty, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm'
import { Task } from '../../tasks/entities/task.entity'
import * as bcrypt from 'bcrypt'
import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

enum SignupMethod {
  local = 'local',
  google = 'google',
}

@Entity()
export class User extends CoreEntity {
  @ApiProperty({
    example: 'jay',
    description: 'user first name',
  })
  @Column()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'ko',
    description: 'user last name',
  })
  @Column()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'jayko@naver.com',
    description: 'user email for use login ID',
    uniqueItems: true,
  })
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1q2w3e4r!',
    description: 'user password for login',
  })
  @Column({ select: false })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'local',
    description: 'user signup method',
    default: 'local',
  })
  @Column({default: SignupMethod.local , type:'enum' ,enum:SignupMethod})
  @IsOptional()
  @IsString()
  signupMethod: SignupMethod;

  @OneToMany(type => Task, task => task.user)
  tasks: Task[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try{
      this.password = await bcrypt.hash(this.password, +process.env.ROUNDS);
    } catch (err) {
      throw new InternalServerErrorException()
    }
  }
}
