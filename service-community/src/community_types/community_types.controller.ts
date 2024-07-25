import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunityTypesService } from './community_types.service';
import { CreateCommunityTypeDto } from './dto/create-community_type.dto';
import { UpdateCommunityTypeDto } from './dto/update-community_type.dto';

@Controller('community-types')
export class CommunityTypesController {
  constructor(private readonly communityTypesService: CommunityTypesService) {}

  @Post()
  create(@Body() createCommunityTypeDto: CreateCommunityTypeDto) {
    return this.communityTypesService.create(createCommunityTypeDto);
  }

  @Get()
  findAll() {
    return this.communityTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communityTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunityTypeDto: UpdateCommunityTypeDto) {
    return this.communityTypesService.update(+id, updateCommunityTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communityTypesService.remove(+id);
  }
}
