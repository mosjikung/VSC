import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoodLocationsService } from './mood_locations.service';
import { CreateMoodLocationDto } from './dto/create-mood_location.dto';
import { UpdateMoodLocationDto } from './dto/update-mood_location.dto';

@Controller('mood-locations')
export class MoodLocationsController {
  constructor(private readonly moodLocationsService: MoodLocationsService) {}

  @Post()
  create(@Body() createMoodLocationDto: CreateMoodLocationDto) {
    return this.moodLocationsService.create(createMoodLocationDto);
  }

  @Get()
  findAll() {
    return this.moodLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moodLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoodLocationDto: UpdateMoodLocationDto) {
    return this.moodLocationsService.update(+id, updateMoodLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moodLocationsService.remove(+id);
  }
}
