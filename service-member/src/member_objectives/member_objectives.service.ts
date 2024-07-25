import { Injectable } from '@nestjs/common';
import { CreateMemberObjectiveDto } from './dto/create-member_objective.dto';
import { UpdateMemberObjectiveDto } from './dto/update-member_objective.dto';
import { CrudService } from 'src/libs/common/src';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberObjectives } from './entities/member_objective.entity';

@Injectable()
export class MemberObjectivesService extends CrudService<MemberObjectives>{
  constructor(
    @InjectRepository(MemberObjectives)
    private readonly memberObjectiveRepository: Repository<MemberObjectives>,
  ) {
    super(memberObjectiveRepository);
  }
}
