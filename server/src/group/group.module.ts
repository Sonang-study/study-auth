import { Module } from '@nestjs/common';
import { SController } from './s/s.controller';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  controllers: [SController, GroupController],
  providers: [GroupService]
})
export class GroupModule {}
