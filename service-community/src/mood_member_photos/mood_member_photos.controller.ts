import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoodMemberPhotosService } from './mood_member_photos.service';
import { CreateMoodMemberPhotoDto } from './dto/create-mood_member_photo.dto';
import { UpdateMoodMemberPhotoDto } from './dto/update-mood_member_photo.dto';

@Controller('mood-member-photos')
export class MoodMemberPhotosController {
  constructor(private readonly moodMemberPhotosService: MoodMemberPhotosService) {}

  @Post()
  create(@Body() createMoodMemberPhotoDto: CreateMoodMemberPhotoDto) {
    return this.moodMemberPhotosService.create(createMoodMemberPhotoDto);
  }

  @Get()
  findAll() {
    return this.moodMemberPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moodMemberPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoodMemberPhotoDto: UpdateMoodMemberPhotoDto) {
    return this.moodMemberPhotosService.update(+id, updateMoodMemberPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moodMemberPhotosService.remove(+id);
  }
}
