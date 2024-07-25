import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunityPhotosService } from './community_photos.service';
import { CreateCommunityPhotoDto } from './dto/create-community_photo.dto';
import { UpdateCommunityPhotoDto } from './dto/update-community_photo.dto';
import { MinioService } from 'src/minio/minio.service';

@Controller('community-photos')
export class CommunityPhotosController {
  constructor(private readonly communityPhotosService: CommunityPhotosService,
    private readonly minioService:MinioService
  ) {}

  @Post()
  create(@Body() createCommunityPhotoDto: CreateCommunityPhotoDto) {
    return this.communityPhotosService.create(createCommunityPhotoDto);
  }

  @Get()
  findAll() {
    return this.communityPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communityPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunityPhotoDto: UpdateCommunityPhotoDto) {
    return this.communityPhotosService.update(+id, updateCommunityPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communityPhotosService.remove(+id);
  }
}
