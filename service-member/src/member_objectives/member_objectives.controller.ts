import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { MemberObjectivesService } from './member_objectives.service';
import { CreateMemberObjectiveDto } from './dto/create-member_objective.dto';
import { UpdateMemberObjectiveDto } from './dto/update-member_objective.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('member-objectives')
export class MemberObjectivesController {
  constructor(private readonly memberObjectivesService: MemberObjectivesService) {}

  @ApiTags('Member-Objective')
  @Public()
  @Get('/get-all-list-member-objective')
  async findAll() {
    try{
      const allDataLang =  await this.memberObjectivesService.findAll();
      return {
        status:'success',
        message_code:'success_get_data',
        code:'001',
        message:'พบข้อมูล',
        data:allDataLang
      }
      } catch (error){
        console.log(error)
        throw new HttpException(
          {
            status: 'un_success',
            message_code: 'internal_server_error',
            code: '022',
          },
          500,
        );
    }
    
  }
}
