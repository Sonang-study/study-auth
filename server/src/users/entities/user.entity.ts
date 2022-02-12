import { IsEmail, isEmpty, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm'
import { Task } from '../../tasks/entities/task.entity'
import * as bcrypt from 'bcrypt'
import { InternalServerErrorException } from '@nestjs/common';

enum SignupMethod {
  local = 'local',
  google = 'google',
}

@Entity()
export class User extends CoreEntity {
  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsString()
  password: string;

  @Column({default: SignupMethod.local , type:'enum' ,enum:SignupMethod})
  @IsOptional()
  @IsString()
  signupMethod: SignupMethod;

  @OneToMany(type => Task, task => task.user)
  tasks: Task[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try{
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      throw new InternalServerErrorException()
    }
  }
}
