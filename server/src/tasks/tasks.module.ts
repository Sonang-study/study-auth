import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { User } from 'src/users/entities/user.entity';
import { TaskDay } from './entities/task.day.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskDay, User]),
    CaslModule,
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
