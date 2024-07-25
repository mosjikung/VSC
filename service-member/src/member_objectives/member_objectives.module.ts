import { Module } from '@nestjs/common';
import { MemberObjectivesService } from './member_objectives.service';
import { MemberObjectivesController } from './member_objectives.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberObjectives } from './entities/member_objective.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberObjectives]),
  ],
  controllers: [MemberObjectivesController],
  providers: [MemberObjectivesService]
})
export class MemberObjectivesModule {}
