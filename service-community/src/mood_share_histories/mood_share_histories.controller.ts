import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoodShareHistoriesService } from './mood_share_histories.service';
import { CreateMoodShareHistoryDto } from './dto/create-mood_share_history.dto';
import { UpdateMoodShareHistoryDto } from './dto/update-mood_share_history.dto';

@Controller('mood-share-histories')
export class MoodShareHistoriesController {
  constructor(private readonly moodShareHistoriesService: MoodShareHistoriesService) {}

  @Post()
  create(@Body() createMoodShareHistoryDto: CreateMoodShareHistoryDto) {
    return this.moodShareHistoriesService.create(createMoodShareHistoryDto);
  }

  @Get()
  findAll() {
    return this.moodShareHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moodShareHistoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoodShareHistoryDto: UpdateMoodShareHistoryDto) {
    return this.moodShareHistoriesService.update(+id, updateMoodShareHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moodShareHistoriesService.remove(+id);
  }
}
