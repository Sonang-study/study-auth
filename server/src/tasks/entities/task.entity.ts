import { IsDate, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from  '../../users/entities/user.entity'

@Entity()
export class Task extends CoreEntity {
  @Column()
  @IsDate()
  date: string;

  @Column()
  @IsString()
  finishedAt: string;

  @Column()
  @IsString()
  plan: string;

  @Column()
  @IsString()
  image: string;

  @ManyToOne(() => User)
  user: User

}
