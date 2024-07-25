import { PartialType } from '@nestjs/swagger';
import { CreateCommunityPhotoDto } from './create-community_photo.dto';

export class UpdateCommunityPhotoDto extends PartialType(CreateCommunityPhotoDto) {}
