import { PartialType } from '@nestjs/swagger';
import { CreateCommunityTypeDto } from './create-community_type.dto';

export class UpdateCommunityTypeDto extends PartialType(CreateCommunityTypeDto) {}
