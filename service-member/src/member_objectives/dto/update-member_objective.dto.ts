import { PartialType } from '@nestjs/swagger';
import { CreateMemberObjectiveDto } from './create-member_objective.dto';

export class UpdateMemberObjectiveDto extends PartialType(CreateMemberObjectiveDto) {}
