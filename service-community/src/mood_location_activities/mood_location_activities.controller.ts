import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoodLocationActivitiesService } from './mood_location_activities.service';
import { CreateMoodLocationActivityDto } from './dto/create-mood_location_activity.dto';
import { UpdateMoodLocationActivityDto } from './dto/update-mood_location_activity.dto';

@Controller('mood-location-activities')
export class MoodLocationActivitiesController {
  constructor(private readonly moodLocationActivitiesService: MoodLocationActivitiesService) {}

  @Post()
  create(@Body() createMoodLocationActivityDto: CreateMoodLocationActivityDto) {
    return this.moodLocationActivitiesService.create(createMoodLocationActivityDto);
  }

  @Get()
  findAll() {
    return this.moodLocationActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moodLocationActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoodLocationActivityDto: UpdateMoodLocationActivityDto) {
    return this.moodLocationActivitiesService.update(+id, updateMoodLocationActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moodLocationActivitiesService.remove(+id);
  }
}
