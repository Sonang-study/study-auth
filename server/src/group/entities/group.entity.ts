import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Group extends CoreEntity {
  @ApiProperty({
    example: '코테 그룹',
    description: 'group name',
  })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({
    example: "1",
    description: "그룹 오너 유저 ID",
  })
  @Column({ nullable: false })
  @IsNumber()
  masterUserId: number;

  @ApiProperty({
    example: 'sdf3nh3',
    description: '그룹 추천 코드',
  })
  @Column({ nullable: false })
  @IsString()
  code: string;

  @BeforeInsert()
  async createCode(): Promise<void> {
    try{
      this.code = Math.random().toString(36).substring(0,7);
    } catch (err) {
      throw new InternalServerErrorException()
    }
  }

  @ManyToOne(() => User, (user) => user.groupMaster)
  masterUser: User;

  @ManyToMany(() => User, (user) => user.groups)
  users: User[];

}
